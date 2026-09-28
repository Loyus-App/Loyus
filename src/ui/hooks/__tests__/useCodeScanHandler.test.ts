import React from 'react';
import TestRenderer from 'react-test-renderer';
import { BarcodeFormat } from '../../../domain/card';
import { type DetectedCode, useCodeScanHandler } from '../useCodeScanHandler';

function makeCode(value: string, format = BarcodeFormat.QR_CODE): DetectedCode {
  return { value, format };
}

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

    now = 1600;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledWith('ABC123', BarcodeFormat.QR_CODE);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('does NOT trigger onConfirm for 2 identical scans within debounce window', () => {
    let now = 1000;
    Date.now = () => now;

    const { result } = renderHook(() => useCodeScanHandler(onConfirm));

    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });

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

    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });

    now = 1600;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);

    now = 2200;
    TestRenderer.act(() => {
      result.current([makeCode('ABC123')]);
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);

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
      result.current([{ value: undefined, format: BarcodeFormat.QR_CODE }]);
    });
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
