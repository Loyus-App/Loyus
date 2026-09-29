import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const DOMAIN_ROOT = join(__dirname, '..');
const SRC_ROOT = join(DOMAIN_ROOT, '..');

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

function collectSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
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

const domainFiles = collectSourceFiles(DOMAIN_ROOT);

const IMPORT_SPECIFIER = /(?:from\s+|import\s*\(\s*|require\(\s*)['"]([^'"]+)['"]/g;

function importedPaths(file: string): string[] {
  const content = readFileSync(file, 'utf-8');
  return [...content.matchAll(IMPORT_SPECIFIER)].flatMap(([, specifier = '']) => {
    if (specifier.startsWith('@/')) return [specifier.slice(2)];
    if (specifier.startsWith('.')) return [relative(SRC_ROOT, resolve(dirname(file), specifier))];
    return [];
  });
}

function layerViolations(root: string, isAllowed: (target: string) => boolean): [string, string][] {
  return collectSourceFiles(join(SRC_ROOT, root)).flatMap((file) =>
    importedPaths(file)
      .filter((target) => !isAllowed(target))
      .map((target): [string, string] => [relative(SRC_ROOT, file), target]),
  );
}

const APP_LAYERS = ['state/', 'ui/', 'app/', 'widgets/'];

describe('architecture: domain layer purity', () => {
  it('has domain source files (sanity check)', () => {
    expect(domainFiles.length).toBeGreaterThan(0);
  });

  it.each(domainFiles.map((f) => [relative(DOMAIN_ROOT, f), f]))(
    '%s has no forbidden imports',
    (_rel, fullPath) => {
      const content = readFileSync(fullPath as string, 'utf-8');
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(content).not.toMatch(pattern);
      }
    },
  );
});

describe('architecture: layer boundaries', () => {
  it('infra never reaches into state or the UI', () => {
    const violations = layerViolations(
      'infra',
      (target) => !APP_LAYERS.some((layer) => target.startsWith(layer)),
    );
    expect(violations).toEqual([]);
  });

  it('state only uses domain and infra persistence', () => {
    const violations = layerViolations(
      'state',
      (target) =>
        !['ui/', 'app/', 'widgets/'].some((layer) => target.startsWith(layer)) &&
        (!target.startsWith('infra/') || target.startsWith('infra/persistence/')),
    );
    expect(violations).toEqual([]);
  });
});
