import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { e2eTheme, isE2E } from '@/infra/env';
import { type AccentName, useSettingsStore } from '@/state/stores/settingsStore';
import { applyAccent, resolveAccent } from './accents';

export type ThemePreference = 'system' | 'light' | 'dark';

export const THEME_PREFERENCES: readonly ThemePreference[] = ['system', 'light', 'dark'];

export function initialThemePreference(): ThemePreference {
  if (isE2E && (e2eTheme === 'light' || e2eTheme === 'dark')) return e2eTheme;
  return useSettingsStore.getState().theme;
}

export function initialAccent(): AccentName {
  return resolveAccent(useSettingsStore.getState().accent);
}

export function applyNativeColorScheme(preference: ThemePreference): void {
  Appearance.setColorScheme(preference === 'system' ? 'auto' : preference);
}

export function setThemePreference(preference: ThemePreference): void {
  useSettingsStore.getState().setTheme(preference);
  applyNativeColorScheme(preference);
  if (preference === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
    return;
  }
  UnistylesRuntime.setAdaptiveThemes(false);
  UnistylesRuntime.setTheme(preference);
}

export function setAccentPreference(accent: AccentName): void {
  useSettingsStore.getState().setAccent(accent);
  UnistylesRuntime.updateTheme('light', (theme) => applyAccent(theme, 'light', accent));
  UnistylesRuntime.updateTheme('dark', (theme) => applyAccent(theme, 'dark', accent));
}
