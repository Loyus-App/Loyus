import { validateBarcode } from '@/domain/barcode';
import type { BarcodeFormat } from '@/domain/card';

export const NAME_MAX_LENGTH = 50;

export type NameIssue = 'required' | 'tooLong';
export type CodeIssue = 'required' | 'invalid';

export type FormIssues = {
  readonly name?: NameIssue | undefined;
  readonly code?: CodeIssue | undefined;
};

export function nameIssue(name: string): NameIssue | undefined {
  const trimmed = name.trim();
  if (!trimmed) return 'required';
  if (trimmed.length > NAME_MAX_LENGTH) return 'tooLong';
  return;
}

export function codeIssue(code: string, format: BarcodeFormat): CodeIssue | undefined {
  const trimmed = code.trim();
  if (!trimmed) return 'required';
  return validateBarcode(trimmed, format).valid ? undefined : 'invalid';
}

export function findIssues(name: string, code: string, format: BarcodeFormat): FormIssues {
  return { name: nameIssue(name), code: codeIssue(code, format) };
}
