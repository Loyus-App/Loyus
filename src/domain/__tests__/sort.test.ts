import { BarcodeFormat, type Card, type CardId } from '../card';
import { sortCards } from '../sort';

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

describe('sortCards', () => {
  const favNew = makeCard({ id: 'fav-new', name: 'Alpha', isFavorite: true, updatedAt: 2000 });
  const favOld = makeCard({ id: 'fav-old', name: 'Beta', isFavorite: true, updatedAt: 1000 });
  const nonFavNew = makeCard({ id: 'nf-new', name: 'Gamma', isFavorite: false, updatedAt: 2000 });
  const nonFavOld = makeCard({ id: 'nf-old', name: 'Delta', isFavorite: false, updatedAt: 1000 });

  it('places favorites before non-favorites', () => {
    const result = sortCards([nonFavNew, favOld, nonFavOld, favNew]);
    expect(result[0]?.isFavorite).toBe(true);
    expect(result[1]?.isFavorite).toBe(true);
    expect(result[2]?.isFavorite).toBe(false);
    expect(result[3]?.isFavorite).toBe(false);
  });

  it('sorts favorites by updatedAt descending', () => {
    const result = sortCards([favOld, favNew]);
    expect(result[0]?.id).toBe(favNew.id);
    expect(result[1]?.id).toBe(favOld.id);
  });

  it('sorts non-favorites by updatedAt descending', () => {
    const result = sortCards([nonFavOld, nonFavNew]);
    expect(result[0]?.id).toBe(nonFavNew.id);
    expect(result[1]?.id).toBe(nonFavOld.id);
  });

  it('breaks ties by name ascending', () => {
    const a = makeCard({ id: 'a', name: 'Zebra', isFavorite: false, updatedAt: 1000 });
    const b = makeCard({ id: 'b', name: 'Apple', isFavorite: false, updatedAt: 1000 });
    const result = sortCards([a, b]);
    expect(result[0]?.name).toBe('Apple');
    expect(result[1]?.name).toBe('Zebra');
  });

  it('returns empty array for empty input', () => {
    expect(sortCards([])).toEqual([]);
  });

  it('returns single-element array unchanged', () => {
    const result = sortCards([favNew]);
    expect(result).toEqual([favNew]);
  });

  it('does not mutate the original array', () => {
    const original = [nonFavNew, favOld];
    const copy = [...original];
    sortCards(original);
    expect(original).toEqual(copy);
  });
});
