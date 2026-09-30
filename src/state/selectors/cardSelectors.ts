import type { Card, CardId } from '../../domain/card';
import { searchCards } from '../../domain/search';
import { type SortMode, sortCards } from '../../domain/sort';

interface CardStoreData {
  cards: Record<string, Card>;
  manualOrder?: readonly string[] | undefined;
}

export const selectCardById =
  (id: CardId) =>
  (state: CardStoreData): Card | null =>
    state.cards[id] ?? null;

export const selectPinnedCards =
  (mode: SortMode) =>
  (state: CardStoreData): Card[] =>
    sortCards(
      Object.values(state.cards).filter((card) => card.isPinned),
      mode,
      state.manualOrder,
    );

export const selectUnpinnedCards =
  (mode: SortMode) =>
  (state: CardStoreData): Card[] =>
    sortCards(
      Object.values(state.cards).filter((card) => !card.isPinned),
      mode,
      state.manualOrder,
    );

export const selectRecentlyOpened =
  (limit = 6) =>
  (state: CardStoreData): Card[] =>
    sortCards(
      Object.values(state.cards).filter((card) => card.lastOpenedAt !== undefined),
      'recent',
    ).slice(0, limit);

export const selectSearchResults =
  (query: string) =>
  (state: CardStoreData): Card[] =>
    searchCards(Object.values(state.cards), query);
