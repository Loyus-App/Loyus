import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..', '..');

const CRITICAL_PATH_FILES = [
  'app/_layout.tsx',
  'app/(tabs)/_layout.tsx',
  'app/(tabs)/index.tsx',
  'app/card/[id].tsx',
  'src/state/stores/cardStore.ts',
  'src/state/stores/uiStore.ts',
  'src/state/stores/settingsStore.ts',
];

const FORBIDDEN_NETWORK_PATTERNS: readonly [string, RegExp][] = [
  ['fetch()', /\bfetch\s*\(/],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/],
  ['axios', /from\s+['"]axios['"]|require\(\s*['"]axios['"]/],
  ['@apollo', /from\s+['"]@apollo\//],
  ['ky', /from\s+['"]ky['"]|require\(\s*['"]ky['"]/],
  ['got', /from\s+['"]got['"]|require\(\s*['"]got['"]/],
  ['http.request', /\bhttp\.request\b/],
  ['https.request', /\bhttps\.request\b/],
  ['WebSocket', /\bnew\s+WebSocket\b/],
];

function collectDomainFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectDomainFiles(fullPath));
    } else if (
      (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) &&
      !entry.name.endsWith('.test.ts') &&
      !entry.name.endsWith('.test.tsx')
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

const domainFiles = collectDomainFiles(join(REPO_ROOT, 'src', 'domain'));
const allScannedFiles = [...CRITICAL_PATH_FILES.map((f) => join(REPO_ROOT, f)), ...domainFiles];

describe('critical path: no network calls (PERF-04)', () => {
  it('scans at least 10 critical-path files', () => {
    expect(allScannedFiles.length).toBeGreaterThanOrEqual(10);
  });

  it.each(
    allScannedFiles.map((f) => [f.replace(`${REPO_ROOT}/`, ''), f]),
  )('%s has no network calls', (_rel, fullPath) => {
    expect(statSync(fullPath as string).isFile()).toBe(true);
    const content = readFileSync(fullPath as string, 'utf-8');
    for (const [label, pattern] of FORBIDDEN_NETWORK_PATTERNS) {
      expect({ file: _rel, forbidden: label, match: content.match(pattern)?.[0] ?? null }).toEqual({
        file: _rel,
        forbidden: label,
        match: null,
      });
    }
  });
});
