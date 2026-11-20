import { StyleSheet } from 'react-native-unistyles';
import {
  applyNativeColorScheme,
  initialAccent,
  initialThemePreference,
} from '@/entities/settings/ui/preference';
import { applyAccent } from '@/shared/theme/accents';
import { breakpoints } from '@/shared/theme/breakpoints';
import { type AppTheme, darkTheme, lightTheme } from '@/shared/theme/themes';

const accent = initialAccent();

const themes: { light: AppTheme; dark: AppTheme } = {
  light: applyAccent(lightTheme, 'light', accent),
  dark: applyAccent(darkTheme, 'dark', accent),
};

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

const preference = initialThemePreference();

StyleSheet.configure({
  themes,
  breakpoints,
  settings: preference === 'system' ? { adaptiveThemes: true } : { initialTheme: preference },
});

applyNativeColorScheme(preference);
