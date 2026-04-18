import type { CardId } from '../../domain/card';
import { BarcodeFormat } from '../../domain/card';
import { useCardStore } from '../stores/cardStore';

beforeEach(() => {
  useCardStore.setState({ cards: {} });
});

/** Helper: get the first card id from the store. */
function firstId(): CardId {
  return Object.keys(useCardStore.getState().cards)[0] as CardId;
}

describe('cardStore', () => {
  it('addCard creates a card with generated UUID', () => {
    useCardStore.getState().addCard({ name: 'Test', code: '123', format: BarcodeFormat.CODE128 });

    const cards = useCardStore.getState().cards;
    const ids = Object.keys(cards);
    expect(ids).toHaveLength(1);

    const card = cards[ids[0] as string];
    expect(card).toBeDefined();
    expect(card?.name).toBe('Test');
    expect(card?.code).toBe('123');
    expect(card?.format).toBe(BarcodeFormat.CODE128);
    expect(card?.isFavorite).toBe(false);
    expect(card?.id).toMatch(/^test-uuid-/);
    expect(card?.createdAt).toBeGreaterThan(0);
    expect(card?.updatedAt).toBe(card?.createdAt);
  });

  it('updateCard merges patch and updates updatedAt', () => {
    useCardStore.getState().addCard({ name: 'Old', code: '111', format: BarcodeFormat.EAN13 });

    const id = firstId();
    const before = useCardStore.getState().cards[id]?.updatedAt;
    if (before === undefined) throw new Error('missing card');

    jest.spyOn(Date, 'now').mockReturnValue(before + 1000);

    useCardStore.getState().updateCard(id, { name: 'New' });

    const updated = useCardStore.getState().cards[id]!;
    expect(updated.name).toBe('New');
    expect(updated.code).toBe('111');
    expect(updated.updatedAt).toBe(before + 1000);

    jest.restoreAllMocks();
  });

  it('updateCard ignores unknown card id', () => {
    useCardStore.getState().addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });

    const before = { ...useCardStore.getState().cards };
    useCardStore.getState().updateCard('nonexistent' as CardId, { name: 'X' });

    expect(useCardStore.getState().cards).toEqual(before);
  });

  it('removeCard deletes card from state', () => {
    useCardStore.getState().addCard({ name: 'Gone', code: '999', format: BarcodeFormat.QR_CODE });

    const id = firstId();
    useCardStore.getState().removeCard(id);

    expect(Object.keys(useCardStore.getState().cards)).toHaveLength(0);
  });

  it('toggleFavorite flips isFavorite', () => {
    useCardStore.getState().addCard({ name: 'Fav', code: '555', format: BarcodeFormat.CODE39 });

    const id = firstId();
    expect(useCardStore.getState().cards[id]?.isFavorite).toBe(false);

    useCardStore.getState().toggleFavorite(id);
    expect(useCardStore.getState().cards[id]?.isFavorite).toBe(true);

    useCardStore.getState().toggleFavorite(id);
    expect(useCardStore.getState().cards[id]?.isFavorite).toBe(false);
  });

  it('recordOpen updates updatedAt', () => {
    useCardStore.getState().addCard({ name: 'Open', code: '777', format: BarcodeFormat.EAN8 });

    const id = firstId();
    const before = useCardStore.getState().cards[id]?.updatedAt;
    if (before === undefined) throw new Error('missing card');

    jest.spyOn(Date, 'now').mockReturnValue(before + 5000);
    useCardStore.getState().recordOpen(id);

    expect(useCardStore.getState().cards[id]?.updatedAt).toBe(before + 5000);

    jest.restoreAllMocks();
  });

  it('toggleFavorite ignores unknown card id', () => {
    useCardStore.getState().addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });

    const before = { ...useCardStore.getState().cards };
    useCardStore.getState().toggleFavorite('nonexistent' as CardId);

    expect(useCardStore.getState().cards).toEqual(before);
  });

  it('recordOpen ignores unknown card id', () => {
    useCardStore.getState().addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });

    const before = { ...useCardStore.getState().cards };
    useCardStore.getState().recordOpen('nonexistent' as CardId);

    expect(useCardStore.getState().cards).toEqual(before);
  });

  it('state round-trips through MMKV mock', () => {
    useCardStore.getState().addCard({ name: 'Persist', code: '888', format: BarcodeFormat.UPC_A });

    const cards = useCardStore.getState().cards;
    expect(Object.values(cards)).toHaveLength(1);
    expect(Object.values(cards)[0]?.name).toBe('Persist');
  });
});
