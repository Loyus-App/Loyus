import type { SortMode } from '@/domain/sort';
import { selectPinnedCards, selectUnpinnedCards } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { shownCardOrder } from '@/ui/hooks/useSessionOrder';

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
