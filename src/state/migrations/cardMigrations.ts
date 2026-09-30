import { matchBrand } from '../../domain/brand';
import type { MigrationRegistry } from '../../domain/migration';

export const CARD_STORE_VERSION = 4;

type LegacyCard = Record<string, unknown> & {
  readonly isFavorite?: boolean;
  readonly updatedAt?: number;
};

function migrateCardV2({ isFavorite, ...card }: LegacyCard): Record<string, unknown> {
  return {
    ...card,
    isPinned: isFavorite === true,
    openCount: 0,
    ...(typeof card.updatedAt === 'number' ? { lastOpenedAt: card.updatedAt } : {}),
  };
}

function linkBrand(card: LegacyCard): LegacyCard {
  if (typeof card.brandId === 'string' || typeof card.name !== 'string') return card;
  const brand = matchBrand(card.name);
  return brand ? { ...card, brandId: brand.id } : card;
}

function initialManualOrder(cards: Record<string, LegacyCard>): string[] {
  const createdAt = (id: string): number => {
    const value = cards[id]?.createdAt;
    return typeof value === 'number' ? value : 0;
  };
  return Object.keys(cards).sort((a, b) => createdAt(a) - createdAt(b));
}

export const cardMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
  2: (state: unknown) => {
    const { cards = {}, ...rest } = (state ?? {}) as { cards?: Record<string, LegacyCard> };
    return {
      ...rest,
      cards: Object.fromEntries(
        Object.entries(cards).map(([id, card]) => [id, migrateCardV2(card)]),
      ),
    };
  },
  3: (state: unknown) => {
    const { cards = {}, ...rest } = (state ?? {}) as { cards?: Record<string, LegacyCard> };
    return { ...rest, cards, manualOrder: initialManualOrder(cards) };
  },
  4: (state: unknown) => {
    const { cards = {}, ...rest } = (state ?? {}) as { cards?: Record<string, LegacyCard> };
    return {
      ...rest,
      cards: Object.fromEntries(Object.entries(cards).map(([id, card]) => [id, linkBrand(card)])),
    };
  },
};
