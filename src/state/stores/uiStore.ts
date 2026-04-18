import { create } from 'zustand';
import type { CardId } from '../../domain/card';

interface UiStoreState {
  searchQuery: string;
  selectedCardId: CardId | null;
  setSearchQuery: (query: string) => void;
  setSelectedCardId: (id: CardId | null) => void;
  clearSelection: () => void;
}

export const useUiStore = create<UiStoreState>()((set) => ({
  searchQuery: '',
  selectedCardId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCardId: (id) => set({ selectedCardId: id }),
  clearSelection: () => set({ selectedCardId: null }),
}));
