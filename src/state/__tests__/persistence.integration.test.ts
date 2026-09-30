import type { Card } from '../../domain/card';
import { BarcodeFormat } from '../../domain/card';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import { useCardStore } from '../stores/cardStore';

beforeEach(() => {
  useCardStore.setState({ cards: {}, manualOrder: [] });
});

async function simulateColdRestart(): Promise<void> {
  const snapshot = mmkvStateStorage.getItem('cards') as string | null;

  useCardStore.setState({ cards: {}, manualOrder: [] });

  if (snapshot !== null) {
    mmkvStateStorage.setItem('cards', snapshot);
  }

  await useCardStore.persist.rehydrate();
}

describe('persistence integration', () => {
  it('card persists across store reset and rehydration', async () => {
    useCardStore
      .getState()
      .addCard({ name: 'Carrefour', code: '3260123456789', format: BarcodeFormat.EAN13 });

    const cardsBefore = useCardStore.getState().cards;
    const ids = Object.keys(cardsBefore);
    expect(ids).toHaveLength(1);

    const cardId = ids[0]!;
    const original = cardsBefore[cardId]!;

    await simulateColdRestart();

    const cardsAfter = useCardStore.getState().cards;
    const restored = cardsAfter[cardId] as Card | undefined;
    expect(restored).toBeDefined();
    expect(restored?.name).toBe('Carrefour');
    expect(restored?.code).toBe('3260123456789');
    expect(restored?.format).toBe(BarcodeFormat.EAN13);
    expect(restored?.isPinned).toBe(false);
    expect(restored?.createdAt).toBe(original.createdAt);
    expect(restored?.updatedAt).toBe(original.updatedAt);
  });

  it('manual order persists across store reset and rehydration', async () => {
    const first = useCardStore
      .getState()
      .addCard({ name: 'First', code: '1', format: BarcodeFormat.CODE128 });
    const second = useCardStore
      .getState()
      .addCard({ name: 'Second', code: '2', format: BarcodeFormat.CODE128 });
    useCardStore.getState().setManualOrder([second, first]);

    await simulateColdRestart();

    expect(useCardStore.getState().manualOrder).toEqual([second, first]);
  });

  it('migration from version 2 seeds the manual order by creation date', async () => {
    const v2Card = (id: string, createdAt: number) => ({
      id,
      name: id,
      code: id,
      format: BarcodeFormat.CODE128,
      isPinned: false,
      openCount: 0,
      createdAt,
      updatedAt: createdAt,
    });
    const v2Data = {
      state: {
        cards: {
          newest: v2Card('newest', 3000),
          oldest: v2Card('oldest', 1000),
          middle: v2Card('middle', 2000),
        },
      },
      version: 2,
    };

    mmkvStateStorage.setItem('cards', JSON.stringify(v2Data));

    await useCardStore.persist.rehydrate();

    const state = useCardStore.getState();
    expect(state.manualOrder).toEqual(['oldest', 'middle', 'newest']);
    expect(Object.keys(state.cards).sort()).toEqual(['middle', 'newest', 'oldest']);
    expect(state.cards.oldest?.createdAt).toBe(1000);
  });

  it('migration from version 0 data loads correctly', async () => {
    const v0Data = {
      state: {
        cards: {
          'test-migration-id': {
            id: 'test-migration-id',
            name: 'Migrated',
            code: '9999999999999',
            format: BarcodeFormat.EAN13,
            isFavorite: true,
            createdAt: 1000000,
            updatedAt: 2000000,
          },
        },
      },
      version: 0,
    };

    mmkvStateStorage.setItem('cards', JSON.stringify(v0Data));

    await useCardStore.persist.rehydrate();

    const cards = useCardStore.getState().cards;
    const migrated = cards['test-migration-id'] as Card | undefined;
    expect(migrated).toBeDefined();
    expect(migrated?.name).toBe('Migrated');
    expect(migrated?.isPinned).toBe(true);
    expect(migrated).not.toHaveProperty('isFavorite');
    expect(migrated?.openCount).toBe(0);
    expect(migrated?.lastOpenedAt).toBe(2000000);
    expect(migrated?.createdAt).toBe(1000000);
    expect(useCardStore.getState().manualOrder).toEqual(['test-migration-id']);
  });
});
