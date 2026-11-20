import { brandById } from '@/entities/brand/domain/brand';
import { contrastRatio } from '@/shared/theme/color';
import { CARD_COLORS, cardColorOf, defaultCardColor, textOnCard } from '../cardColors';

const AA = 4.5;

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
