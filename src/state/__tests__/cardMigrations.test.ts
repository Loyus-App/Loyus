import { runMigrations } from '../../domain/migration';
import { CARD_STORE_VERSION, cardMigrations } from '../migrations/cardMigrations';

type Persisted = { cards: Record<string, Record<string, unknown>> };

describe('card store v4 migration', () => {
  const v3: Persisted = {
    cards: {
      a: { id: 'a', name: 'Carrefour' },
      b: { id: 'b', name: 'Green Grocer' },
      c: { id: 'c', name: 'Decathlon', brandId: 'custom' },
    },
  };

  it('links cards whose name is a known brand', () => {
    const { cards } = runMigrations(v3, 3, CARD_STORE_VERSION, cardMigrations) as Persisted;

    expect(cards.a?.brandId).toBe('carrefour');
    expect(cards.b).not.toHaveProperty('brandId');
    expect(cards.c?.brandId).toBe('custom');
  });
});
