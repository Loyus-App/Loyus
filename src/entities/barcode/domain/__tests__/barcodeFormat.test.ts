import {
  BarcodeFormat,
  FORMAT_LABEL,
  formatCodeForDisplay,
  isBarcodeFormat,
  JSBARCODE_FORMAT,
} from '../barcodeFormat';

describe('BarcodeFormat enum', () => {
  it('has exactly 16 values', () => {
    const values = Object.values(BarcodeFormat);
    expect(values).toHaveLength(16);
  });

  it.each([
    'CODE128',
    'CODE39',
    'EAN13',
    'EAN8',
    'UPC_A',
    'UPC_E',
    'ITF14',
    'CODABAR',
    'MSI',
    'PHARMACODE',
    'QR_CODE',
    'DATA_MATRIX',
    'PDF417',
    'AZTEC',
    'GS1_DATABAR',
  ] as const)('contains %s', (format) => {
    expect(BarcodeFormat[format]).toBeDefined();
  });
});

describe('JSBARCODE_FORMAT', () => {
  it('maps CODE128 to "CODE128"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.CODE128]).toBe('CODE128');
  });

  it('maps CODE39 to "CODE39"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.CODE39]).toBe('CODE39');
  });

  it('maps EAN13 to "EAN13"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.EAN13]).toBe('EAN13');
  });

  it('maps EAN8 to "EAN8"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.EAN8]).toBe('EAN8');
  });

  it('maps UPC_A to "UPC" (not "UPCA")', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.UPC_A]).toBe('UPC');
  });

  it('maps UPC_E to "UPCE" (not "UPC_E")', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.UPC_E]).toBe('UPCE');
  });

  it('maps ITF14 to "ITF14"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.ITF14]).toBe('ITF14');
  });

  it('maps CODABAR to "codabar" (lowercase)', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.CODABAR]).toBe('codabar');
  });

  it('maps MSI to "MSI"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.MSI]).toBe('MSI');
  });

  it('maps PHARMACODE to "pharmacode" (lowercase)', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.PHARMACODE]).toBe('pharmacode');
  });

  it('maps QR_CODE to "QR_CODE"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.QR_CODE]).toBe('QR_CODE');
  });

  it('maps DATA_MATRIX to "DATA_MATRIX"', () => {
    expect(JSBARCODE_FORMAT[BarcodeFormat.DATA_MATRIX]).toBe('DATA_MATRIX');
  });

  it('has an entry for every BarcodeFormat value', () => {
    for (const format of Object.values(BarcodeFormat)) {
      expect(JSBARCODE_FORMAT[format]).toBeDefined();
    }
  });
});

describe('isBarcodeFormat', () => {
  it('accepts only known format names', () => {
    expect(isBarcodeFormat('ITF')).toBe(true);
    expect(isBarcodeFormat('EAN-13')).toBe(false);
    expect(isBarcodeFormat(42)).toBe(false);
  });
});

describe('FORMAT_LABEL', () => {
  it('labels every format', () => {
    for (const format of Object.values(BarcodeFormat)) {
      expect(FORMAT_LABEL[format]).toEqual(expect.any(String));
    }
  });
});

describe('formatCodeForDisplay', () => {
  it.each([
    ['2001234567893', BarcodeFormat.EAN13, '2 001234 567893'],
    ['96385074', BarcodeFormat.EAN8, '9638 5074'],
    ['036000291452', BarcodeFormat.UPC_A, '0 36000 29145 2'],
    ['1234567890', BarcodeFormat.CODE128, '1234 5678 90'],
    ['ABC-123', BarcodeFormat.CODE128, 'ABC-123'],
    ['123', BarcodeFormat.EAN13, '123'],
  ])('%s (%s) -> %s', (code, format, expected) => {
    expect(formatCodeForDisplay(code, format)).toBe(expected);
  });
});
