import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { cardShadow, colors, radius, spacing, subtleShadow, typography } from './tokens';

type LightTheme = {
  colors: typeof colors.light;
  spacing: typeof spacing;
  typography: typeof typography;
  radius: typeof radius;
  cardShadow: typeof cardShadow;
  subtleShadow: typeof subtleShadow;
};

type DarkTheme = {
  colors: typeof colors.dark;
  spacing: typeof spacing;
  typography: typeof typography;
  radius: typeof radius;
  cardShadow: typeof cardShadow;
  subtleShadow: typeof subtleShadow;
};

declare module 'react-native-unistyles' {
  interface UnistylesThemes {
    light: LightTheme;
    dark: DarkTheme;
  }

  interface UnistylesBreakpoints {
    sm: 0;
    md: 390;
  }
}

StyleSheet.configure({
  themes: {
    light: {
      colors: colors.light,
      spacing,
      typography,
      radius,
      cardShadow,
      subtleShadow,
    },
    dark: {
      colors: colors.dark,
      spacing,
      typography,
      radius,
      cardShadow,
      subtleShadow,
    },
  },
  breakpoints: {
    sm: 0,
    md: 390,
  },
  settings: {
    adaptiveThemes: true,
  },
});

export { StyleSheet, useUnistyles };
