import { BarcodeFormat } from '@/domain/card';
import { encodeSymbol } from '../barcodeSymbol';

describe('encodeSymbol', () => {
  it('encodes an EAN-13 as 95 modules starting with its guard bars', () => {
    const symbol = encodeSymbol('2001234567893', BarcodeFormat.EAN13);

    expect(symbol).toMatchObject({ kind: 'linear', modules: 95, rows: 1 });
    expect(symbol?.path.startsWith('M0 0h1v1h-1zM2 0h1v1h-1z')).toBe(true);
  });

  it('encodes Code 128 values of any length', () => {
    const short = encodeSymbol('4821', BarcodeFormat.CODE128);
    const long = encodeSymbol('LOYUS-MEMBER-004821', BarcodeFormat.CODE128);

    expect(short?.kind).toBe('linear');
    expect(long?.modules).toBeGreaterThan(short?.modules ?? 0);
  });

  it('encodes QR codes as a square grid', () => {
    const symbol = encodeSymbol('hello', BarcodeFormat.QR_CODE);

    expect(symbol).toMatchObject({ kind: 'matrix', modules: 21, rows: 21 });
    expect(symbol?.path.length).toBeGreaterThan(0);
  });

  it('returns null for values the format cannot encode', () => {
    expect(encodeSymbol('', BarcodeFormat.CODE128)).toBeNull();
    expect(encodeSymbol('2001234567890', BarcodeFormat.EAN13)).toBeNull();
    expect(encodeSymbol('ABC', BarcodeFormat.EAN8)).toBeNull();
  });

  it('returns null for formats without a drawer', () => {
    expect(encodeSymbol('hello', BarcodeFormat.AZTEC)).toBeNull();
    expect(encodeSymbol('hello', BarcodeFormat.PDF417)).toBeNull();
  });
});
