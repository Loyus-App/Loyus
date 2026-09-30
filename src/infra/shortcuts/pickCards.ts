import type { Card } from '@/domain/card';
import { sortCards } from '@/domain/sort';

export const SHORTCUT_LIMIT = 3;

function firstUnique(groups: readonly (readonly Card[])[], limit: number): Card[] {
  const picked = new Map<string, Card>();
  for (const card of groups.flat()) {
    if (picked.size >= limit) break;
    if (!picked.has(card.id)) picked.set(card.id, card);
  }
  return [...picked.values()];
}

export function pickShortcutCards(cards: readonly Card[], limit = SHORTCUT_LIMIT): Card[] {
  const opened = sortCards(
    cards.filter((card) => card.openCount > 0),
    'mostUsed',
  );
  const pinned = sortCards(
    cards.filter((card) => card.isPinned),
    'mostUsed',
  );
  return firstUnique([opened, pinned], limit);
}

export function pickWidgetCards(cards: readonly Card[], limit = SHORTCUT_LIMIT): Card[] {
  const pinned = sortCards(
    cards.filter((card) => card.isPinned),
    'mostUsed',
  );
  return firstUnique([pinned, sortCards(cards, 'mostUsed')], limit);
}
