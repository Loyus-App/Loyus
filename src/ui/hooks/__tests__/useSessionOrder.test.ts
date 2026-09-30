import React from 'react';
import TestRenderer from 'react-test-renderer';
import type { Card } from '@/domain/card';
import type { SortMode } from '@/domain/sort';
import { makeCard } from '@/testing/makeCard';
import { shownCardOrder, useRememberShownOrder, useSessionOrder } from '../useSessionOrder';

function renderOrder(initial: { cards: Card[]; mode: SortMode }) {
  const result: { current: Card[] } = { current: [] };
  let props = initial;
  function Probe(): null {
    result.current = useSessionOrder(props.cards, props.mode);
    return null;
  }
  let renderer!: TestRenderer.ReactTestRenderer;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe));
  });
  return {
    result,
    rerender: (next: { cards: Card[]; mode: SortMode }) => {
      props = next;
      TestRenderer.act(() => renderer.update(React.createElement(Probe)));
    },
  };
}

const names = (cards: readonly Card[]): string[] => cards.map((card) => card.name);

describe('useSessionOrder', () => {
  const a = makeCard({ id: 'a', name: 'A', openCount: 5 });
  const b = makeCard({ id: 'b', name: 'B', openCount: 1 });

  it('keeps the order when only usage stats change', () => {
    const { result, rerender } = renderOrder({ cards: [a, b], mode: 'mostUsed' });
    const busierB = { ...b, openCount: 9 };
    rerender({ cards: [busierB, a], mode: 'mostUsed' });
    expect(names(result.current)).toEqual(['A', 'B']);
    expect(result.current[1]?.openCount).toBe(9);
  });

  it('re-sorts when the sort mode changes', () => {
    const { result, rerender } = renderOrder({ cards: [a, b], mode: 'mostUsed' });
    rerender({ cards: [b, a], mode: 'alphabetical' });
    expect(names(result.current)).toEqual(['B', 'A']);
  });

  it('re-sorts when a card is added or renamed', () => {
    const { result, rerender } = renderOrder({ cards: [a, b], mode: 'alphabetical' });
    const c = makeCard({ id: 'c', name: 'C' });
    rerender({ cards: [c, a, b], mode: 'alphabetical' });
    expect(names(result.current)).toEqual(['C', 'A', 'B']);
  });

  it('follows the manual order as soon as it changes', () => {
    const { result, rerender } = renderOrder({ cards: [a, b], mode: 'manual' });
    rerender({ cards: [b, a], mode: 'manual' });
    expect(names(result.current)).toEqual(['B', 'A']);
  });

  it('freezes again once the user leaves the manual order', () => {
    const { result, rerender } = renderOrder({ cards: [b, a], mode: 'manual' });
    rerender({ cards: [a, b], mode: 'mostUsed' });
    rerender({ cards: [b, a], mode: 'mostUsed' });
    expect(names(result.current)).toEqual(['A', 'B']);
  });
});

describe('useRememberShownOrder', () => {
  it('remembers the ids of the last rendered order', () => {
    function Probe({ cards }: { cards: Card[] }): null {
      useRememberShownOrder(cards);
      return null;
    }
    TestRenderer.act(() => {
      TestRenderer.create(
        React.createElement(Probe, { cards: [makeCard({ id: 'z', name: 'Z' })] }),
      );
    });
    expect(shownCardOrder()).toEqual(['z']);
  });
});
