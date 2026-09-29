import { makeCard } from '@/testing/makeCard';
import type { CardId } from '../../domain/card';
import { BarcodeFormat } from '../../domain/card';
import { useCardStore } from '../stores/cardStore';

beforeEach(() => {
  useCardStore.setState({ cards: {}, manualOrder: [], manualOrderCustomized: false });
});

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
    expect(card?.isPinned).toBe(false);
    expect(card?.openCount).toBe(0);
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

  it('togglePinned flips isPinned without touching updatedAt', () => {
    useCardStore.getState().addCard({ name: 'Fav', code: '555', format: BarcodeFormat.CODE39 });

    const id = firstId();
    const updatedAt = useCardStore.getState().cards[id]?.updatedAt;

    useCardStore.getState().togglePinned(id);
    expect(useCardStore.getState().cards[id]?.isPinned).toBe(true);

    useCardStore.getState().togglePinned(id);
    expect(useCardStore.getState().cards[id]?.isPinned).toBe(false);
    expect(useCardStore.getState().cards[id]?.updatedAt).toBe(updatedAt);
  });

  it('addCard keeps owner and pinned flag', () => {
    useCardStore.getState().addCard({
      name: 'Carrefour',
      code: '1',
      format: BarcodeFormat.EAN13,
      owner: 'Léa',
      isPinned: true,
    });

    const card = useCardStore.getState().cards[firstId()];
    expect(card?.owner).toBe('Léa');
    expect(card?.isPinned).toBe(true);
  });

  it('recordOpen counts opens and stamps lastOpenedAt, leaving updatedAt alone', () => {
    useCardStore.getState().addCard({ name: 'Open', code: '777', format: BarcodeFormat.EAN8 });

    const id = firstId();
    const before = useCardStore.getState().cards[id]?.updatedAt;
    if (before === undefined) throw new Error('missing card');

    jest.spyOn(Date, 'now').mockReturnValue(before + 5000);
    useCardStore.getState().recordOpen(id);
    useCardStore.getState().recordOpen(id);

    const card = useCardStore.getState().cards[id];
    expect(card?.openCount).toBe(2);
    expect(card?.lastOpenedAt).toBe(before + 5000);
    expect(card?.updatedAt).toBe(before);

    jest.restoreAllMocks();
  });

  it('importCards adds new cards and skips known codes', () => {
    useCardStore.getState().addCard({ name: 'Mine', code: '111', format: BarcodeFormat.EAN13 });

    const summary = useCardStore
      .getState()
      .importCards([
        makeCard({ id: 'x', name: 'Duplicate', code: '111' }),
        makeCard({ id: 'y', name: 'New', code: '222' }),
        makeCard({ id: 'z', name: 'Same file twice', code: '222' }),
      ]);

    expect(summary).toEqual({ added: 1, skipped: 2 });
    expect(
      Object.values(useCardStore.getState().cards)
        .map((card) => card.name)
        .sort(),
    ).toEqual(['Mine', 'New']);
  });

  it('addCard appends the new card to the manual order', () => {
    const first = useCardStore
      .getState()
      .addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });
    const second = useCardStore
      .getState()
      .addCard({ name: 'B', code: '2', format: BarcodeFormat.CODE128 });

    expect(useCardStore.getState().manualOrder).toEqual([first, second]);
  });

  it('removeCard drops the card from the manual order', () => {
    const kept = useCardStore
      .getState()
      .addCard({ name: 'Kept', code: '1', format: BarcodeFormat.CODE128 });
    const gone = useCardStore
      .getState()
      .addCard({ name: 'Gone', code: '2', format: BarcodeFormat.CODE128 });

    useCardStore.getState().removeCard(gone);

    expect(useCardStore.getState().manualOrder).toEqual([kept]);
  });

  it('importCards appends only the added cards to the manual order, in file order', () => {
    const mine = useCardStore
      .getState()
      .addCard({ name: 'Mine', code: '111', format: BarcodeFormat.EAN13 });

    useCardStore
      .getState()
      .importCards([
        makeCard({ id: '42', name: 'Numeric id', code: '333' }),
        makeCard({ id: 'dup', name: 'Duplicate', code: '111' }),
        makeCard({ id: 'new', name: 'New', code: '222' }),
        makeCard({ id: 'new', name: 'Same id twice', code: '444' }),
      ]);

    expect(useCardStore.getState().manualOrder).toEqual([mine, '42', 'new']);
    expect(useCardStore.getState().cards['new' as CardId]?.name).toBe('New');
  });

  it('setManualOrder replaces the order, ignoring repeated and unknown ids', () => {
    const a = useCardStore
      .getState()
      .addCard({ name: 'A', code: '1', format: BarcodeFormat.QR_CODE });
    const b = useCardStore
      .getState()
      .addCard({ name: 'B', code: '2', format: BarcodeFormat.QR_CODE });

    useCardStore.getState().setManualOrder([b, 'gone' as CardId, a, b]);

    expect(useCardStore.getState().manualOrder).toEqual([b, a]);
  });

  it('togglePinned ignores unknown card id', () => {
    useCardStore.getState().addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });

    const before = { ...useCardStore.getState().cards };
    useCardStore.getState().togglePinned('nonexistent' as CardId);

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

  it('remembers a custom manual order so later seeding cannot overwrite it', () => {
    const store = useCardStore.getState();
    const first = store.addCard({ name: 'A', code: '1', format: BarcodeFormat.CODE128 });
    const second = store.addCard({ name: 'B', code: '2', format: BarcodeFormat.CODE128 });

    useCardStore.getState().setManualOrder([second, first], { seeded: true });
    expect(useCardStore.getState().manualOrderCustomized).toBe(false);

    useCardStore.getState().setManualOrder([first, second]);
    expect(useCardStore.getState().manualOrderCustomized).toBe(true);
  });
});
