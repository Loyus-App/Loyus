import { useSettingsStore } from '../stores/settingsStore';

beforeEach(() => {
  useSettingsStore.setState({ theme: 'system' });
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
});
