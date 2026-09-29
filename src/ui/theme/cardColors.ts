import { brandById } from '@/domain/brand';
import { contrastRatio } from './color';

export const CARD_COLORS = [
  '#00535B',
  '#1B2A4A',
  '#2E5CB8',
  '#6B3FA0',
  '#B83280',
  '#6B2D3E',
  '#C23B22',
  '#D4763B',
  '#B8860B',
  '#2F855A',
  '#2D4739',
  '#4A5568',
] as const;

const LIGHT_TEXT = '#FFFFFF';
const DARK_TEXT = '#111418';

export function defaultCardColor(name: string): string {
  let hash = 0;
  for (const char of name.trim().toLowerCase()) {
    hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0;
  }
  return CARD_COLORS[hash % CARD_COLORS.length] ?? CARD_COLORS[0];
}

export function cardColorOf(card: {
  readonly name: string;
  readonly color?: string | undefined;
  readonly brandId?: string | undefined;
}): string {
  return card.color ?? brandById(card.brandId)?.color ?? defaultCardColor(card.name);
}

export function textOnCard(fill: string): string {
  return contrastRatio(fill, LIGHT_TEXT) >= 4.5 ? LIGHT_TEXT : DARK_TEXT;
}
