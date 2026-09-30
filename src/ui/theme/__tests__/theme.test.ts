import { brandById } from '@/domain/brand';
import { CARD_COLORS, cardColorOf, defaultCardColor, textOnCard } from '../cardColors';
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

describe('card colors', () => {
  it.each(CARD_COLORS)('gives AA text on %s', (fill) => {
    expect(contrastRatio(textOnCard(fill), fill)).toBeGreaterThanOrEqual(AA);
  });

  it('switches to dark text on light fills', () => {
    expect(textOnCard('#F5C542')).toBe('#111418');
    expect(textOnCard('#1B2A4A')).toBe('#FFFFFF');
  });

  it('uses the brand color unless the card has its own', () => {
    expect(cardColorOf({ name: 'Carrefour', brandId: 'carrefour' })).toBe(
      brandById('carrefour')?.color,
    );
    expect(cardColorOf({ name: 'Carrefour', brandId: 'carrefour', color: '#2F855A' })).toBe(
      '#2F855A',
    );
    expect(cardColorOf({ name: 'Green Grocer' })).toBe(defaultCardColor('Green Grocer'));
  });

  it('derives a stable default color from the card name', () => {
    expect(defaultCardColor('Carrefour')).toBe(defaultCardColor(' carrefour '));
    expect(CARD_COLORS).toContain(defaultCardColor('Carrefour'));
  });
});
