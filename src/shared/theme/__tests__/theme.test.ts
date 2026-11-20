import { contrastRatio } from '../color';
import { darkTheme, lightTheme } from '../themes';

const AA = 4.5;

describe.each([
  ['light', lightTheme],
  ['dark', darkTheme],
])('%s theme', (_name, theme) => {
  it.each(['background', 'surface'] as const)('keeps text and muted text AA on %s', (surface) => {
    expect(contrastRatio(theme.colors.text, theme.colors[surface])).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(theme.colors.textMuted, theme.colors[surface])).toBeGreaterThanOrEqual(AA);
  });

  it('keeps accent AA on surface', () => {
    expect(contrastRatio(theme.colors.accent, theme.colors.surface)).toBeGreaterThanOrEqual(AA);
  });

  it('keeps the barcode black on white in both themes', () => {
    expect(theme.barcode.paper).toBe('#FFFFFF');
    expect(theme.barcode.ink).toBe('#000000');
  });
});
