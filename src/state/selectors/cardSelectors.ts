import type { Card, CardId } from '../../domain/card';
import { searchCards } from '../../domain/search';
import { sortCards } from '../../domain/sort';

interface CardStoreData {
  cards: Record<string, Card>;
}

export const selectSortedCards = (state: CardStoreData): Card[] =>
  sortCards(Object.values(state.cards));

export const selectCardById =
  (id: CardId) =>
  (state: CardStoreData): Card | null =>
    state.cards[id] ?? null;

export const selectFavorites = (state: CardStoreData): Card[] =>
  Object.values(state.cards).filter((c) => c.isFavorite);

export const selectRecentCards =
  (limit = 3) =>
  (state: CardStoreData): Card[] =>
    Object.values(state.cards)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);

export const selectSearchResults =
  (query: string) =>
  (state: CardStoreData): Card[] =>
    searchCards(Object.values(state.cards), query);
