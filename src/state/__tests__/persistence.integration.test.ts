import type { Card } from '../../domain/card';
import { BarcodeFormat } from '../../domain/card';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import { useCardStore } from '../stores/cardStore';

beforeEach(() => {
  useCardStore.setState({ cards: {} });
});

// Snapshot first: persist's subscriber writes the cleared state back to MMKV on setState.
async function simulateColdRestart(): Promise<void> {
  // Cast: MMKV getItem is synchronous, returns string | null at runtime
  const snapshot = mmkvStateStorage.getItem('cards') as string | null;

  useCardStore.setState({ cards: {} } as any, true);

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
    expect(restored?.isFavorite).toBe(false);
    expect(restored?.createdAt).toBe(original.createdAt);
    expect(restored?.updatedAt).toBe(original.updatedAt);
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
    expect(migrated?.isFavorite).toBe(true);
    expect(migrated?.createdAt).toBe(1000000);
  });
});
