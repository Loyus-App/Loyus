import { BarcodeFormat, type CardId, createCard, JSBARCODE_FORMAT } from '../card';

describe('BarcodeFormat enum', () => {
  it('has exactly 15 values', () => {
    const values = Object.values(BarcodeFormat);
    expect(values).toHaveLength(15);
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

describe('createCard', () => {
  const baseInput = {
    id: 'test-uuid-1234' as CardId,
    name: 'Carrefour',
    code: '4006381333931',
    format: BarcodeFormat.EAN13,
  };

  it('returns a Card with correct fields', () => {
    const card = createCard(baseInput);

    expect(card.id).toBe('test-uuid-1234');
    expect(card.name).toBe('Carrefour');
    expect(card.code).toBe('4006381333931');
    expect(card.format).toBe(BarcodeFormat.EAN13);
  });

  it('sets isFavorite to false', () => {
    const card = createCard(baseInput);
    expect(card.isFavorite).toBe(false);
  });

  it('sets timestamps as numbers > 0', () => {
    const card = createCard(baseInput);
    expect(typeof card.createdAt).toBe('number');
    expect(typeof card.updatedAt).toBe('number');
    expect(card.createdAt).toBeGreaterThan(0);
    expect(card.updatedAt).toBeGreaterThan(0);
  });

  it('sets createdAt and updatedAt to the same value', () => {
    const card = createCard(baseInput);
    expect(card.createdAt).toBe(card.updatedAt);
  });

  it('preserves optional color when provided', () => {
    const card = createCard({ ...baseInput, color: '#FF0000' });
    expect(card.color).toBe('#FF0000');
  });

  it('preserves optional note when provided', () => {
    const card = createCard({ ...baseInput, note: 'Weekly shopping' });
    expect(card.note).toBe('Weekly shopping');
  });

  it('omits color when not provided', () => {
    const card = createCard(baseInput);
    expect(card.color).toBeUndefined();
  });

  it('omits note when not provided', () => {
    const card = createCard(baseInput);
    expect(card.note).toBeUndefined();
  });
});
