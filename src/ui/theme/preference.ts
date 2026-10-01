import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { e2eTheme, isE2E } from '@/infra/env';
import { crossfadeWindow } from '@/infra/platform/crossfade';
import { type AccentName, useSettingsStore } from '@/state/stores/settingsStore';
import { ignore } from '../utils/ignore';
import { applyAccent, resolveAccent } from './accents';
import { timing } from './motion';

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

function applyThemePreference(preference: ThemePreference): void {
  applyNativeColorScheme(preference);
  if (preference === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
    return;
  }
  UnistylesRuntime.setAdaptiveThemes(false);
  UnistylesRuntime.setTheme(preference);
}

function applyAccentPreference(accent: AccentName): void {
  UnistylesRuntime.updateTheme('light', (theme) => applyAccent(theme, 'light', accent));
  UnistylesRuntime.updateTheme('dark', (theme) => applyAccent(theme, 'dark', accent));
}

export function setThemePreference(preference: ThemePreference): void {
  useSettingsStore.getState().setTheme(preference);
  crossfadeWindow(() => applyThemePreference(preference), timing.base.duration).catch(ignore);
}

export function setAccentPreference(accent: AccentName): void {
  useSettingsStore.getState().setAccent(accent);
  crossfadeWindow(() => applyAccentPreference(accent), timing.base.duration).catch(ignore);
}
