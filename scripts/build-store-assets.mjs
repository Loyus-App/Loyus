import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { DEFAULT_APP_ICON, IOS_CORNER_RATIO } from '../src/entities/settings/domain/appIcon.ts';
import { ROOT, runAsync, withWorkDirAsync } from './lib/tools.mjs';

const STORE_DIR = join(ROOT, 'store');
const RAW_DIR = join(STORE_DIR, 'raw');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ICON_FILE = join(ROOT, 'assets/images/app-icons', DEFAULT_APP_ICON, 'ios-light.png');
const PNG_OPTIONS = ['-define', 'png:compression-level=9', '-define', 'png:exclude-chunks=date,time'];

const FORMATS = {
  apple: { width: 1320, height: 2868, dir: (locale) => join(STORE_DIR, 'apple', locale) },
  play: { width: 1080, height: 1920, dir: (locale) => join(STORE_DIR, 'play', locale, 'images/phoneScreenshots') },
};

const CAPTURE_RATIO = FORMATS.apple.height / FORMATS.apple.width;

const { tagline, shots } = JSON.parse(readFileSync(join(STORE_DIR, 'screenshots.json'), 'utf8'));
const locales = Object.keys(tagline);

const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const formatTitle = (title) =>
  escapeHtml(title)
    .replaceAll(/\*(.+?)\*/g, '<em>$1</em>')
    .replaceAll('\n', '<br />');

const page = (width, height, body) => `<!doctype html>
<html><head><meta charset="utf-8" /><style>
* { margin: 0; box-sizing: border-box; }
h1, p { text-wrap: balance; }
html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #fff;
  background:
    radial-gradient(circle at 18% 6%, rgba(59, 130, 246, 0.42), transparent 48%),
    radial-gradient(circle at 92% 78%, rgba(124, 58, 237, 0.34), transparent 45%),
    radial-gradient(circle at 8% 92%, rgba(20, 184, 166, 0.16), transparent 40%),
    linear-gradient(180deg, #1a1f3a 0%, #0a0d1a 45%, #000 100%);
}
em {
  font-style: normal;
  background: linear-gradient(90deg, #7cb4ff, #b18cff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style></head><body>${body}</body></html>`;

function screenshotPage({ width, height }, raw, { title, subtitle }) {
  const pad = Math.round(width * 0.08);
  const titleSize = Math.round(width * 0.085);
  const top = Math.round(height * 0.065);
  const phoneTop = Math.round(height * 0.235);
  const phoneWidth = Math.min(width * 0.78, (height - phoneTop - height * 0.035) / CAPTURE_RATIO);
  const bezel = Math.round(phoneWidth * 0.022);
  return page(
    width,
    height,
    `<header style="position:absolute;top:${top}px;left:${pad}px;right:${pad}px;text-align:center">
  <h1 style="font-size:${titleSize}px;font-weight:800;line-height:1.04;letter-spacing:-0.025em">${formatTitle(title)}</h1>
  <p style="margin-top:${Math.round(titleSize * 0.36)}px;font-size:${Math.round(titleSize * 0.42)}px;font-weight:500;line-height:1.25;color:rgba(255,255,255,0.72)">${escapeHtml(subtitle)}</p>
</header>
<div style="position:absolute;top:${phoneTop}px;left:${(width - phoneWidth) / 2}px;width:${phoneWidth}px;padding:${bezel}px;border-radius:${phoneWidth * 0.135}px;background:#05070d;border:${Math.max(2, bezel / 4)}px solid rgba(255,255,255,0.22);box-shadow:0 ${bezel * 2}px ${bezel * 8}px rgba(59,130,246,0.35)">
  <img src="${pathToFileURL(raw).href}" style="display:block;width:100%;border-radius:${phoneWidth * 0.115}px" />
</div>`,
  );
}

function featureGraphicPage(text) {
  const iconSize = 300;
  return page(
    1024,
    500,
    `<div style="display:flex;align-items:center;gap:56px;height:100%;padding:0 72px">
  <img src="${pathToFileURL(ICON_FILE).href}" style="width:${iconSize}px;height:${iconSize}px;border-radius:${iconSize * IOS_CORNER_RATIO}px;box-shadow:0 24px 80px rgba(59,130,246,0.45)" />
  <div>
    <h1 style="font-size:104px;font-weight:800;letter-spacing:-0.03em;line-height:1">Loyus</h1>
    <p style="margin-top:20px;font-size:38px;font-weight:600;line-height:1.2;color:rgba(255,255,255,0.8)">${escapeHtml(text)}</p>
  </div>
</div>`,
  );
}

async function render(work, name, html, { width, height }, output) {
  const htmlFile = join(work, `${name}.html`);
  const pngFile = join(work, `${name}.png`);
  writeFileSync(htmlFile, html);
  await runAsync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    `--screenshot=${pngFile}`,
    pathToFileURL(htmlFile).href,
  ]);
  mkdirSync(dirname(output), { recursive: true });
  await runAsync('magick', [pngFile, '-crop', `${width}x${height}+0+0`, '+repage', '-alpha', 'off', '-strip', '-quality', '90', output]);
}

const rawFile = (locale, raw) => {
  const file = join(RAW_DIR, locale, `${raw}.png`);
  if (!existsSync(file)) throw new Error(`Missing raw screenshot ${file}. Run .maestro/store/screenshots.yaml first.`);
  return file;
};

await withWorkDirAsync('loyus-store-', async (work) => {
  for (const locale of locales) {
    for (const shot of shots) {
      for (const [platform, format] of Object.entries(FORMATS)) {
        if (shot.platforms && !shot.platforms.includes(platform)) continue;
        await render(
          work,
          `${platform}-${locale}-${shot.id}`,
          screenshotPage(format, rawFile(locale, shot.raw), shot.caption[locale]),
          format,
          join(format.dir(locale), `${shot.id}.jpg`),
        );
      }
    }
    const images = join(STORE_DIR, 'play', locale, 'images');
    await render(work, `feature-${locale}`, featureGraphicPage(tagline[locale]), { width: 1024, height: 500 }, join(images, 'featureGraphic.jpg'));
    await runAsync('magick', [ICON_FILE, '-resize', '512x512', ...PNG_OPTIONS, `PNG32:${join(images, 'icon.png')}`]);
  }
});
