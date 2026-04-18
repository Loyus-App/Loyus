import type { Card } from '../../domain/card';
import { BarcodeFormat } from '../../domain/card';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';
import { useCardStore } from '../stores/cardStore';

beforeEach(() => {
  useCardStore.setState({ cards: {} });
});

/**
 * Simulate a cold restart: snapshot MMKV, clear in-memory state, restore
 * snapshot (MMKV data survives on disk in production), then rehydrate.
 *
 * We must snapshot before clearing because Zustand persist's subscriber
 * writes the empty state back to storage when setState is called.
 */
async function simulateColdRestart(): Promise<void> {
  // Snapshot persisted data (simulates MMKV data surviving on disk)
  // Cast: MMKV getItem is synchronous, returns string | null at runtime
  const snapshot = mmkvStateStorage.getItem('cards') as string | null;

  // Clear in-memory Zustand state (simulates process death)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- test helper: partial state reset
  useCardStore.setState({ cards: {} } as any, true);

  // Restore snapshot to MMKV (undo the persist subscriber's empty write)
  if (snapshot !== null) {
    mmkvStateStorage.setItem('cards', snapshot);
  }

  // Rehydrate from storage (simulates app cold start)
  await useCardStore.persist.rehydrate();
}

describe('persistence integration', () => {
  it('card persists across store reset and rehydration', async () => {
    // Add a card
    useCardStore
      .getState()
      .addCard({ name: 'Carrefour', code: '3260123456789', format: BarcodeFormat.EAN13 });

    const cardsBefore = useCardStore.getState().cards;
    const ids = Object.keys(cardsBefore);
    expect(ids).toHaveLength(1);

    const cardId = ids[0]!;
    const original = cardsBefore[cardId]!;

    // Simulate cold restart
    await simulateColdRestart();

    // Verify the card survived with all fields intact
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
    // Manually write version-0 shaped data into MMKV mock
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

    // Write directly to MMKV mock (same key the store uses)
    mmkvStateStorage.setItem('cards', JSON.stringify(v0Data));

    // Rehydrate from the v0 data
    await useCardStore.persist.rehydrate();

    // v0 -> v1 migration is a no-op, so data should be intact
    const cards = useCardStore.getState().cards;
    const migrated = cards['test-migration-id'] as Card | undefined;
    expect(migrated).toBeDefined();
    expect(migrated?.name).toBe('Migrated');
    expect(migrated?.isFavorite).toBe(true);
    expect(migrated?.createdAt).toBe(1000000);
  });
});
