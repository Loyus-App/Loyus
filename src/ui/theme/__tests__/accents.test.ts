import { ACCENT_NAMES } from '@/state/stores/settingsStore';
import { ACCENTS, accentColor, applyAccent, resolveAccent } from '../accents';
import { contrastRatio, mix, SUBTLE_SHIFT } from '../color';
import { darkTheme, lightTheme } from '../themes';

const AA = 4.5;

const MODES = [
  ['light', lightTheme],
  ['dark', darkTheme],
] as const;

describe.each(MODES)('%s accents', (mode, base) => {
  it.each(ACCENT_NAMES)('%s stays AA on surface and background', (name) => {
    const theme = applyAccent(base, mode, name);
    expect(contrastRatio(theme.colors.accent, theme.colors.surface)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(theme.colors.accent, theme.colors.background)).toBeGreaterThanOrEqual(AA);
  });

  it.each(ACCENT_NAMES)('%s keeps its label AA across the subtle fill', (name) => {
    const { accent, onAccent } = applyAccent(base, mode, name).colors;
    expect(contrastRatio(onAccent, accent)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(onAccent, mix(accent, '#FFFFFF', SUBTLE_SHIFT))).toBeGreaterThanOrEqual(
      AA,
    );
    expect(contrastRatio(onAccent, mix(accent, '#000000', SUBTLE_SHIFT))).toBeGreaterThanOrEqual(
      AA,
    );
  });

  it('keeps the teal theme identical to the base theme', () => {
    expect(applyAccent(base, mode, 'teal')).toEqual(base);
  });

  it('recolours accent tokens only, never cards, barcode or text', () => {
    const themed = applyAccent(base, mode, 'orange');
    expect(themed.colors.accent).toBe(accentColor('orange', mode));
    expect(themed.badge).toEqual({ ...base.badge, accent: accentColor('orange', mode) });
    expect(themed.barcode).toBe(base.barcode);
    expect(themed.scanner).toBe(base.scanner);
    expect({ ...themed.colors, accent: '', onAccent: '' }).toEqual({
      ...base.colors,
      accent: '',
      onAccent: '',
    });
  });

  it('tints the sky with the accent and fades it into the background', () => {
    const pink = applyAccent(base, mode, 'pink').gradients.sky;
    expect(pink).not.toBe(applyAccent(base, mode, 'green').gradients.sky);
    expect(pink).toContain(`${base.colors.background} 58%`);
  });

  it('is idempotent when applied to an already accented theme', () => {
    const once = applyAccent(base, mode, 'indigo');
    expect(applyAccent(once, mode, 'indigo')).toEqual(once);
    expect(applyAccent(once, mode, 'teal')).toEqual(base);
  });
});

describe('resolveAccent', () => {
  it('falls back to teal for unknown values', () => {
    expect(resolveAccent('blue')).toBe('blue');
    expect(resolveAccent('purple')).toBe('teal');
    expect(resolveAccent(undefined)).toBe('teal');
  });

  it('defines a light and a dark value for every accent', () => {
    expect(Object.keys(ACCENTS).sort()).toEqual([...ACCENT_NAMES].sort());
  });
});
