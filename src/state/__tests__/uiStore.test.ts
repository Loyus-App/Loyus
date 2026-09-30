import { useUiStore } from '../stores/uiStore';

beforeEach(() => {
  useUiStore.setState({ actionSheet: null, brandPick: null });
});

describe('uiStore', () => {
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
