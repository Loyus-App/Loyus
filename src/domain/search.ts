import type { Card } from './card';
import { foldText } from './text';

interface ScoredCard {
  readonly card: Card;
  readonly score: number;
}

function scoreCard(card: Card, normalizedQuery: string): number {
  const matches = (text: string | undefined): boolean =>
    text !== undefined && foldText(text).includes(normalizedQuery);
  return (
    (matches(card.name) ? 2 : 0) +
    (card.code.toLowerCase().includes(normalizedQuery) ? 1 : 0) +
    (matches(card.owner) ? 1 : 0)
  );
}

export function searchCards(cards: readonly Card[], query: string): Card[] {
  const trimmed = query.trim();
  if (trimmed === '') {
    return [];
  }

  const normalizedQuery = foldText(trimmed);
  const scored: ScoredCard[] = [];

  for (const card of cards) {
    const score = scoreCard(card, normalizedQuery);
    if (score > 0) {
      scored.push({ card, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name));

  return scored.map((s) => s.card);
}
