import * as QuickActions from 'expo-quick-actions';
import { makeCard } from '@/testing/makeCard';
import { buildCardShortcuts, onCardShortcut, syncCardShortcuts } from '../quickActions';

jest.mock('expo-quick-actions', () => ({
  initial: {
    id: 'cold',
    title: 'Cold',
    params: { cardId: 'cold-start' },
  },
  setItems: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
}));

const setItems = QuickActions.setItems as jest.Mock;
const addListener = QuickActions.addListener as jest.Mock;

const cards = [
  makeCard({ id: 'a', name: 'Carrefour', owner: 'Léa', openCount: 4, lastOpenedAt: 10 }),
  makeCard({ id: 'b', name: 'Fnac', openCount: 2, lastOpenedAt: 10 }),
];

describe('buildCardShortcuts', () => {
  it('uses the card name, and the owner or barcode type as subtitle on iOS', () => {
    expect(buildCardShortcuts(cards, 'ios')).toEqual([
      {
        id: 'a',
        title: 'Carrefour',
        subtitle: 'Léa',
        icon: 'symbol:creditcard',
        params: { cardId: 'a' },
      },
      {
        id: 'b',
        title: 'Fnac',
        subtitle: 'EAN-13',
        icon: 'symbol:creditcard',
        params: { cardId: 'b' },
      },
    ]);
  });

  it('puts the owner in the title on Android, which has no subtitle', () => {
    const [first, second] = buildCardShortcuts(cards, 'android');
    expect(first?.title).toBe('Carrefour · Léa');
    expect(second?.title).toBe('Fnac');
    expect(first?.icon).toBe('ic_launcher');
  });
});

describe('syncCardShortcuts', () => {
  beforeEach(() => setItems.mockClear());

  it('only calls the native module when the shortcuts change', () => {
    syncCardShortcuts(cards);
    syncCardShortcuts([...cards]);
    expect(setItems).toHaveBeenCalledTimes(1);

    syncCardShortcuts([makeCard({ id: 'c', name: 'Decathlon', openCount: 1, lastOpenedAt: 5 })]);
    expect(setItems).toHaveBeenCalledTimes(2);
    expect(setItems).toHaveBeenLastCalledWith([expect.objectContaining({ id: 'c' })]);
  });
});

describe('onCardShortcut', () => {
  it('opens the cold-start card once, then every triggered shortcut', () => {
    const open = jest.fn();
    const stop = onCardShortcut(open);
    expect(open).toHaveBeenCalledWith('cold-start');

    const listener = addListener.mock.calls[0]?.[0] as (action: QuickActions.Action) => void;
    listener({ id: 'b', title: 'Fnac', params: { cardId: 'b' } });
    listener({ id: 'x', title: 'Other', params: null });
    expect(open).toHaveBeenLastCalledWith('b');
    expect(open).toHaveBeenCalledTimes(2);

    stop();
    onCardShortcut(open);
    expect(open).toHaveBeenCalledTimes(2);
  });
});
