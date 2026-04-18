import React from 'react';
import type { Code } from 'react-native-vision-camera';
import TestRenderer from 'react-test-renderer';
import { useCodeScanHandler } from '../useCodeScanHandler';

function makeCode(value: string, type = 'qr'): Code {
  return { value, type } as Code;
}

// Minimal renderHook using react-test-renderer
function renderHook<T>(hookFn: () => T): { result: { current: T }; rerender: () => void } {
  const result: { current: T } = {} as { current: T };
  function TestComponent(): null {
    result.current = hookFn();
    return null;
  }
  let renderer: TestRenderer.ReactTestRenderer;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(TestComponent));
  });
  return {
    result,
    rerender: () =>
      TestRenderer.act(() => {
        renderer?.update(React.createElement(TestComponent));
      }),
  };
}

describe('useCodeScanHandler', () => {
  let onConfirm: jest.Mock;
  let realDateNow: () => number;

  beforeEach(() => {
    onConfirm = jest.fn();
    realDateNow = Date.now;
  });

  afterEach(() => {
    Date.now = realDateNow;
  });

  it('does NOT trigger onConfirm for a single scan', () => {
    const now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('triggers onConfirm after 2 consecutive identical scans outside debounce window', () => {
    let now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));

    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).not.toHaveBeenCalled();

    // Second scan after debounce window (>500ms)
    now = 1600;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledWith('ABC123', 'qr');
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('does NOT trigger onConfirm for 2 identical scans within debounce window', () => {
    let now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));

    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });

    // Second scan within 500ms
    now = 1300;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('resets consecutive count when a different code is scanned', () => {
    let now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));

    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });

    // Scan different code after debounce
    now = 1600;
    TestRenderer.act(() => {
      result.current([makeCode('XYZ789')]);
    });

    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('resets after confirmation so the same code needs 2x again', () => {
    let now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));

    // 1st scan
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });

    // 2nd scan — confirms
    now = 1600;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);

    // 3rd scan — should NOT immediately confirm (counter reset)
    now = 2200;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);

    // 4th scan — should confirm again
    now = 2800;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it('ignores empty codes array', () => {
    const { result } = renderHook(() => useCodeScanHandler(onConfirm));
    TestRenderer.act(() => {
      result.current([]);
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('ignores codes with falsy value', () => {
    const { result } = renderHook(() => useCodeScanHandler(onConfirm));
    TestRenderer.act(() => {
      result.current([{ type: 'qr' } as Code]);
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
