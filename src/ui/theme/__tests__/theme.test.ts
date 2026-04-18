import { cardColors, cardShadow, colors, radius, spacing, typography } from '../tokens';

describe('Theme tokens', () => {
  it('defines light theme colors with Refined Utility palette', () => {
    expect(colors.light.bg).toBe('#fbf9f4');
    expect(colors.light.text).toBeDefined();
    expect(colors.light.primary).toBe('#00535b');
  });

  it('defines dark theme colors with teal-dark palette', () => {
    expect(colors.dark.bg).toBe('#0d1415');
    expect(colors.dark.text).toBeDefined();
    expect(colors.dark.primary).toBe('#4dd8e6');
  });

  it('defines spacing scale', () => {
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(16);
    expect(spacing.lg).toBe(24);
    expect(spacing.xl).toBe(32);
  });

  it('defines typography with Manrope font family', () => {
    expect(typography.fontFamily.regular).toBe('Manrope-Regular');
    expect(typography.fontFamily.bold).toBe('Manrope-Bold');
    expect(typography.fontSize.md).toBe(13);
  });

  it('defines radius tokens', () => {
    expect(radius.sm).toBe(8);
    expect(radius.md).toBe(12);
    expect(radius.lg).toBe(16);
    expect(radius.xl).toBe(24);
  });

  it('defines card shadow', () => {
    expect(cardShadow.shadowOpacity).toBe(0.08);
    expect(cardShadow.elevation).toBe(4);
  });

  it('defines card brand colors', () => {
    expect(cardColors.teal).toBe('#00535b');
    expect(cardColors.forest).toBe('#2D4739');
  });
});
