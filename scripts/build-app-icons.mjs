import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { APP_ICONS, DEFAULT_APP_ICON, IOS_CORNER_RATIO } from '../src/domain/appIcon.ts';
import { ROOT, runAsync, withWorkDirAsync } from './lib/tools.mjs';

const SOURCE_DIR = join(ROOT, 'assets/app-icon');
const OUTPUT_DIR = join(ROOT, 'assets/images/app-icons');
const SPLASH_FILE = join(ROOT, 'assets/images/splash-icon.png');
const MONOCHROME = 'monochrome';
const SIZE = 1024;
const THUMBNAIL_SIZE = 192;
const ANDROID_SCALE = 0.64;
const OPAQUE_COLORS = 4096;
const TRANSPARENT_COLORS = 16384;
const PNG_OPTIONS = ['-define', 'png:compression-level=9', '-define', 'png:exclude-chunks=date,time'];

const hide = (svg, ...layers) =>
  layers.reduce((out, layer) => out.replace(`<g id="${layer}">`, `<g id="${layer}" display="none">`), svg);

const scale = (svg, factor) =>
  svg
    .replace('</defs>', `</defs><g transform="translate(512 512) scale(${factor}) translate(-512 -512)">`)
    .replace('</svg>', '</g></svg>');

const quantize = (colors) => ['-dither', 'None', '-colors', String(colors)];

async function rasterize(work, svg, name) {
  const svgFile = join(work, `${name}.svg`);
  const pngFile = join(work, `${name}.png`);
  writeFileSync(svgFile, svg);
  await runAsync('rsvg-convert', ['-w', String(SIZE), '-h', String(SIZE), '-o', pngFile, svgFile]);
  return pngFile;
}

const magick = (input, output, ...operations) => runAsync('magick', [input, ...operations, ...PNG_OPTIONS, output]);

const opaque = (input, output, ...operations) =>
  magick(input, `PNG24:${output}`, ...operations, '-background', 'black', '-alpha', 'remove', '-alpha', 'off');

const transparent = (input, output, ...operations) => magick(input, `PNG32:${output}`, ...operations);

async function buildAndroidLayers(work, svg, dir) {
  const android = scale(svg, ANDROID_SCALE);
  const [foreground, background] = await Promise.all([
    rasterize(work, hide(android, 'backdrop', 'glow'), 'android-fg'),
    rasterize(work, hide(android, 'cards'), 'android-bg'),
  ]);
  await Promise.all([
    transparent(foreground, join(dir, 'android-foreground.png')),
    opaque(background, join(dir, 'android-background.png')),
  ]);
}

async function buildTheme(work, theme) {
  const svg = readFileSync(join(SOURCE_DIR, `${theme}.svg`), 'utf8');
  const dir = join(OUTPUT_DIR, theme);
  mkdirSync(dir, { recursive: true });
  const isDefault = theme === DEFAULT_APP_ICON;
  const reduce = (colors) => (isDefault ? [] : quantize(colors));

  const [light, dark] = await Promise.all([
    rasterize(work, svg, `${theme}-light`),
    rasterize(work, hide(svg, 'backdrop'), `${theme}-dark`),
  ]);
  await Promise.all([
    opaque(light, join(dir, 'ios-light.png'), ...reduce(OPAQUE_COLORS)),
    transparent(dark, join(dir, 'ios-dark.png'), ...reduce(TRANSPARENT_COLORS)),
    transparent(
      dark,
      join(dir, 'ios-tinted.png'),
      '-colorspace',
      'Gray',
      '-level',
      '0%,80%',
      '-colorspace',
      'sRGB',
      ...reduce(TRANSPARENT_COLORS),
    ),
    opaque(light, join(OUTPUT_DIR, 'thumbnails', `${theme}.png`), '-resize', `${THUMBNAIL_SIZE}x${THUMBNAIL_SIZE}`),
    ...(isDefault ? [buildAndroidLayers(work, svg, dir)] : []),
  ]);
  return light;
}

function buildSplash(light) {
  const radius = Math.round(SIZE * IOS_CORNER_RATIO);
  return runAsync('magick', [
    light,
    '-alpha',
    'set',
    '(',
    '-size',
    `${SIZE}x${SIZE}`,
    'xc:none',
    '-fill',
    'white',
    '-draw',
    `roundrectangle 0,0,${SIZE - 1},${SIZE - 1},${radius},${radius}`,
    ')',
    '-compose',
    'DstIn',
    '-composite',
    ...PNG_OPTIONS,
    `PNG32:${SPLASH_FILE}`,
  ]);
}

async function buildMonochrome(work) {
  const svg = scale(readFileSync(join(SOURCE_DIR, `${MONOCHROME}.svg`), 'utf8'), ANDROID_SCALE);
  await transparent(await rasterize(work, svg, MONOCHROME), join(OUTPUT_DIR, 'android-monochrome.png'));
}

const missing = [...APP_ICONS, MONOCHROME].filter((name) => !existsSync(join(SOURCE_DIR, `${name}.svg`)));
if (missing.length > 0) {
  throw new Error(`Missing app icon sources in assets/app-icon: ${missing.join(', ')}`);
}

await withWorkDirAsync('loyus-icons-', async (work) => {
  mkdirSync(join(OUTPUT_DIR, 'thumbnails'), { recursive: true });
  const lights = await Promise.all(
    APP_ICONS.map(async (theme) => {
      const themeWork = join(work, theme);
      mkdirSync(themeWork);
      return [theme, await buildTheme(themeWork, theme)];
    }),
  );
  await Promise.all([buildMonochrome(work), buildSplash(Object.fromEntries(lights)[DEFAULT_APP_ICON])]);
  console.log(`Built ${APP_ICONS.length} app icons: ${APP_ICONS.join(', ')}`);
});
