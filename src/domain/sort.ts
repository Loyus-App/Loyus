// Domain sort — zero react-native / expo imports

import type { Card } from './card';

/**
 * Returns a new array of cards sorted by:
 * 1. Favorites first
 * 2. Within each group, updatedAt descending (most recent first)
 * 3. Ties broken by name ascending (alphabetical)
 */
export function sortCards(cards: readonly Card[]): Card[] {
  return [...cards].sort((a, b) => {
    // Favorites first (true > false → descending)
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1;
    }
    // Most recently updated first
    if (a.updatedAt !== b.updatedAt) {
      return b.updatedAt - a.updatedAt;
    }
    // Alphabetical name tiebreak
    return a.name.localeCompare(b.name);
  });
}
