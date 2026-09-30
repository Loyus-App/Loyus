import type { Card } from './card';

export type SortMode = 'mostUsed' | 'recent' | 'alphabetical' | 'manual';

export const SORT_MODES: readonly SortMode[] = ['mostUsed', 'recent', 'alphabetical', 'manual'];

type Comparator = (a: Card, b: Card) => number;

const byName: Comparator = (a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

const lastUse = (card: Card): number => card.lastOpenedAt ?? card.createdAt;

const COMPARATORS: Record<Exclude<SortMode, 'manual'>, Comparator> = {
  mostUsed: (a, b) => b.openCount - a.openCount || lastUse(b) - lastUse(a) || byName(a, b),
  recent: (a, b) => lastUse(b) - lastUse(a) || byName(a, b),
  alphabetical: byName,
};

function byManualOrder(manualOrder: readonly string[]): Comparator {
  const rank = new Map(manualOrder.map((id, index) => [id, index]));
  const rankOf = (card: Card): number => rank.get(card.id) ?? manualOrder.length;
  return (a, b) => rankOf(a) - rankOf(b) || a.createdAt - b.createdAt || byName(a, b);
}

export function sortCards(
  cards: readonly Card[],
  mode: SortMode,
  manualOrder: readonly string[] = [],
): Card[] {
  const compare = mode === 'manual' ? byManualOrder(manualOrder) : COMPARATORS[mode];
  return [...cards].sort(compare);
}

export function isSortMode(value: unknown): value is SortMode {
  return SORT_MODES.some((mode) => mode === value);
}
