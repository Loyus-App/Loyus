import { makeCard } from '@/testing/makeCard';
import { isSortMode, SORT_MODES, sortCards } from '../sort';

const names = (cards: readonly { name: string }[]): string[] => cards.map((card) => card.name);

describe('sortCards', () => {
  const rarelyUsed = makeCard({ id: 'a', name: 'Aldi', openCount: 1, lastOpenedAt: 5000 });
  const oftenUsed = makeCard({ id: 'b', name: 'Boulanger', openCount: 9, lastOpenedAt: 2000 });
  const neverUsed = makeCard({ id: 'c', name: 'carrefour', createdAt: 3000 });
  const tiedRecent = makeCard({ id: 'd', name: 'Darty', openCount: 1, lastOpenedAt: 6000 });

  it('puts the most opened cards first, then the most recently used', () => {
    expect(names(sortCards([rarelyUsed, neverUsed, oftenUsed, tiedRecent], 'mostUsed'))).toEqual([
      'Boulanger',
      'Darty',
      'Aldi',
      'carrefour',
    ]);
  });

  it('orders by last use, falling back to creation date for never-opened cards', () => {
    expect(names(sortCards([oftenUsed, neverUsed, rarelyUsed, tiedRecent], 'recent'))).toEqual([
      'Darty',
      'Aldi',
      'carrefour',
      'Boulanger',
    ]);
  });

  it('sorts alphabetically without regard to case', () => {
    expect(
      names(sortCards([tiedRecent, neverUsed, oftenUsed, rarelyUsed], 'alphabetical')),
    ).toEqual(['Aldi', 'Boulanger', 'carrefour', 'Darty']);
  });

  it('breaks ties by name', () => {
    const first = makeCard({ id: 'x', name: 'Zara', openCount: 2, lastOpenedAt: 100 });
    const second = makeCard({ id: 'y', name: 'Auchan', openCount: 2, lastOpenedAt: 100 });
    expect(names(sortCards([first, second], 'mostUsed'))).toEqual(['Auchan', 'Zara']);
    expect(names(sortCards([first, second], 'recent'))).toEqual(['Auchan', 'Zara']);
  });

  it('follows the manual order', () => {
    expect(
      names(
        sortCards([rarelyUsed, oftenUsed, neverUsed, tiedRecent], 'manual', ['c', 'a', 'd', 'b']),
      ),
    ).toEqual(['carrefour', 'Aldi', 'Darty', 'Boulanger']);
  });

  it('puts cards missing from the manual order last, oldest first', () => {
    const older = makeCard({ id: 'o', name: 'Older', createdAt: 100 });
    const newer = makeCard({ id: 'n', name: 'Newer', createdAt: 200 });
    const sameAge = makeCard({ id: 's', name: 'Anchor', createdAt: 200 });
    expect(names(sortCards([newer, sameAge, oftenUsed, older], 'manual', ['b', 'gone']))).toEqual([
      'Boulanger',
      'Older',
      'Anchor',
      'Newer',
    ]);
  });

  it('falls back to creation order when there is no manual order yet', () => {
    const first = makeCard({ id: 'f', name: 'Zeeman', createdAt: 1 });
    const second = makeCard({ id: 's', name: 'Auchan', createdAt: 2 });
    expect(names(sortCards([second, first], 'manual'))).toEqual(['Zeeman', 'Auchan']);
  });

  it('does not mutate its input', () => {
    const input = [neverUsed, oftenUsed];
    sortCards(input, 'alphabetical');
    expect(names(input)).toEqual(['carrefour', 'Boulanger']);
  });
});

describe('isSortMode', () => {
  it.each(SORT_MODES)('accepts %s', (mode) => {
    expect(isSortMode(mode)).toBe(true);
  });

  it.each([undefined, 'custom', 42])('rejects %s', (value) => {
    expect(isSortMode(value)).toBe(false);
  });
});
