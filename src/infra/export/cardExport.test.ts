import { BarcodeFormat, type Card } from '../../domain/card';
import { SERIALIZER_VERSION } from '../../domain/serializer';

// Import pure functions only — exportCards depends on native modules
import { buildExportFileName, buildExportJson } from './cardExport';

const sampleCard: Card = {
  id: 'card-1' as Card['id'],
  name: 'Test Store',
  code: '1234567890128',
  format: BarcodeFormat.EAN13,
  isFavorite: false,
  createdAt: 1700000000000,
  updatedAt: 1700000000000,
};

describe('buildExportFileName', () => {
  it('returns loyus-cards-YYYY-MM-DD.json for a given date', () => {
    const date = new Date('2026-04-14T12:00:00Z');
    expect(buildExportFileName(date)).toBe('loyus-cards-2026-04-14.json');
  });

  it('pads single-digit month and day', () => {
    const date = new Date('2026-01-05T00:00:00Z');
    expect(buildExportFileName(date)).toBe('loyus-cards-2026-01-05.json');
  });
});

describe('buildExportJson', () => {
  it('returns indented JSON with version header and all cards', () => {
    const json = buildExportJson([sampleCard]);
    const parsed = JSON.parse(json);

    expect(parsed.version).toBe(SERIALIZER_VERSION);
    expect(parsed.exportedAt).toBeDefined();
    expect(parsed.cards).toHaveLength(1);
    expect(parsed.cards[0]).toEqual(sampleCard);

    // Verify it's indented (pretty-printed)
    expect(json).toContain('\n');
    expect(json).toContain('  ');
  });

  it('returns valid JSON with empty cards array', () => {
    const json = buildExportJson([]);
    const parsed = JSON.parse(json);

    expect(parsed.version).toBe(SERIALIZER_VERSION);
    expect(parsed.exportedAt).toBeDefined();
    expect(parsed.cards).toEqual([]);
  });

  it('includes all card fields', () => {
    const fullCard: Card = {
      ...sampleCard,
      color: '#FF0000',
      note: 'A note',
      isFavorite: true,
    };
    const json = buildExportJson([fullCard]);
    const parsed = JSON.parse(json);

    expect(parsed.cards[0].color).toBe('#FF0000');
    expect(parsed.cards[0].note).toBe('A note');
    expect(parsed.cards[0].isFavorite).toBe(true);
  });
});
