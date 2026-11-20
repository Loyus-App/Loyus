import { execFile, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));

const execFileAsync = promisify(execFile);

export function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8' }).trim();
}

export async function runAsync(command, args) {
  const { stdout } = await execFileAsync(command, args, { encoding: 'utf8' });
  return stdout.trim();
}

export function withWorkDir(prefix, task) {
  const work = mkdtempSync(join(tmpdir(), prefix));
  try {
    return task(work);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

export async function withWorkDirAsync(prefix, task) {
  const work = mkdtempSync(join(tmpdir(), prefix));
  try {
    return await task(work);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
