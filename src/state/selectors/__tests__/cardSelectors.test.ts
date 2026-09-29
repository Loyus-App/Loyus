import type { CardId } from '@/domain/card';
import { makeCard } from '@/testing/makeCard';
import {
  selectCardById,
  selectCardCount,
  selectPinnedCards,
  selectRecentlyOpened,
  selectSearchResults,
  selectUnpinnedCards,
} from '../cardSelectors';

const pinnedOften = makeCard({
  id: 'p1',
  name: 'Alpha',
  isPinned: true,
  openCount: 5,
  lastOpenedAt: 10,
});
const pinnedRare = makeCard({
  id: 'p2',
  name: 'Beta',
  isPinned: true,
  openCount: 1,
  lastOpenedAt: 30,
});
const opened = makeCard({ id: 'c1', name: 'Gamma', openCount: 3, lastOpenedAt: 20 });
const neverOpened = makeCard({ id: 'c2', name: 'Delta' });

const state = {
  cards: Object.fromEntries([pinnedOften, pinnedRare, opened, neverOpened].map((c) => [c.id, c])),
  manualOrder: ['c2', 'p2', 'c1', 'p1'],
};

const ids = (cards: readonly { id: string }[]): string[] => cards.map((card) => card.id);

describe('card selectors', () => {
  it('counts cards', () => {
    expect(selectCardCount(state)).toBe(4);
  });

  it('finds a card by id, or null', () => {
    expect(selectCardById('c1' as CardId)(state)?.name).toBe('Gamma');
    expect(selectCardById('missing' as CardId)(state)).toBeNull();
  });

  it('splits pinned and unpinned cards, each sorted by the chosen mode', () => {
    expect(ids(selectPinnedCards('mostUsed')(state))).toEqual(['p1', 'p2']);
    expect(ids(selectPinnedCards('recent')(state))).toEqual(['p2', 'p1']);
    expect(ids(selectUnpinnedCards('alphabetical')(state))).toEqual(['c2', 'c1']);
  });

  it('follows the manual order within each group', () => {
    expect(ids(selectPinnedCards('manual')(state))).toEqual(['p2', 'p1']);
    expect(ids(selectUnpinnedCards('manual')(state))).toEqual(['c2', 'c1']);
  });

  it('keeps cards missing from the manual order, after the ordered ones', () => {
    const partial = { ...state, manualOrder: ['c1'] };
    expect(ids(selectUnpinnedCards('manual')(partial))).toEqual(['c1', 'c2']);
    expect(ids(selectPinnedCards('manual')({ cards: state.cards }))).toEqual(['p1', 'p2']);
  });

  it('lists only opened cards, most recent first, up to the limit', () => {
    expect(ids(selectRecentlyOpened()(state))).toEqual(['p2', 'c1', 'p1']);
    expect(ids(selectRecentlyOpened(1)(state))).toEqual(['p2']);
  });

  it('searches by name and returns nothing for a blank query', () => {
    expect(ids(selectSearchResults('gam')(state))).toEqual(['c1']);
    expect(selectSearchResults('  ')(state)).toEqual([]);
  });
});
