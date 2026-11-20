import { create } from 'zustand';

export interface SheetAction {
  readonly label: string;
  readonly run: () => void;
  readonly destructive?: boolean;
}

export interface ActionSheetRequest {
  readonly title: string;
  readonly actions: readonly SheetAction[];
}

export interface BrandPick {
  readonly brandId: string | null;
}

interface UiStoreState {
  actionSheet: ActionSheetRequest | null;
  brandPick: BrandPick | null;
  showActionSheet: (request: ActionSheetRequest) => void;
  hideActionSheet: () => void;
  pickBrand: (brandId: string | null) => void;
  takeBrandPick: () => BrandPick | null;
}

export const useUiStore = create<UiStoreState>()((set, get) => ({
  actionSheet: null,
  brandPick: null,
  showActionSheet: (request) => set({ actionSheet: request }),
  hideActionSheet: () => set({ actionSheet: null }),
  pickBrand: (brandId) => set({ brandPick: { brandId } }),
  takeBrandPick: () => {
    const pick = get().brandPick;
    if (pick) set({ brandPick: null });
    return pick;
  },
}));
