import { makeCard } from '@/testing/makeCard';
import {
  BarcodeFormat,
  type CardId,
  cardInitials,
  compactPhotos,
  createCard,
  FORMAT_LABEL,
  findDuplicate,
  formatCodeForDisplay,
  JSBARCODE_FORMAT,
  photoFileNames,
} from '../card';

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

  it('starts unpinned and never opened', () => {
    const card = createCard(baseInput);
    expect(card.isPinned).toBe(false);
    expect(card.openCount).toBe(0);
    expect(card.lastOpenedAt).toBeUndefined();
  });

  it('trims text fields and drops blank optional ones', () => {
    const card = createCard({ ...baseInput, name: '  Carrefour ', owner: '  ', note: ' Léa ' });
    expect(card.name).toBe('Carrefour');
    expect(card.owner).toBeUndefined();
    expect(card.note).toBe('Léa');
  });

  it('keeps the owner and pinned flag when provided', () => {
    const card = createCard({ ...baseInput, owner: 'Léa', isPinned: true });
    expect(card.owner).toBe('Léa');
    expect(card.isPinned).toBe(true);
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

  it('keeps photo file names and drops empty sides', () => {
    const card = createCard({ ...baseInput, photos: { front: 'front.jpg', back: '' } });
    expect(card.photos).toEqual({ front: 'front.jpg' });
  });

  it('omits photos when none are set', () => {
    const card = createCard({ ...baseInput, photos: { front: undefined } });
    expect(card).not.toHaveProperty('photos');
  });
});

describe('compactPhotos', () => {
  it('returns undefined without any photo', () => {
    expect(compactPhotos(undefined)).toBeUndefined();
    expect(compactPhotos({})).toBeUndefined();
    expect(compactPhotos({ front: '', back: undefined })).toBeUndefined();
  });

  it('keeps only the sides that are set', () => {
    expect(compactPhotos({ front: undefined, back: 'b.jpg' })).toEqual({ back: 'b.jpg' });
    expect(compactPhotos({ front: 'a.jpg', back: 'b.jpg' })).toEqual({
      front: 'a.jpg',
      back: 'b.jpg',
    });
  });
});

describe('photoFileNames', () => {
  it('lists the file names front first', () => {
    expect(photoFileNames({ front: 'a.jpg', back: 'b.jpg' })).toEqual(['a.jpg', 'b.jpg']);
    expect(photoFileNames({ back: 'b.jpg' })).toEqual(['b.jpg']);
  });

  it('is empty without photos', () => {
    expect(photoFileNames(undefined)).toEqual([]);
    expect(photoFileNames({ front: '' })).toEqual([]);
  });
});

describe('FORMAT_LABEL', () => {
  it('labels every format', () => {
    for (const format of Object.values(BarcodeFormat)) {
      expect(FORMAT_LABEL[format]).toEqual(expect.any(String));
    }
  });
});

describe('cardInitials', () => {
  it.each([
    ['Carrefour', 'CA'],
    ['Leroy Merlin', 'LM'],
    ['Petal & Stem', 'PS'],
    ['H&M', 'HM'],
    ['  décathlon  sport ', 'DS'],
    ['Ö', 'Ö'],
    ['', '?'],
  ])('%s -> %s', (name, initials) => {
    expect(cardInitials(name)).toBe(initials);
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

describe('findDuplicate', () => {
  const cards = [
    makeCard({ id: 'a', name: 'A', code: '111' }),
    makeCard({ id: 'b', name: 'B', code: '222' }),
  ];

  it('finds a card with the same code', () => {
    expect(findDuplicate(cards, ' 222 ')?.id).toBe('b');
  });

  it('ignores the card being edited', () => {
    expect(findDuplicate(cards, '222', 'b' as CardId)).toBeUndefined();
  });

  it('returns undefined for a blank code', () => {
    expect(findDuplicate(cards, '  ')).toBeUndefined();
  });
});
