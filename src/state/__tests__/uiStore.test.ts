import type { CardId } from '../../domain/card';
import { useUiStore } from '../stores/uiStore';

beforeEach(() => {
  useUiStore.setState({ searchQuery: '', selectedCardId: null });
});

describe('uiStore', () => {
  it('default searchQuery is empty string', () => {
    expect(useUiStore.getState().searchQuery).toBe('');
  });

  it('setSearchQuery updates searchQuery', () => {
    useUiStore.getState().setSearchQuery('cafe');
    expect(useUiStore.getState().searchQuery).toBe('cafe');
  });

  it('setSelectedCardId sets card id', () => {
    const id = 'some-id' as CardId;
    useUiStore.getState().setSelectedCardId(id);
    expect(useUiStore.getState().selectedCardId).toBe(id);
  });

  it('clearSelection resets selectedCardId to null', () => {
    useUiStore.getState().setSelectedCardId('some-id' as CardId);
    useUiStore.getState().clearSelection();
    expect(useUiStore.getState().selectedCardId).toBeNull();
  });
});
