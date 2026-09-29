import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import {
  ACCENT_NAMES,
  DEFAULT_ACCENT,
  isAccentName,
  useSettingsStore,
} from '../stores/settingsStore';

beforeEach(() => {
  useSettingsStore.setState({ theme: 'system', accent: DEFAULT_ACCENT });
});

describe('settingsStore', () => {
  it('default theme is system', () => {
    expect(useSettingsStore.getState().theme).toBe('system');
  });

  it('setTheme changes theme value', () => {
    useSettingsStore.getState().setTheme('dark');
    expect(useSettingsStore.getState().theme).toBe('dark');

    useSettingsStore.getState().setTheme('light');
    expect(useSettingsStore.getState().theme).toBe('light');
  });

  it('setTheme accepts system value', () => {
    useSettingsStore.getState().setTheme('dark');
    useSettingsStore.getState().setTheme('system');
    expect(useSettingsStore.getState().theme).toBe('system');
  });

  it('defaults to most-used sorting and maximum brightness', () => {
    expect(useSettingsStore.getState().sortMode).toBe('mostUsed');
    expect(useSettingsStore.getState().maxBrightness).toBe(true);
  });

  it('updates sort mode and brightness preference', () => {
    useSettingsStore.getState().setSortMode('alphabetical');
    useSettingsStore.getState().setMaxBrightness(false);
    expect(useSettingsStore.getState().sortMode).toBe('alphabetical');
    expect(useSettingsStore.getState().maxBrightness).toBe(false);
  });

  it('defaults to the teal accent and updates it', () => {
    expect(useSettingsStore.getState().accent).toBe(DEFAULT_ACCENT);
    expect(DEFAULT_ACCENT).toBe('teal');

    useSettingsStore.getState().setAccent('pink');
    expect(useSettingsStore.getState().accent).toBe('pink');
  });

  it('only accepts known accent names', () => {
    expect(ACCENT_NAMES.every(isAccentName)).toBe(true);
    expect(isAccentName('purple')).toBe(false);
    expect(isAccentName('toString')).toBe(false);
    expect(isAccentName(undefined)).toBe(false);
  });

  it('migrates v4 settings to v5 with the default accent', async () => {
    const v4 = {
      state: {
        theme: 'dark',
        cardViewMode: 'list',
        language: 'fr',
        sortMode: 'recent',
        maxBrightness: false,
      },
      version: 4,
    };
    mmkvStateStorage.setItem('settings', JSON.stringify(v4));

    await useSettingsStore.persist.rehydrate();

    const state = useSettingsStore.getState();
    expect(state.accent).toBe('teal');
    expect(state.theme).toBe('dark');
    expect(state.cardViewMode).toBe('list');
    expect(state.language).toBe('fr');
    expect(state.sortMode).toBe('recent');
    expect(state.maxBrightness).toBe(false);
  });

  it('persists the accent', () => {
    useSettingsStore.getState().setAccent('green');
    const stored = JSON.parse(String(mmkvStateStorage.getItem('settings')));
    expect(stored.state.accent).toBe('green');
    expect(stored.version).toBe(5);
  });
});
