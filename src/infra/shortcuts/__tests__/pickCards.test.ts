import { makeCard } from '@/testing/makeCard';
import { pickShortcutCards, pickWidgetCards } from '../pickCards';

const ids = (cards: readonly { id: string }[]): string[] => cards.map((card) => card.id);

describe('pickShortcutCards', () => {
  it('orders opened cards by open count, then by last use', () => {
    const cards = [
      makeCard({ id: 'a', name: 'Alpha', openCount: 2, lastOpenedAt: 100 }),
      makeCard({ id: 'b', name: 'Beta', openCount: 5, lastOpenedAt: 50 }),
      makeCard({ id: 'c', name: 'Gamma', openCount: 2, lastOpenedAt: 300 }),
      makeCard({ id: 'd', name: 'Delta', openCount: 1, lastOpenedAt: 400 }),
    ];
    expect(ids(pickShortcutCards(cards))).toEqual(['b', 'c', 'a']);
  });

  it('skips cards never opened', () => {
    const cards = [
      makeCard({ id: 'a', name: 'Alpha', openCount: 0, createdAt: 9000 }),
      makeCard({ id: 'b', name: 'Beta', openCount: 1, lastOpenedAt: 10 }),
    ];
    expect(ids(pickShortcutCards(cards))).toEqual(['b']);
  });

  it('falls back to pinned cards, without duplicates', () => {
    const cards = [
      makeCard({ id: 'a', name: 'Alpha', isPinned: true, openCount: 3, lastOpenedAt: 10 }),
      makeCard({ id: 'b', name: 'Beta', isPinned: true }),
      makeCard({ id: 'c', name: 'Gamma' }),
    ];
    expect(ids(pickShortcutCards(cards))).toEqual(['a', 'b']);
  });

  it('returns nothing when no card was opened or pinned', () => {
    expect(pickShortcutCards([makeCard({ id: 'a', name: 'Alpha' })])).toEqual([]);
    expect(pickShortcutCards([])).toEqual([]);
  });
});

describe('pickWidgetCards', () => {
  it('shows pinned cards first, most used first', () => {
    const cards = [
      makeCard({ id: 'a', name: 'Alpha', openCount: 9, lastOpenedAt: 10 }),
      makeCard({ id: 'b', name: 'Beta', isPinned: true, openCount: 1, lastOpenedAt: 10 }),
      makeCard({ id: 'c', name: 'Gamma', isPinned: true, openCount: 4, lastOpenedAt: 10 }),
    ];
    expect(ids(pickWidgetCards(cards))).toEqual(['c', 'b', 'a']);
  });

  it('keeps at most three cards', () => {
    const cards = ['a', 'b', 'c', 'd'].map((id) => makeCard({ id, name: id, isPinned: true }));
    expect(pickWidgetCards(cards)).toHaveLength(3);
  });

  it('falls back to the most used cards when nothing is pinned', () => {
    const cards = [
      makeCard({ id: 'a', name: 'Alpha', openCount: 1, lastOpenedAt: 10 }),
      makeCard({ id: 'b', name: 'Beta', openCount: 7, lastOpenedAt: 10 }),
    ];
    expect(ids(pickWidgetCards(cards))).toEqual(['b', 'a']);
  });
});
