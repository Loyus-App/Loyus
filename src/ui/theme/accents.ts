import { type AccentName, DEFAULT_ACCENT, isAccentName } from '@/state/stores/settingsStore';
import { skyEdgeGradient, skyGradient } from './color';
import type { AppTheme } from './themes';
import { palette } from './tokens';

export type ThemeMode = 'light' | 'dark';

type AccentPair = { readonly accent: string; readonly onAccent: string };

export const ACCENTS = {
  teal: {
    light: { accent: palette.teal700, onAccent: palette.white },
    dark: { accent: palette.teal300, onAccent: palette.teal950 },
  },
  blue: {
    light: { accent: palette.blue600, onAccent: palette.white },
    dark: { accent: palette.blue300, onAccent: palette.night950 },
  },
  indigo: {
    light: { accent: palette.indigo600, onAccent: palette.white },
    dark: { accent: palette.indigo300, onAccent: palette.night950 },
  },
  orange: {
    light: { accent: palette.orange700, onAccent: palette.white },
    dark: { accent: palette.orange300, onAccent: palette.night950 },
  },
  pink: {
    light: { accent: palette.pink700, onAccent: palette.white },
    dark: { accent: palette.pink300, onAccent: palette.night950 },
  },
  green: {
    light: { accent: palette.green700, onAccent: palette.white },
    dark: { accent: palette.green300, onAccent: palette.night950 },
  },
} as const satisfies Record<AccentName, Record<ThemeMode, AccentPair>>;

export const ACCENT_LABELS = {
  teal: 'settings.accentTeal',
  blue: 'settings.accentBlue',
  indigo: 'settings.accentIndigo',
  orange: 'settings.accentOrange',
  pink: 'settings.accentPink',
  green: 'settings.accentGreen',
} as const satisfies Record<AccentName, string>;

export function resolveAccent(value: unknown): AccentName {
  return isAccentName(value) ? value : DEFAULT_ACCENT;
}

export function accentColor(name: AccentName, mode: ThemeMode): string {
  return ACCENTS[name][mode].accent;
}

export function applyAccent(theme: AppTheme, mode: ThemeMode, name: AccentName): AppTheme {
  const { accent, onAccent } = ACCENTS[name][mode];
  return {
    ...theme,
    colors: { ...theme.colors, accent, onAccent },
    gradients: {
      ...theme.gradients,
      sky: skyGradient(theme.colors.background, ACCENTS[name].dark.accent, mode),
      skyEdge: skyEdgeGradient(theme.colors.background, ACCENTS[name].dark.accent, mode),
    },
    badge: { ...theme.badge, accent },
  };
}
