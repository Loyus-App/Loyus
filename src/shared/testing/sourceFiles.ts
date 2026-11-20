import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

export const SRC_ROOT = join(__dirname, '..', '..');

const SOURCE = /\.tsx?$/;
const TEST = /\.test\.tsx?$/;
const PURE = /^(?:(?:entities|features)\/[^/]+\/domain|shared\/lib)\//;

export function sourceFiles(dir: string = SRC_ROOT): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(path);
    return SOURCE.test(entry.name) && !TEST.test(entry.name) ? [relative(SRC_ROOT, path)] : [];
  });
}

export function isPureCode(path: string): boolean {
  return PURE.test(path);
}
