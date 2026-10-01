const calls: string[] = [];
const mockCover = jest.fn(() => {
  calls.push('cover');
  return Promise.resolve();
});
const mockReveal = jest.fn((durationMs: number) => {
  calls.push(`reveal ${durationMs}`);
  return Promise.resolve();
});

jest.mock('../../../../modules/window-crossfade', () => ({
  isAvailable: true,
  cover: () => mockCover(),
  reveal: (durationMs: number) => mockReveal(durationMs),
}));

let crossfadeWindow: typeof import('../crossfade').crossfadeWindow;

beforeAll(() => {
  globalThis.requestIdleCallback = (callback) => {
    callback({ didTimeout: false, timeRemaining: () => 0 });
    return 0;
  };
  globalThis.requestAnimationFrame = (callback) => {
    callback(0);
    return 0;
  };
});

beforeEach(() => {
  jest.resetModules();
  crossfadeWindow = require('../crossfade').crossfadeWindow;
  calls.length = 0;
  jest.clearAllMocks();
});

describe('crossfadeWindow', () => {
  it('covers the window, applies the change, then fades the cover out', async () => {
    await crossfadeWindow(() => calls.push('apply'), 260);
    expect(calls).toEqual(['cover', 'apply', 'reveal 260']);
  });

  it('only fades out once the latest change is on screen', async () => {
    await Promise.all([
      crossfadeWindow(() => calls.push('dark'), 260),
      crossfadeWindow(() => calls.push('light'), 260),
    ]);
    expect(calls).toEqual(['cover', 'cover', 'dark', 'light', 'reveal 260']);
  });

  it('still applies the change when the window cannot be covered', async () => {
    mockCover.mockRejectedValueOnce(new Error('no window'));
    await crossfadeWindow(() => calls.push('apply'), 260);
    expect(calls).toEqual(['apply', 'reveal 260']);
  });

  it('fades the cover out when the change fails', async () => {
    await expect(
      crossfadeWindow(() => {
        throw new Error('boom');
      }, 260),
    ).rejects.toThrow('boom');
    expect(mockReveal).toHaveBeenCalledWith(260);
  });
});

describe('crossfadeWindow without the native module', () => {
  it('applies the change right away', () => {
    jest.resetModules();
    jest.doMock('../../../../modules/window-crossfade', () => ({ isAvailable: false }));
    const apply = jest.fn();
    require('../crossfade').crossfadeWindow(apply, 260);
    expect(apply).toHaveBeenCalledTimes(1);
  });
});
