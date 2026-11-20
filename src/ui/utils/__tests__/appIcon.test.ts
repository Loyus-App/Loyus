import type { useSettingsStore as SettingsStore } from '@/state/stores/settingsStore';

jest.mock('../haptics', () => ({ haptics: { warning: jest.fn() } }));

const flush = () => new Promise((resolve) => setImmediate(resolve));

let appIcon: typeof import('../appIcon');
let useSettingsStore: typeof SettingsStore;
let setIcon: jest.Mock;
let getName: jest.Mock;
let warning: jest.Mock;

beforeEach(() => {
  jest.resetModules();
  const native = require('expo-alternate-app-icons');
  setIcon = native.setAlternateAppIcon;
  getName = native.getAppIconName;
  warning = require('../haptics').haptics.warning;
  appIcon = require('../appIcon');
  useSettingsStore = require('@/state/stores/settingsStore').useSettingsStore;
  useSettingsStore.setState({ appIcon: 'night' });
});

describe('reconcileAppIcon', () => {
  it('reads the icon the system reports, once per session', () => {
    getName.mockReturnValue('Rose');
    appIcon.reconcileAppIcon();
    appIcon.reconcileAppIcon();
    expect(useSettingsStore.getState().appIcon).toBe('rose');
    expect(getName).toHaveBeenCalledTimes(1);
  });
});

describe('chooseAppIcon', () => {
  it('shows the new icon right away and applies it', async () => {
    appIcon.chooseAppIcon('ocean');
    expect(useSettingsStore.getState().appIcon).toBe('ocean');
    await flush();
    expect(setIcon).toHaveBeenCalledWith('Ocean');
  });

  it('does nothing when the icon is already active', async () => {
    appIcon.chooseAppIcon('night');
    await flush();
    expect(setIcon).not.toHaveBeenCalled();
  });

  it('applies only the latest of several quick choices', async () => {
    appIcon.chooseAppIcon('ocean');
    appIcon.chooseAppIcon('gold');
    await flush();
    expect(setIcon).toHaveBeenCalledTimes(1);
    expect(setIcon).toHaveBeenCalledWith('Gold');
    expect(useSettingsStore.getState().appIcon).toBe('gold');
  });

  it('shows the icon the system kept when the latest change fails', async () => {
    setIcon.mockRejectedValueOnce(new Error('denied'));
    getName.mockReturnValueOnce(null);
    appIcon.chooseAppIcon('gold');
    await flush();
    expect(useSettingsStore.getState().appIcon).toBe('night');
    expect(warning).toHaveBeenCalled();
  });

  it('waits for a change in flight and ignores its failure once a newer one is asked', async () => {
    let failOcean: (error: Error) => void = () => undefined;
    setIcon.mockReturnValueOnce(
      new Promise((_, reject) => {
        failOcean = reject;
      }),
    );
    appIcon.chooseAppIcon('ocean');
    await flush();
    appIcon.chooseAppIcon('gold');
    expect(setIcon).toHaveBeenCalledTimes(1);

    failOcean(new Error('busy'));
    await flush();

    expect(setIcon).toHaveBeenLastCalledWith('Gold');
    expect(useSettingsStore.getState().appIcon).toBe('gold');
    expect(getName).not.toHaveBeenCalled();
  });
});
