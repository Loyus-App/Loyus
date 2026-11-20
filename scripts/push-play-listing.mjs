import { createSign } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import appConfig from '../app.config.ts';
import { ROOT } from './lib/tools.mjs';

const PACKAGE_NAME = appConfig({ config: {} }).android.package;
const DEFAULT_LANGUAGE = 'fr-FR';
const PLAY_DIR = join(ROOT, 'store/play');
const API = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE_NAME}`;
const UPLOAD_API = `https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/${PACKAGE_NAME}`;
const IMAGES = { icon: 'icon.png', featureGraphic: 'featureGraphic.jpg' };

const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
if (!keyPath) throw new Error('Set GOOGLE_SERVICE_ACCOUNT_KEY to the Play service account JSON key.');
const key = JSON.parse(readFileSync(keyPath, 'utf8'));

const base64url = (value) => Buffer.from(value).toString('base64url');

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: key.token_uri,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(JSON.stringify(claims))}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');
  const response = await fetch(key.token_uri, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok) throw new Error(`Token request failed: ${await response.text()}`);
  return (await response.json()).access_token;
}

const token = await accessToken();

async function call(method, url, body, contentType = 'application/json') {
  const response = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${token}`, ...(body ? { 'content-type': contentType } : {}) },
    ...(body ? { body: contentType === 'application/json' ? JSON.stringify(body) : body } : {}),
  });
  if (!response.ok) throw new Error(`${method} ${url} failed: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

const readText = (locale, name) => readFileSync(join(PLAY_DIR, locale, `${name}.txt`), 'utf8').trim();

async function uploadImage(edit, locale, imageType, file) {
  await call('POST', `${UPLOAD_API}/edits/${edit}/listings/${locale}/${imageType}?uploadType=media`, readFileSync(file), file.endsWith('.png') ? 'image/png' : 'image/jpeg');
}

const { id: edit } = await call('POST', `${API}/edits`);
await call('PATCH', `${API}/edits/${edit}/details`, { defaultLanguage: DEFAULT_LANGUAGE });

const locales = readdirSync(PLAY_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const locale of locales) {
  await call('PUT', `${API}/edits/${edit}/listings/${locale}`, {
    language: locale,
    title: readText(locale, 'title'),
    shortDescription: readText(locale, 'short_description'),
    fullDescription: readText(locale, 'full_description'),
  });
  const images = join(PLAY_DIR, locale, 'images');
  for (const [imageType, file] of Object.entries(IMAGES)) {
    await call('DELETE', `${API}/edits/${edit}/listings/${locale}/${imageType}`);
    await uploadImage(edit, locale, imageType, join(images, file));
  }
  const screenshots = join(images, 'phoneScreenshots');
  await call('DELETE', `${API}/edits/${edit}/listings/${locale}/phoneScreenshots`);
  for (const file of existsSync(screenshots) ? readdirSync(screenshots).sort() : []) {
    await uploadImage(edit, locale, 'phoneScreenshots', join(screenshots, file));
  }
  console.log(`${locale}: listing and images staged`);
}

await call('POST', `${API}/edits/${edit}:commit`);
console.log(`Committed edit ${edit}`);
