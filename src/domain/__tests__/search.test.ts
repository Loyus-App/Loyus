import { BarcodeFormat, type Card, type CardId } from '../card';
import { normalizeForSearch, searchCards } from '../search';

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
    code: overrides.code ?? '0000000000000',
    format: overrides.format ?? BarcodeFormat.EAN13,
    isFavorite: overrides.isFavorite ?? false,
    createdAt: overrides.createdAt ?? 1000,
    updatedAt: overrides.updatedAt ?? 1000,
    ...(overrides.color === undefined ? {} : { color: overrides.color }),
    ...(overrides.note === undefined ? {} : { note: overrides.note }),
  };
}

describe('normalizeForSearch', () => {
  it('lowercases and strips diacritics from "Café"', () => {
    expect(normalizeForSearch('Café')).toBe('cafe');
  });

  it('lowercases "Carrefour"', () => {
    expect(normalizeForSearch('Carrefour')).toBe('carrefour');
  });

  it('lowercases "HELLO"', () => {
    expect(normalizeForSearch('HELLO')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(normalizeForSearch('')).toBe('');
  });
});

describe('searchCards', () => {
  const carrefour = makeCard({ id: 'c1', name: 'Carrefour', code: '3250392847291' });
  const monoprix = makeCard({ id: 'c2', name: 'Monoprix', code: '4912345678901' });
  const codeMatch = makeCard({ id: 'c3', name: 'Lidl', code: 'CARRE999' });

  it('finds card by name substring', () => {
    const result = searchCards([carrefour, monoprix], 'carre');
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(carrefour.id);
  });

  it('finds card by code substring', () => {
    const result = searchCards([carrefour, monoprix], '491');
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(monoprix.id);
  });

  it('ranks name match above code match', () => {
    // carrefour matches by name (score=2), codeMatch matches by code (score=1)
    const result = searchCards([codeMatch, carrefour], 'carre');
    expect(result[0]?.id).toBe(carrefour.id);
    expect(result[1]?.id).toBe(codeMatch.id);
  });

  it('returns empty array for empty query', () => {
    expect(searchCards([carrefour], '')).toEqual([]);
  });

  it('returns empty array for whitespace query', () => {
    expect(searchCards([carrefour], '   ')).toEqual([]);
  });

  it('returns empty array when no matches', () => {
    expect(searchCards([carrefour, monoprix], 'zzz')).toEqual([]);
  });

  it('is case-insensitive', () => {
    const result = searchCards([carrefour], 'CARRE');
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(carrefour.id);
  });

  it('handles diacritics in search: "cafe" matches "Café"', () => {
    const cafe = makeCard({ id: 'cafe', name: 'Café' });
    const result = searchCards([cafe], 'cafe');
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(cafe.id);
  });

  it('gives additive score 3 when both name and code match', () => {
    // "123" appears in both name and code → score 2+1=3
    const both = makeCard({ id: 'both', name: 'Store 123', code: '1234567' });
    const nameOnly = makeCard({ id: 'name', name: 'Store 123', code: '9999999' });
    const codeOnly = makeCard({ id: 'code', name: 'Unrelated', code: '1234567' });
    const result = searchCards([codeOnly, nameOnly, both], '123');
    // both (score 3) should come first, then nameOnly (2), then codeOnly (1)
    expect(result[0]?.id).toBe('both');
    expect(result[1]?.id).toBe('name');
    expect(result[2]?.id).toBe('code');
  });

  it('sorts same-score results by name ascending', () => {
    const z = makeCard({ id: 'z', name: 'Zebra Store', code: '111' });
    const a = makeCard({ id: 'a', name: 'Alpha Store', code: '222' });
    const result = searchCards([z, a], 'store');
    expect(result[0]?.name).toBe('Alpha Store');
    expect(result[1]?.name).toBe('Zebra Store');
  });
});
