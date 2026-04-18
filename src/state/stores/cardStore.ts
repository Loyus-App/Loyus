import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BarcodeFormat, Card, CardId } from '../../domain/card';
import { createCard } from '../../domain/card';
import { runMigrations } from '../../domain/migration';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import { CARD_STORE_VERSION, cardMigrations } from '../migrations/cardMigrations';

interface CardStoreState {
  cards: Record<string, Card>;
  addCard: (params: {
    name: string;
    code: string;
    format: BarcodeFormat;
    color?: string;
    note?: string;
  }) => CardId;
  updateCard: (
    id: CardId,
    patch: Partial<Pick<Card, 'name' | 'code' | 'format' | 'color' | 'note'>>,
  ) => void;
  removeCard: (id: CardId) => void;
  toggleFavorite: (id: CardId) => void;
  recordOpen: (id: CardId) => void;
  toggleBarcodeRotation: (id: CardId) => void;
}

export const useCardStore = create<CardStoreState>()(
  persist(
    (set) => ({
      cards: {},

      addCard: (params) => {
        const card = createCard({
          ...params,
          id: randomUUID() as CardId,
        });
        set((state) => ({
          cards: { ...state.cards, [card.id]: card },
        }));
        return card.id;
      },

      updateCard: (id, patch) =>
        set((state) => {
          const existing = state.cards[id];
          if (!existing) return state;
          return {
            cards: {
              ...state.cards,
              [id]: { ...existing, ...patch, updatedAt: Date.now() },
            },
          };
        }),

      removeCard: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.cards;
          return { cards: rest };
        }),

      toggleFavorite: (id) =>
        set((state) => {
          const existing = state.cards[id];
          if (!existing) return state;
          return {
            cards: {
              ...state.cards,
              [id]: {
                ...existing,
                isFavorite: !existing.isFavorite,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      recordOpen: (id) =>
        set((state) => {
          const existing = state.cards[id];
          if (!existing) return state;
          return {
            cards: {
              ...state.cards,
              [id]: { ...existing, updatedAt: Date.now() },
            },
          };
        }),

      toggleBarcodeRotation: (id) =>
        set((state) => {
          const existing = state.cards[id];
          if (!existing) return state;
          return {
            cards: {
              ...state.cards,
              [id]: {
                ...existing,
                barcodeRotated: !existing.barcodeRotated,
              },
            },
          };
        }),
    }),
    {
      name: 'cards',
      storage: createJSONStorage(() => mmkvStateStorage),
      version: CARD_STORE_VERSION,
      migrate: (persisted, version) =>
        runMigrations(persisted, version, CARD_STORE_VERSION, cardMigrations) as CardStoreState,
      partialize: (state) => ({ cards: state.cards }),
    },
  ),
);
