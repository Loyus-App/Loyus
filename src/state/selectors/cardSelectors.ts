import type { Card, CardId } from '../../domain/card';
import { searchCards } from '../../domain/search';
import { sortCards } from '../../domain/sort';

interface CardStoreData {
  cards: Record<string, Card>;
}

/** All cards sorted by favorites-first, then updatedAt desc. */
export const selectSortedCards = (state: CardStoreData): Card[] =>
  sortCards(Object.values(state.cards));

/** Single card by id, or null if not found. */
export const selectCardById =
  (id: CardId) =>
  (state: CardStoreData): Card | null =>
    state.cards[id] ?? null;

/** All favorite cards. */
export const selectFavorites = (state: CardStoreData): Card[] =>
  Object.values(state.cards).filter((c) => c.isFavorite);

/** Most recently updated cards, limited to `limit` (default 3). */
export const selectRecentCards =
  (limit = 3) =>
  (state: CardStoreData): Card[] =>
    Object.values(state.cards)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);

/** Cards matching query via domain search (scored ranking). */
export const selectSearchResults =
  (query: string) =>
  (state: CardStoreData): Card[] =>
    searchCards(Object.values(state.cards), query);
