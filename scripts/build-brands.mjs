import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BRANDS_DIR = join(ROOT, 'assets/brands');
const CATALOG_FILE = join(ROOT, 'src/domain/brandCatalog.ts');
const LOGOS_FILE = join(ROOT, 'src/ui/brands/brandLogos.ts');

const LIGHT_INK = 0.8;
const LIGHT_LOGO = 0.88;
const RENDER_SIZE = 512;
const BADGE_COVERAGE = 0.5;
const TRIM_FUZZ = '6%';
const LOOSE_MARGIN = 0.03;
const BADGE_MARGIN = 0.22;
const MIN_CONTENT = 4;
const NEAR_WHITE = 1.35;
const FALLBACK_COLOR = '#4A5568';
const NAMED = { white: '#FFFFFF', black: '#000000' };
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const PAINT = /(?:fill|stroke|stop-color)\s*[:=]\s*["']?\s*(#[0-9a-f]{3,6}\b|white|black|rgb\([^)]*\))/gi;
const SIZE = (name) => new RegExp(`<svg[^>]*\\s${name}\\s*=\\s*["']\\s*([\\d.]+)`, 'i');

const excludedSources = new Set(
  process.argv.filter((arg) => arg.startsWith('--exclude-source=')).map((arg) => arg.split('=')[1]),
);

function toHex(paint) {
  const value = paint.toLowerCase();
  if (NAMED[value]) return NAMED[value];
  if (HEX.test(value)) {
    return value.length === 4 ? `#${[...value.slice(1)].map((c) => c + c).join('')}` : value;
  }
  const rgb = value.match(/\d+/g);
  if (value.startsWith('rgb') && rgb?.length >= 3) {
    return `#${rgb.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, '0')).join('')}`;
  }
  return null;
}

function channel(hex, offset) {
  const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
  return value <= 0.039_28 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}

function tileColor(colors) {
  const candidates = [colors?.primary, ...(colors?.palette ?? [])]
    .map((value) => (value ? toHex(value) : null))
    .filter(Boolean);
  const usable = candidates.find((hex) => 1.05 / (luminance(hex) + 0.05) >= NEAR_WHITE);
  return (usable ?? FALLBACK_COLOR).toUpperCase();
}

function logoTone(brand, svg, lightness) {
  const flags = new Set(brand.logo?.flags ?? []);
  if (flags.has('light_on_dark')) return 'dark';
  if (flags.has('white_box')) return 'light';
  const paints = [...svg.matchAll(PAINT)].map((match) => toHex(match[1])).filter(Boolean);
  const allLight = paints.length > 0 && paints.every((hex) => luminance(hex) > LIGHT_INK);
  return allLight || lightness > LIGHT_LOGO ? 'dark' : 'light';
}

const VIEW_BOX_FULL = /viewBox\s*=\s*["']\s*([-\d.]+)[\s,]+([-\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i;

function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8' }).trim();
}

function viewBoxOf(svg) {
  const box = svg.match(VIEW_BOX_FULL);
  if (box) return { x: Number(box[1]), y: Number(box[2]), width: Number(box[3]), height: Number(box[4]) };
  const width = Number(svg.match(SIZE('width'))?.[1]);
  const height = Number(svg.match(SIZE('height'))?.[1]);
  return width > 0 && height > 0 ? { x: 0, y: 0, width, height } : null;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

const EDGE = 2;

function trimBox(png, flattenOn) {
  const args = flattenOn
    ? [png, '-background', flattenOn, '-flatten', '-shave', `${EDGE}x${EDGE}`]
    : [png];
  const match = run('magick', [...args, '-fuzz', TRIM_FUZZ, '-format', '%@', 'info:']).match(
    /(\d+)x(\d+)\+(\d+)\+(\d+)/,
  );
  if (!match) return null;
  const offset = flattenOn ? EDGE : 0;
  return {
    x: Number(match[3]) + offset,
    y: Number(match[4]) + offset,
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function measure(svgPath, work) {
  const png = join(work, 'logo.png');
  run('rsvg-convert', ['--keep-aspect-ratio', '-w', String(RENDER_SIZE), '-h', String(RENDER_SIZE), '-o', png, svgPath]);
  const [width, height] = run('magick', ['identify', '-format', '%w %h', png]).split(' ').map(Number);
  const corner = run('magick', [png, '-format', `%[pixel:p{${EDGE},${EDGE}}]`, 'info:']);
  const cornerAlpha = Number(run('magick', [png, '-format', `%[fx:p{${EDGE},${EDGE}}.a]`, 'info:']));
  const background = cornerAlpha > 0.95 ? toHex(corner.replace(/^srgba?\(([^,]+),([^,]+),([^,)]+).*$/, 'rgb($1,$2,$3)')) : null;
  const box = trimBox(png, background) ?? { x: 0, y: 0, width, height };
  const coverage = Number(run('magick', [png, '-alpha', 'extract', '-format', '%[fx:mean]', 'info:']));
  const litOnBlack = Number(
    run('magick', [png, '-background', 'black', '-alpha', 'remove', '-colorspace', 'gray', '-format', '%[fx:mean]', 'info:']),
  );
  return { width, height, box, background, lightness: coverage > 0 ? litOnBlack / coverage : 0 };
}

function frame(svg, svgPath, work) {
  const view = viewBoxOf(svg);
  const shot = measure(svgPath, work);
  const content = (shot.box.width * shot.box.height) / (shot.width * shot.height);
  const empty = shot.box.width < MIN_CONTENT || shot.box.height < MIN_CONTENT;
  const badge = shot.background && content < BADGE_COVERAGE && !empty;
  if (!view || empty || (shot.background && !badge)) {
    const ratio = view ? view.width / view.height : shot.width / shot.height;
    return { ratio: round(ratio), lightness: shot.lightness };
  }
  const scale = view.width / shot.width;
  const margin = (badge ? BADGE_MARGIN : LOOSE_MARGIN) * Math.max(shot.box.height, shot.box.width * 0.25);
  const left = Math.max(0, shot.box.x - margin);
  const top = Math.max(0, shot.box.y - margin);
  const right = Math.min(shot.width, shot.box.x + shot.box.width + margin);
  const bottom = Math.min(shot.height, shot.box.y + shot.box.height + margin);
  const crop = [view.x + left * scale, view.y + top * scale, (right - left) * scale, (bottom - top) * scale];
  return {
    ratio: round((right - left) / (bottom - top)),
    viewBox: crop.map(round).join(' '),
    ...(badge ? { plate: shot.background.toUpperCase() } : {}),
    lightness: shot.lightness,
  };
}

function extraTerms(brand) {
  const seen = new Set([brand.name.trim().toLowerCase()]);
  const terms = [];
  for (const value of [...(brand.aliases ?? []), ...(brand.programs ?? [])]) {
    const term = value.trim();
    if (term && !seen.has(term.toLowerCase())) {
      seen.add(term.toLowerCase());
      terms.push(term);
    }
  }
  return terms;
}

const manifest = JSON.parse(readFileSync(join(BRANDS_DIR, 'brands.json'), 'utf8'));
const brands = manifest.brands
  .filter((brand) => !brand.outOfScope)
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const work = mkdtempSync(join(tmpdir(), 'loyus-brands-'));
const catalog = [];
const logos = [];
for (const brand of brands) {
  const file = brand.logo?.file;
  const svgPath = file ? join(BRANDS_DIR, file) : '';
  const usable = file && existsSync(svgPath) && !excludedSources.has(brand.logo?.source);
  let logo;
  if (usable) {
    const svg = readFileSync(svgPath, 'utf8');
    const { lightness, ...framing } = frame(svg, svgPath, work);
    logo = { tone: logoTone(brand, svg, lightness), ...framing };
    logos.push({ id: brand.id, file });
  }
  catalog.push({
    id: brand.id,
    name: brand.name,
    aliases: extraTerms(brand),
    markets: brand.markets ?? [],
    popularity: brand.popularity ?? 3,
    wallets: brand.seenIn?.length ?? 0,
    color: tileColor(brand.colors),
    ...(logo ? { logo } : {}),
  });
}

rmSync(work, { recursive: true, force: true });
mkdirSync(join(ROOT, 'src/ui/brands'), { recursive: true });
writeFileSync(
  CATALOG_FILE,
  `import type { Brand } from './brand';\n\nexport const BRAND_CATALOG: readonly Brand[] = ${JSON.stringify(catalog, null, 2)};\n`,
);
writeFileSync(
  LOGOS_FILE,
  [
    'export const BRAND_LOGOS: Readonly<Record<string, () => string>> = {',
    ...logos.map(({ id, file }) => `  '${id}': () => require('../../../assets/brands/${file}'),`),
    '};',
    '',
  ].join('\n'),
);

run(join(ROOT, 'node_modules/.bin/biome'), ['format', '--write', CATALOG_FILE, LOGOS_FILE]);

console.log(`${catalog.length} brands, ${logos.length} logos`);
