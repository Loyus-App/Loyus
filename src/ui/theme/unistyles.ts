import { StyleSheet } from 'react-native-unistyles';
import { applyAccent } from './accents';
import { breakpoints } from './breakpoints';
import { applyNativeColorScheme, initialAccent, initialThemePreference } from './preference';
import { type AppTheme, darkTheme, lightTheme } from './themes';

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
