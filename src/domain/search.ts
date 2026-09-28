import type { Card } from './card';

export function normalizeForSearch(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

interface ScoredCard {
  readonly card: Card;
  readonly score: number;
}

export function searchCards(cards: readonly Card[], query: string): Card[] {
  const trimmed = query.trim();
  if (trimmed === '') {
    return [];
  }

  const normalizedQuery = normalizeForSearch(trimmed);

  const scored: ScoredCard[] = [];

  for (const card of cards) {
    let score = 0;

    if (normalizeForSearch(card.name).includes(normalizedQuery)) {
      score += 2;
    }

    if (card.code.toLowerCase().includes(normalizedQuery)) {
      score += 1;
    }

    if (score > 0) {
      scored.push({ card, score });
    }
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return a.card.name.localeCompare(b.card.name);
  });

  return scored.map((s) => s.card);
}
