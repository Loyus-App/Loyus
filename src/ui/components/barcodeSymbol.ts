import barcodes from 'jsbarcode/bin/barcodes';
import { create } from 'qrcode';
import { code39Symbols, validateBarcode } from '@/domain/barcode';
import type { SymbolKind } from '@/domain/barcodeLayout';
import { BarcodeFormat, JSBARCODE_FORMAT } from '@/domain/card';

export interface EncodedSymbol {
  readonly kind: SymbolKind;
  readonly modules: number;
  readonly rows: number;
  readonly path: string;
}

const LINEAR_FORMATS: ReadonlySet<BarcodeFormat> = new Set([
  BarcodeFormat.CODE128,
  BarcodeFormat.CODE39,
  BarcodeFormat.EAN13,
  BarcodeFormat.EAN8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.ITF14,
  BarcodeFormat.ITF,
  BarcodeFormat.CODABAR,
  BarcodeFormat.MSI,
  BarcodeFormat.PHARMACODE,
]);

function rowPath(isDark: (column: number) => boolean, width: number, row: number): string {
  let path = '';
  let runStart = -1;
  for (let column = 0; column <= width; column++) {
    const dark = column < width && isDark(column);
    if (dark && runStart < 0) runStart = column;
    if (!dark && runStart >= 0) {
      path += `M${runStart} ${row}h${column - runStart}v1h${runStart - column}z`;
      runStart = -1;
    }
  }
  return path;
}

function encodeLinear(code: string, format: BarcodeFormat): EncodedSymbol | null {
  const Encoder = barcodes[JSBARCODE_FORMAT[format]];
  if (!Encoder) return null;
  const data = format === BarcodeFormat.CODE39 ? code39Symbols(code) : code;
  const encoder = new Encoder(data, { flat: true });
  if (!encoder.valid()) return null;
  const encoded = encoder.encode();
  const bars = 'data' in encoded ? encoded.data : encoded.map((part) => part.data).join('');
  return {
    kind: 'linear',
    modules: bars.length,
    rows: 1,
    path: rowPath((column) => bars[column] === '1', bars.length, 0),
  };
}

function encodeMatrix(code: string): EncodedSymbol {
  const { size, data } = create(code, { errorCorrectionLevel: 'M' }).modules;
  let path = '';
  for (let row = 0; row < size; row++) {
    path += rowPath((column) => data[row * size + column] === 1, size, row);
  }
  return { kind: 'matrix', modules: size, rows: size, path };
}

export function encodeSymbol(code: string, format: BarcodeFormat): EncodedSymbol | null {
  if (code.length === 0) return null;
  try {
    if (format === BarcodeFormat.QR_CODE) return encodeMatrix(code);
    if (!(LINEAR_FORMATS.has(format) && validateBarcode(code, format).valid)) return null;
    return encodeLinear(code, format);
  } catch {
    return null;
  }
}
