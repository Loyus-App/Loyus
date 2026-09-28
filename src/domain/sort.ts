import type { Card } from './card';

export function sortCards(cards: readonly Card[]): Card[] {
  return [...cards].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1;
    }
    if (a.updatedAt !== b.updatedAt) {
      return b.updatedAt - a.updatedAt;
    }
    return a.name.localeCompare(b.name);
  });
}
