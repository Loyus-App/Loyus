import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BarcodeFormat, Card, CardId, CardPhotos } from '../../domain/card';
import { createCard } from '../../domain/card';
import { runMigrations } from '../../domain/migration';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import { CARD_STORE_VERSION, cardMigrations } from '../migrations/cardMigrations';

type EditableFields = Pick<
  Card,
  'name' | 'code' | 'format' | 'color' | 'brandId' | 'owner' | 'note' | 'photos' | 'isPinned'
>;

export interface ImportSummary {
  readonly added: number;
  readonly skipped: number;
}

interface CardStoreState {
  cards: Record<string, Card>;
  manualOrder: CardId[];
  manualOrderCustomized: boolean;
  addCard: (params: {
    name: string;
    code: string;
    format: BarcodeFormat;
    color?: string | undefined;
    brandId?: string | undefined;
    owner?: string | undefined;
    note?: string | undefined;
    photos?: CardPhotos | undefined;
    isPinned?: boolean | undefined;
  }) => CardId;
  updateCard: (id: CardId, patch: Partial<EditableFields>) => void;
  removeCard: (id: CardId) => void;
  togglePinned: (id: CardId) => void;
  recordOpen: (id: CardId) => void;
  toggleBarcodeRotation: (id: CardId) => void;
  importCards: (cards: readonly Card[]) => ImportSummary;
  setManualOrder: (ids: readonly CardId[], options?: { readonly seeded?: boolean }) => void;
}

function patchCard(
  cards: Record<string, Card>,
  id: CardId,
  patch: (card: Card) => Partial<Card>,
): Record<string, Card> | null {
  const existing = cards[id];
  if (!existing) return null;
  return { ...cards, [id]: { ...existing, ...patch(existing) } };
}

export const useCardStore = create<CardStoreState>()(
  persist(
    (set, get) => ({
      cards: {},
      manualOrder: [],
      manualOrderCustomized: false,

      addCard: (params) => {
        const card = createCard({ ...params, id: randomUUID() as CardId });
        set((state) => ({
          cards: { ...state.cards, [card.id]: card },
          manualOrder: [...state.manualOrder, card.id],
        }));
        return card.id;
      },

      updateCard: (id, patch) =>
        set((state) => {
          const cards = patchCard(state.cards, id, () => ({ ...patch, updatedAt: Date.now() }));
          return cards ? { cards } : state;
        }),

      removeCard: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.cards;
          return { cards: rest, manualOrder: state.manualOrder.filter((known) => known !== id) };
        }),

      togglePinned: (id) =>
        set((state) => {
          const cards = patchCard(state.cards, id, (card) => ({ isPinned: !card.isPinned }));
          return cards ? { cards } : state;
        }),

      recordOpen: (id) =>
        set((state) => {
          const cards = patchCard(state.cards, id, (card) => ({
            openCount: card.openCount + 1,
            lastOpenedAt: Date.now(),
          }));
          return cards ? { cards } : state;
        }),

      toggleBarcodeRotation: (id) =>
        set((state) => {
          const cards = patchCard(state.cards, id, (card) => ({
            barcodeRotated: !card.barcodeRotated,
          }));
          return cards ? { cards } : state;
        }),

      importCards: (incoming) => {
        const existing = get().cards;
        const knownCodes = new Set(Object.values(existing).map((card) => card.code));
        const added: Record<string, Card> = {};
        const addedIds: CardId[] = [];
        for (const card of incoming) {
          if (knownCodes.has(card.code) || existing[card.id] || added[card.id]) continue;
          knownCodes.add(card.code);
          added[card.id] = card;
          addedIds.push(card.id);
        }
        set((state) => ({
          cards: { ...state.cards, ...added },
          manualOrder: [...state.manualOrder, ...addedIds],
        }));
        return { added: addedIds.length, skipped: incoming.length - addedIds.length };
      },

      setManualOrder: (ids, options) =>
        set((state) => ({
          manualOrder: [...new Set(ids)].filter((id) => state.cards[id] !== undefined),
          manualOrderCustomized: state.manualOrderCustomized || !options?.seeded,
        })),
    }),
    {
      name: 'cards',
      storage: createJSONStorage(() => mmkvStateStorage),
      version: CARD_STORE_VERSION,
      migrate: (persisted, version) =>
        runMigrations(persisted, version, CARD_STORE_VERSION, cardMigrations) as CardStoreState,
      partialize: (state) => ({
        cards: state.cards,
        manualOrder: state.manualOrder,
        manualOrderCustomized: state.manualOrderCustomized,
      }),
    },
  ),
);
