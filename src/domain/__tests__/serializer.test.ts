import { BarcodeFormat, type Card, type CardId } from '../card';
import { deserializeCards, SERIALIZER_VERSION, serializeCards } from '../serializer';

function makeCard(overrides: {
  id: string;
  name: string;
  code?: string;
  format?: BarcodeFormat;
  color?: string;
  note?: string;
  isFavorite?: boolean;
  createdAt?: number;
  updatedAt?: number;
}): Card {
  return {
    id: overrides.id as CardId,
    name: overrides.name,
    code: overrides.code ?? '1234567890128',
    format: overrides.format ?? BarcodeFormat.EAN13,
    isFavorite: overrides.isFavorite ?? false,
    createdAt: overrides.createdAt ?? 1000,
    updatedAt: overrides.updatedAt ?? 1000,
    ...(overrides.color === undefined ? {} : { color: overrides.color }),
    ...(overrides.note === undefined ? {} : { note: overrides.note }),
  };
}

describe('SERIALIZER_VERSION', () => {
  it('is 1', () => {
    expect(SERIALIZER_VERSION).toBe(1);
  });
});

describe('serializeCards', () => {
  it('produces valid JSON with version and cards fields', () => {
    const cards = [makeCard({ id: 'c1', name: 'Test' })];
    const json = serializeCards(cards);
    const parsed = JSON.parse(json) as { version: number; cards: Card[] };
    expect(parsed.version).toBe(SERIALIZER_VERSION);
    expect(parsed.cards).toHaveLength(1);
    expect(parsed.cards[0]?.name).toBe('Test');
  });

  it('serializes empty array', () => {
    const json = serializeCards([]);
    const parsed = JSON.parse(json) as { version: number; cards: Card[] };
    expect(parsed.version).toBe(SERIALIZER_VERSION);
    expect(parsed.cards).toEqual([]);
  });
});

describe('deserializeCards', () => {
  it('round-trips cards losslessly', () => {
    const cards = [
      makeCard({ id: 'c1', name: 'Alpha', color: '#ff0000', note: 'hello' }),
      makeCard({ id: 'c2', name: 'Beta', isFavorite: true, updatedAt: 9999 }),
    ];
    const result = deserializeCards(serializeCards(cards));
    expect(result).toEqual(cards);
  });

  it('throws on invalid JSON', () => {
    expect(() => deserializeCards('not json')).toThrow();
  });

  it('throws on missing version header', () => {
    const json = JSON.stringify({ cards: [] });
    expect(() => deserializeCards(json)).toThrow(/version/i);
  });

  it('throws on card missing required field (no name)', () => {
    const json = JSON.stringify({
      version: 1,
      cards: [
        { id: 'c1', code: '123', format: 'EAN13', isFavorite: false, createdAt: 1, updatedAt: 1 },
      ],
    });
    expect(() => deserializeCards(json)).toThrow(/name/i);
  });

  it('throws on card missing required field (no code)', () => {
    const json = JSON.stringify({
      version: 1,
      cards: [
        { id: 'c1', name: 'Test', format: 'EAN13', isFavorite: false, createdAt: 1, updatedAt: 1 },
      ],
    });
    expect(() => deserializeCards(json)).toThrow(/code/i);
  });

  it('throws on card missing id', () => {
    const json = JSON.stringify({
      version: 1,
      cards: [
        {
          name: 'Test',
          code: '123',
          format: 'EAN13',
          isFavorite: false,
          createdAt: 1,
          updatedAt: 1,
        },
      ],
    });
    expect(() => deserializeCards(json)).toThrow(/id/i);
  });

  it('throws when cards field is not an array', () => {
    const json = JSON.stringify({ version: 1, cards: 'not-an-array' });
    expect(() => deserializeCards(json)).toThrow(/cards/i);
  });

  it('throws when a card entry is not an object (null)', () => {
    const json = JSON.stringify({ version: 1, cards: [null] });
    expect(() => deserializeCards(json)).toThrow(/not an object/i);
  });

  it('throws when a card entry is a primitive', () => {
    const json = JSON.stringify({ version: 1, cards: [42] });
    expect(() => deserializeCards(json)).toThrow(/not an object/i);
  });

  it('throws when version is not a number', () => {
    const json = JSON.stringify({ version: 'one', cards: [] });
    expect(() => deserializeCards(json)).toThrow(/version/i);
  });

  it('throws on non-object parsed JSON (string)', () => {
    expect(() => deserializeCards('"just a string"')).toThrow(/version/i);
  });

  it('throws on null parsed JSON', () => {
    expect(() => deserializeCards('null')).toThrow(/version/i);
  });
});
