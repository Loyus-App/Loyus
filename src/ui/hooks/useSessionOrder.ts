import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import type { Card, CardId } from '@/domain/card';
import type { SortMode } from '@/domain/sort';

type Snapshot = { readonly key: string; readonly ids: readonly string[] };

function structureKey(cards: readonly Card[]): string {
  return cards
    .map((card) => `${card.id}:${card.isPinned ? 1 : 0}:${card.name}`)
    .sort()
    .join('|');
}

function useForegroundCount(): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setCount((value) => value + 1);
    });
    return () => subscription.remove();
  }, []);
  return count;
}

export function useSessionOrder(sorted: readonly Card[], sortMode: SortMode): Card[] {
  const foregrounds = useForegroundCount();
  const key = `${sortMode}#${foregrounds}#${structureKey(sorted)}`;
  const [snapshot, setSnapshot] = useState<Snapshot>(() => ({
    key,
    ids: sorted.map((card) => card.id),
  }));

  if (sortMode === 'manual') return [...sorted];

  let ids = snapshot.ids;
  if (snapshot.key !== key) {
    ids = sorted.map((card) => card.id);
    setSnapshot({ key, ids });
  }

  const byId = new Map(sorted.map((card) => [card.id as string, card]));
  return ids.map((id) => byId.get(id)).filter((card): card is Card => card !== undefined);
}

let shownIds: readonly CardId[] = [];

export function useRememberShownOrder(cards: readonly Card[]): void {
  useEffect(() => {
    shownIds = cards.map((card) => card.id);
  });
}

export function shownCardOrder(): readonly CardId[] {
  return shownIds;
}
