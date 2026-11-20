import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { ignore } from '@/shared/lib/ignore';
import { crossfadeWindow } from '@/shared/platform/crossfade';
import { e2eTheme, isE2E } from '@/shared/platform/env';
import { type AccentName, applyAccent, resolveAccent } from '@/shared/theme/accents';
import { timing } from '@/shared/theme/motion';
import { useSettingsStore } from '../state/settingsStore';

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
