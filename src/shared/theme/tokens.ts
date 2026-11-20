import { Platform } from 'react-native';

export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F2F3F5',
  gray100: '#EAECEF',
  gray200: '#E1E4E9',
  slate400: '#8A93A0',
  slate600: '#5F6875',
  ink900: '#111418',
  night950: '#0B0F14',
  night900: '#161B22',
  night800: '#1F252E',
  night700: '#252C36',
  night600: '#2E3643',
  fog300: '#9AA4B2',
  fog100: '#F1F4F7',
  teal700: '#0A6C75',
  teal300: '#5CD6E0',
  teal950: '#03181B',
  red600: '#D93A3A',
  red500: '#E5484D',
  red400: '#FF6B6B',
  green600: '#1E9E48',
  green400: '#34D86A',
  amber600: '#C27A00',
  amber400: '#FFB224',
  indigo500: '#5B5BD6',
  indigo400: '#8B8CFF',
  orange500: '#D46B08',
  orange400: '#FF9F2E',
  blue500: '#2F6FE0',
  blue400: '#6A9BFF',
  blue600: '#1F5AD6',
  blue300: '#79A9FF',
  indigo600: '#4F46E5',
  indigo300: '#9D9FFF',
  orange700: '#B23C0B',
  orange300: '#FB923C',
  pink700: '#B8185E',
  pink300: '#F77DBD',
  green700: '#12723A',
  green300: '#4ADE80',
} as const;

export const radius = {
  thumb: 6,
  sm: 9,
  card: 12,
  md: 14,
  lg: 24,
  pill: 999,
} as const;

const monospace = Platform.select({ ios: 'Menlo', default: 'monospace' });

export const typography = {
  display: { fontSize: 34, lineHeight: 41, fontWeight: '700', letterSpacing: 0.2 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  headline: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  callout: { fontSize: 15, lineHeight: 20, fontWeight: '500' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: 0.4 },
  code: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    fontFamily: monospace,
    letterSpacing: 1,
  },
} as const;

export const space = (steps: number): number => steps * 4;

export const size = {
  touch: Platform.select({ ios: 44, default: 48 }),
} as const;
