export const colors = {
  light: {
    // Surfaces — 4-layer tonal hierarchy (no 1px borders, use tone separation)
    bg: '#fbf9f4', // base surface (ivory)
    surface: '#fbf9f4', // same as bg for ScreenShell
    containerLow: '#f5f3ee', // cards, list rows — one step down
    containerLowest: '#ffffff', // inputs, modals — pure white
    containerHigh: '#eae8e3', // pressed state, dividers
    containerHighest: '#e4e2dd', // strong separator

    // Brand
    primary: '#00535b',
    primaryContainer: '#006d77',
    primaryLight: '#1a7a85',
    textOnPrimary: '#ffffff',

    // Text
    text: '#1b1c19',
    textSecondary: '#3e494a',
    textTertiary: '#6b7b7c',
    textPlaceholder: '#9baeb0',

    // Outline (ghost only — use sparingly, 15% opacity)
    outlineVariant: '#bec8ca',
    border: '#bec8ca', // alias for components using theme.colors.border

    // Semantic
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    success: '#1b6c3b',
    surfaceVariant: '#dce4e5',
  },
  dark: {
    bg: '#0d1415',
    surface: '#0d1415',
    containerLow: '#151e1f',
    containerLowest: '#1c2526',
    containerHigh: '#252f30',
    containerHighest: '#2e393a',

    primary: '#4dd8e6',
    primaryContainer: '#006d77',
    primaryLight: '#73e5f2',
    textOnPrimary: '#001f24',

    text: '#dce4e5',
    textSecondary: '#a0b0b1',
    textTertiary: '#6d8082',
    textPlaceholder: '#4e6264',

    outlineVariant: '#3a5052',
    border: '#3a5052',

    error: '#ffb4ab',
    errorContainer: '#93000a',
    success: '#68d48e',
    surfaceVariant: '#253738',
  },
} as const;

export const cardColors = {
  teal: '#00535b',
  navy: '#1B2A4A',
  burgundy: '#6B2D3E',
  forest: '#2D4739',
  blue: '#2E5CB8',
  red: '#C23B22',
  gold: '#B8860B',
  orange: '#D4763B',
  purple: '#6B3FA0',
  slate: '#4a5568',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const cardShadow = {
  shadowColor: '#00535b',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 4,
} as const;

export const subtleShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.04,
  shadowRadius: 4,
  elevation: 1,
} as const;

export const typography = {
  fontFamily: {
    regular: 'Manrope-Regular',
    medium: 'Manrope-Medium',
    semiBold: 'Manrope-SemiBold',
    bold: 'Manrope-Bold',
    extraBold: 'Manrope-ExtraBold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 13,
    base: 14,
    lg: 15,
    xl: 16,
    xxl: 20,
    display: 24,
    hero: 32,
  },
  letterSpacing: {
    tight: -0.3,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 1.5,
  },
} as const;
