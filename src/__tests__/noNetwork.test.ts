import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isPureCode, SRC_ROOT, sourceFiles } from '@/shared/testing/sourceFiles';

const CRITICAL_PATH_FILES = [
  'app/_layout.tsx',
  'app/(tabs)/_layout.tsx',
  'app/(tabs)/(cards)/index.tsx',
  'app/card/[id].tsx',
  'entities/card/state/cardStore.ts',
  'entities/settings/state/settingsStore.ts',
  'shared/ui/uiStore.ts',
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

const scannedFiles = [...CRITICAL_PATH_FILES, ...sourceFiles().filter(isPureCode)];

describe('critical path: no network calls (PERF-04)', () => {
  it('scans at least 10 critical-path files', () => {
    expect(scannedFiles.length).toBeGreaterThanOrEqual(10);
  });

  it.each(scannedFiles)('%s has no network calls', (file) => {
    const content = readFileSync(join(SRC_ROOT, file), 'utf-8');
    for (const [label, pattern] of FORBIDDEN_NETWORK_PATTERNS) {
      expect({ file, forbidden: label, match: content.match(pattern)?.[0] ?? null }).toEqual({
        file,
        forbidden: label,
        match: null,
      });
    }
  });
});
