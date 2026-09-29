import React from 'react';
import TestRenderer from 'react-test-renderer';

export type RenderedHook<T> = {
  readonly result: { current: T };
  readonly unmount: () => void;
};

export function renderHook<T>(hook: () => T): RenderedHook<T> {
  const result = {} as { current: T };
  function Probe(): null {
    result.current = hook();
    return null;
  }
  let renderer: TestRenderer.ReactTestRenderer | undefined;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe));
  });
  return {
    result,
    unmount: () =>
      TestRenderer.act(() => {
        renderer?.unmount();
      }),
  };
}

export const act = TestRenderer.act;
