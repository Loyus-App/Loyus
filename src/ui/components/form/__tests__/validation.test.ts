import { BarcodeFormat } from '@/domain/card';
import { codeIssue, findIssues, NAME_MAX_LENGTH, nameIssue } from '../validation';

describe('card form validation', () => {
  it('requires a store name, ignoring surrounding spaces', () => {
    expect(nameIssue('')).toBe('required');
    expect(nameIssue('   ')).toBe('required');
    expect(nameIssue('  Carrefour ')).toBeUndefined();
  });

  it('caps the store name length', () => {
    expect(nameIssue('a'.repeat(NAME_MAX_LENGTH))).toBeUndefined();
    expect(nameIssue('a'.repeat(NAME_MAX_LENGTH + 1))).toBe('tooLong');
  });

  it('requires a card number', () => {
    expect(codeIssue(' ', BarcodeFormat.CODE128)).toBe('required');
  });

  it('checks the number against the chosen format', () => {
    expect(codeIssue('3250390000112', BarcodeFormat.EAN13)).toBeUndefined();
    expect(codeIssue('3250390000113', BarcodeFormat.EAN13)).toBe('invalid');
    expect(codeIssue('ABC-123', BarcodeFormat.EAN13)).toBe('invalid');
    expect(codeIssue('ABC-123', BarcodeFormat.CODE128)).toBeUndefined();
  });

  it('reports both fields at once', () => {
    expect(findIssues('', '', BarcodeFormat.CODE128)).toEqual({
      name: 'required',
      code: 'required',
    });
  });
});
