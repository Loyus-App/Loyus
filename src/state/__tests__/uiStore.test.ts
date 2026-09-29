import { useUiStore } from '../stores/uiStore';

beforeEach(() => {
  useUiStore.setState({ searchQuery: '', actionSheet: null, brandPick: null });
});

describe('uiStore', () => {
  it('default searchQuery is empty string', () => {
    expect(useUiStore.getState().searchQuery).toBe('');
  });

  it('setSearchQuery updates searchQuery', () => {
    useUiStore.getState().setSearchQuery('cafe');
    expect(useUiStore.getState().searchQuery).toBe('cafe');
  });

  it('shows and hides an action sheet request', () => {
    const request = { title: 'Carrefour', actions: [{ label: 'Edit', run: jest.fn() }] };
    useUiStore.getState().showActionSheet(request);
    expect(useUiStore.getState().actionSheet).toBe(request);

    useUiStore.getState().hideActionSheet();
    expect(useUiStore.getState().actionSheet).toBeNull();
  });

  it('hands a brand pick over once', () => {
    useUiStore.getState().pickBrand('carrefour');
    expect(useUiStore.getState().takeBrandPick()).toEqual({ brandId: 'carrefour' });
    expect(useUiStore.getState().takeBrandPick()).toBeNull();
  });

  it('records choosing no brand', () => {
    useUiStore.getState().pickBrand(null);
    expect(useUiStore.getState().takeBrandPick()).toEqual({ brandId: null });
  });
});
