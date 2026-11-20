import {
  ALTERNATE_APP_ICONS,
  APP_ICONS,
  appIconFromNative,
  DEFAULT_APP_ICON,
  isAppIconName,
  nativeIconName,
} from '../appIcon';

describe('app icons', () => {
  it('lists the default icon first and never as an alternate', () => {
    expect(APP_ICONS[0]).toBe(DEFAULT_APP_ICON);
    expect(ALTERNATE_APP_ICONS).not.toContain(DEFAULT_APP_ICON);
    expect(new Set(APP_ICONS).size).toBe(APP_ICONS.length);
  });

  it('recognises only known icon names', () => {
    expect(isAppIconName('ocean')).toBe(true);
    expect(isAppIconName('Ocean')).toBe(false);
    expect(isAppIconName(undefined)).toBe(false);
  });

  it('names native icons in PascalCase', () => {
    expect(nativeIconName('daylight')).toBe('Daylight');
    expect(nativeIconName('night')).toBe('Night');
  });

  it('maps the native icon back to its name', () => {
    expect(appIconFromNative('Amethyst')).toBe('amethyst');
  });

  it('falls back to the default icon for the primary or an unknown icon', () => {
    expect(appIconFromNative(null)).toBe(DEFAULT_APP_ICON);
    expect(appIconFromNative('Retired')).toBe(DEFAULT_APP_ICON);
  });
});
