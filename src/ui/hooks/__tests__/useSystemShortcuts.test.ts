import { router } from 'expo-router';
import React from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { BarcodeFormat } from '@/domain/card';
import { onCardShortcut, syncCardShortcuts } from '@/infra/shortcuts/quickActions';
import { useCardStore } from '@/state/stores/cardStore';
import { syncCardsWidget } from '@/widgets/syncCardsWidget';
import { useSystemShortcuts } from '../useSystemShortcuts';

jest.mock('expo-router', () => ({ router: { navigate: jest.fn() } }));
jest.mock('react-i18next', () => {
  const t = (key: string) => key;
  return { useTranslation: () => ({ t }) };
});
jest.mock('@/infra/shortcuts/quickActions', () => ({
  onCardShortcut: jest.fn(() => jest.fn()),
  syncCardShortcuts: jest.fn(),
}));
jest.mock('@/widgets/syncCardsWidget', () => ({ syncCardsWidget: jest.fn() }));

const syncShortcuts = syncCardShortcuts as jest.Mock;
const syncWidget = syncCardsWidget as jest.Mock;
const onShortcut = onCardShortcut as jest.Mock;

let appStateListener: ((status: AppStateStatus) => void) | undefined;
const removeAppState = jest.fn();
const mounted: TestRenderer.ReactTestRenderer[] = [];

function unmountAll(): void {
  TestRenderer.act(() => {
    for (const renderer of mounted.splice(0)) renderer.unmount();
  });
}

function mount(): void {
  function Host(): null {
    useSystemShortcuts();
    return null;
  }
  let renderer: TestRenderer.ReactTestRenderer | undefined;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Host));
  });
  if (renderer) mounted.push(renderer);
}

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  useCardStore.setState({ cards: {} });
  jest.spyOn(AppState, 'addEventListener').mockImplementation((_type, listener) => {
    appStateListener = listener as (status: AppStateStatus) => void;
    return { remove: removeAppState };
  });
});

afterEach(() => {
  unmountAll();
  jest.useRealTimers();
});

describe('useSystemShortcuts', () => {
  it('syncs shortcuts and the widget on mount', () => {
    mount();
    expect(syncShortcuts).toHaveBeenCalledTimes(1);
    expect(syncWidget).toHaveBeenCalledWith(expect.objectContaining({ cards: [] }));
  });

  it('debounces card changes into a single sync', () => {
    mount();
    const { addCard } = useCardStore.getState();
    TestRenderer.act(() => {
      addCard({ name: 'Carrefour', code: '3260123456789', format: BarcodeFormat.EAN13 });
      addCard({ name: 'Fnac', code: '1234567890128', format: BarcodeFormat.EAN13 });
    });
    expect(syncShortcuts).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(syncShortcuts).toHaveBeenCalledTimes(2);
    expect(syncShortcuts.mock.lastCall?.[0]).toHaveLength(2);
  });

  it('syncs again when the app comes back to the foreground', () => {
    mount();
    TestRenderer.act(() => appStateListener?.('background'));
    expect(syncShortcuts).toHaveBeenCalledTimes(1);
    TestRenderer.act(() => appStateListener?.('active'));
    expect(syncShortcuts).toHaveBeenCalledTimes(2);
  });

  it('opens the checkout of a triggered shortcut', () => {
    mount();
    const open = onShortcut.mock.calls[0]?.[0] as (id: string) => void;
    open('card-1');
    jest.runAllTimers();
    expect(router.navigate).toHaveBeenCalledWith({
      pathname: '/card/[id]',
      params: { id: 'card-1' },
    });
  });

  it('stops listening on unmount', () => {
    mount();
    unmountAll();
    expect(removeAppState).toHaveBeenCalled();

    useCardStore
      .getState()
      .addCard({ name: 'Decathlon', code: '1234567890128', format: BarcodeFormat.EAN13 });
    jest.advanceTimersByTime(1000);
    expect(syncShortcuts).toHaveBeenCalledTimes(1);
  });
});
