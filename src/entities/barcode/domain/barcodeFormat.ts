export enum BarcodeFormat {
  CODE128 = 'CODE128',
  CODE39 = 'CODE39',
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  UPC_A = 'UPC_A',
  UPC_E = 'UPC_E',
  ITF14 = 'ITF14',
  ITF = 'ITF',
  CODABAR = 'CODABAR',
  MSI = 'MSI',
  PHARMACODE = 'PHARMACODE',
  QR_CODE = 'QR_CODE',
  DATA_MATRIX = 'DATA_MATRIX',
  PDF417 = 'PDF417',
  AZTEC = 'AZTEC',
  GS1_DATABAR = 'GS1_DATABAR',
}

export const JSBARCODE_FORMAT: Record<BarcodeFormat, string> = {
  [BarcodeFormat.CODE128]: 'CODE128',
  [BarcodeFormat.CODE39]: 'CODE39',
  [BarcodeFormat.EAN13]: 'EAN13',
  [BarcodeFormat.EAN8]: 'EAN8',
  [BarcodeFormat.UPC_A]: 'UPC',
  [BarcodeFormat.UPC_E]: 'UPCE',
  [BarcodeFormat.ITF14]: 'ITF14',
  [BarcodeFormat.ITF]: 'ITF',
  [BarcodeFormat.CODABAR]: 'codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'pharmacode',
  [BarcodeFormat.QR_CODE]: 'QR_CODE',
  [BarcodeFormat.DATA_MATRIX]: 'DATA_MATRIX',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'AZTEC',
  [BarcodeFormat.GS1_DATABAR]: 'GS1_DATABAR',
};

export const FORMAT_LABEL: Record<BarcodeFormat, string> = {
  [BarcodeFormat.EAN13]: 'EAN-13',
  [BarcodeFormat.EAN8]: 'EAN-8',
  [BarcodeFormat.UPC_A]: 'UPC-A',
  [BarcodeFormat.UPC_E]: 'UPC-E',
  [BarcodeFormat.ITF14]: 'ITF-14',
  [BarcodeFormat.ITF]: 'ITF',
  [BarcodeFormat.CODE128]: 'Code 128',
  [BarcodeFormat.CODE39]: 'Code 39',
  [BarcodeFormat.CODABAR]: 'Codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'Pharmacode',
  [BarcodeFormat.QR_CODE]: 'QR code',
  [BarcodeFormat.DATA_MATRIX]: 'Data Matrix',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'Aztec',
  [BarcodeFormat.GS1_DATABAR]: 'GS1 DataBar',
};

const BARCODE_FORMATS: ReadonlySet<string> = new Set(Object.values(BarcodeFormat));

export function isBarcodeFormat(value: unknown): value is BarcodeFormat {
  return typeof value === 'string' && BARCODE_FORMATS.has(value);
}

const DIGITS = /^\d+$/;
const GROUPS_OF_FOUR = /(\d{4})(?=\d)/g;

function splitBy(code: string, sizes: readonly number[]): string {
  const parts: string[] = [];
  let index = 0;
  for (const size of sizes) {
    parts.push(code.slice(index, index + size));
    index += size;
  }
  return parts.filter(Boolean).join(' ');
}

export function formatCodeForDisplay(code: string, format: BarcodeFormat): string {
  if (!DIGITS.test(code)) return code;
  if (format === BarcodeFormat.EAN13 && code.length === 13) return splitBy(code, [1, 6, 6]);
  if (format === BarcodeFormat.EAN8 && code.length === 8) return splitBy(code, [4, 4]);
  if (format === BarcodeFormat.UPC_A && code.length === 12) return splitBy(code, [1, 5, 5, 1]);
  return code.replace(GROUPS_OF_FOUR, '$1 ');
}
