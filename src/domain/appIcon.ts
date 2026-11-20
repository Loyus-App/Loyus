export const DEFAULT_APP_ICON = 'night';

export const IOS_CORNER_RATIO = 0.2237;

export const ALTERNATE_APP_ICONS = [
  'ocean',
  'amethyst',
  'rose',
  'sunset',
  'mint',
  'gold',
  'aurora',
  'graphite',
  'daylight',
] as const;

export const APP_ICONS = [DEFAULT_APP_ICON, ...ALTERNATE_APP_ICONS] as const;

export type AppIconName = (typeof APP_ICONS)[number];

export function isAppIconName(value: unknown): value is AppIconName {
  return APP_ICONS.some((name) => name === value);
}

export function nativeIconName(name: AppIconName): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function appIconFromNative(nativeName: string | null): AppIconName {
  return APP_ICONS.find((name) => nativeIconName(name) === nativeName) ?? DEFAULT_APP_ICON;
}
