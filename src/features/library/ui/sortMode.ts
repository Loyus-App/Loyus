import type { SortMode } from '@/entities/card/domain/sort';
import { selectPinnedCards, selectUnpinnedCards } from '@/entities/card/state/cardSelectors';
import { useCardStore } from '@/entities/card/state/cardStore';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { shownCardOrder } from './useSessionOrder';

function seedManualOrder(previous: SortMode): void {
  const state = useCardStore.getState();
  if (state.manualOrderCustomized) return;
  const sorted = [...selectPinnedCards(previous)(state), ...selectUnpinnedCards(previous)(state)];
  state.setManualOrder([...shownCardOrder(), ...sorted.map((card) => card.id)], { seeded: true });
}

export function chooseSortMode(mode: SortMode): void {
  const { sortMode, setSortMode } = useSettingsStore.getState();
  if (mode === sortMode) return;
  if (mode === 'manual') seedManualOrder(sortMode);
  setSortMode(mode);
}
