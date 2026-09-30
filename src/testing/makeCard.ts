import { BarcodeFormat, type Card, type CardId } from '@/domain/card';

type CardOverrides = Partial<Omit<Card, 'id'>> & { readonly id: string; readonly name: string };

export function makeCard({ id, ...overrides }: CardOverrides): Card {
  return {
    code: '1234567890128',
    format: BarcodeFormat.EAN13,
    isPinned: false,
    openCount: 0,
    createdAt: 1000,
    updatedAt: 1000,
    ...overrides,
    id: id as CardId,
  };
}
