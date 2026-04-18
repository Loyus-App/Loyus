import { BarcodeFormat, type Card, type CardId } from '../../../domain/card';
import {
  selectCardById,
  selectFavorites,
  selectRecentCards,
  selectSearchResults,
  selectSortedCards,
} from '../cardSelectors';

function makeCard(overrides: {
  id: string;
  name: string;
  code?: string;
  isFavorite?: boolean;
  updatedAt?: number;
}): Card {
  return {
    id: overrides.id as CardId,
    name: overrides.name,
    code: overrides.code ?? '0000000000000',
    format: BarcodeFormat.EAN13,
    isFavorite: overrides.isFavorite ?? false,
    createdAt: 1000,
    updatedAt: overrides.updatedAt ?? 1000,
  };
}

const fav1 = makeCard({ id: 'f1', name: 'Alpha', isFavorite: true, updatedAt: 3000 });
const fav2 = makeCard({ id: 'f2', name: 'Beta', isFavorite: true, updatedAt: 2000 });
const card1 = makeCard({ id: 'c1', name: 'Gamma', updatedAt: 4000 });
const card2 = makeCard({ id: 'c2', name: 'Delta', updatedAt: 1000 });

const state = {
  cards: {
    [fav1.id]: fav1,
    [fav2.id]: fav2,
    [card1.id]: card1,
    [card2.id]: card2,
  },
};

describe('selectSortedCards', () => {
  it('returns favorites first, then by updatedAt desc', () => {
    const result = selectSortedCards(state);
    expect(result[0]?.id).toBe('f1');
    expect(result[1]?.id).toBe('f2');
    expect(result[2]?.isFavorite).toBe(false);
  });
});

describe('selectCardById', () => {
  it('returns the card when found', () => {
    const card = selectCardById('f1' as CardId)(state);
    expect(card).not.toBeNull();
    expect(card?.name).toBe('Alpha');
  });

  it('returns null when not found', () => {
    const card = selectCardById('nonexistent' as CardId)(state);
    expect(card).toBeNull();
  });
});

describe('selectFavorites', () => {
  it('returns only favorite cards', () => {
    const result = selectFavorites(state);
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.isFavorite)).toBe(true);
  });

  it('returns empty array when no favorites', () => {
    const noFavs = { cards: { [card1.id]: card1, [card2.id]: card2 } };
    expect(selectFavorites(noFavs)).toEqual([]);
  });
});

describe('selectRecentCards', () => {
  it('returns cards sorted by updatedAt desc, limited to default 3', () => {
    const result = selectRecentCards()(state);
    expect(result).toHaveLength(3);
    expect(result[0]?.updatedAt).toBeGreaterThanOrEqual(result[1]?.updatedAt);
  });

  it('respects custom limit', () => {
    const result = selectRecentCards(2)(state);
    expect(result).toHaveLength(2);
  });

  it('returns all cards when limit exceeds count', () => {
    const result = selectRecentCards(10)(state);
    expect(result).toHaveLength(4);
  });
});

describe('selectSearchResults', () => {
  it('finds cards by name query', () => {
    const result = selectSearchResults('alpha')(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f1');
  });

  it('returns empty for empty query', () => {
    expect(selectSearchResults('')(state)).toEqual([]);
  });

  it('returns empty when no matches', () => {
    expect(selectSearchResults('zzzzz')(state)).toEqual([]);
  });
});
