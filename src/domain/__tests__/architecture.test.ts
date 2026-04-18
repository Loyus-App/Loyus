import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DOMAIN_ROOT = join(__dirname, '..');

const FORBIDDEN_PATTERNS = [
  /from\s+['"]react-native/,
  /from\s+['"]expo/,
  /from\s+['"]zustand/,
  /from\s+['"]react-native-mmkv/,
  /from\s+['"]react['"]/,
  /from\s+['"]react\//,
  /require\(\s*['"]react-native/,
  /require\(\s*['"]expo/,
  /require\(\s*['"]zustand/,
  /require\(\s*['"]react/,
];

/** Recursively collect .ts/.tsx files, excluding __tests__/ and *.test.ts. */
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

const domainFiles = collectDomainFiles(DOMAIN_ROOT);

describe('architecture: domain layer purity', () => {
  it('has domain source files (sanity check)', () => {
    expect(domainFiles.length).toBeGreaterThan(0);
  });

  it.each(
    domainFiles.map((f) => [relative(DOMAIN_ROOT, f), f]),
  )('%s has no forbidden imports', (_rel, fullPath) => {
    const content = readFileSync(fullPath as string, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      expect(content).not.toMatch(pattern);
    }
  });
});
