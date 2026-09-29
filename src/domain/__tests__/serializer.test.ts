import { makeCard } from '@/testing/makeCard';
import type { Card } from '../card';
import { deserializeCards, portableCard, SERIALIZER_VERSION, serializeCards } from '../serializer';

describe('SERIALIZER_VERSION', () => {
  it('is 2', () => {
    expect(SERIALIZER_VERSION).toBe(2);
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
  it('imports version 1 backups, mapping isFavorite to isPinned', () => {
    const legacy = JSON.stringify({
      version: 1,
      cards: [
        {
          id: 'c1',
          name: 'Old',
          code: '1',
          format: 'EAN13',
          isFavorite: true,
          createdAt: 1,
          updatedAt: 2,
        },
      ],
    });
    const [card] = deserializeCards(legacy);
    expect(card).toEqual({
      id: 'c1',
      name: 'Old',
      code: '1',
      format: 'EAN13',
      isPinned: true,
      openCount: 0,
      createdAt: 1,
      updatedAt: 2,
    });
  });

  it('round-trips cards losslessly', () => {
    const cards = [
      makeCard({ id: 'c1', name: 'Alpha', color: '#ff0000', note: 'hello' }),
      makeCard({ id: 'c2', name: 'Beta', isPinned: true, updatedAt: 9999 }),
    ];
    const result = deserializeCards(serializeCards(cards));
    expect(result).toEqual(cards);
  });

  it('keeps a linked brand and drops a malformed one', () => {
    const linked = makeCard({ id: 'c1', name: 'Carrefour', brandId: 'carrefour' });
    expect(deserializeCards(serializeCards([linked]))[0]?.brandId).toBe('carrefour');

    const json = JSON.stringify({ version: 2, cards: [{ ...linked, brandId: 42 }] });
    expect(deserializeCards(json)[0]).not.toHaveProperty('brandId');
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

describe('photos', () => {
  const photos = { front: 'a.jpg', back: 'b.jpg' };

  it('are left out of a backup', () => {
    const json = serializeCards([makeCard({ id: 'c1', name: 'Alpha', photos })]);
    const parsed = JSON.parse(json) as { cards: Record<string, unknown>[] };
    expect(parsed.cards[0]).not.toHaveProperty('photos');
    expect(parsed.cards[0]?.name).toBe('Alpha');
  });

  it('are never read from a backup file', () => {
    const json = JSON.stringify({
      version: 2,
      cards: [{ ...makeCard({ id: 'c1', name: 'Alpha' }), photos: { front: '../mmkv' } }],
    });
    const [card] = deserializeCards(json);
    expect(card).not.toHaveProperty('photos');
    expect(card?.name).toBe('Alpha');
  });

  it('portableCard keeps every other field', () => {
    const card = makeCard({ id: 'c1', name: 'Alpha', note: 'PIN 1234', photos });
    const { photos: _photos, ...rest } = card;
    expect(portableCard(card)).toEqual(rest);
  });
});
