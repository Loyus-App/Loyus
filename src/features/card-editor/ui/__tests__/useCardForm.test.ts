import { BarcodeFormat } from '@/entities/barcode/domain/barcodeFormat';
import { savePhoto } from '@/entities/card/infra/cardPhotos';
import { act, renderHook } from '@/shared/testing/renderHook';
import { type CardFormValues, useCardForm } from '../useCardForm';

jest.mock('@/entities/card/infra/cardPhotos', () => ({
  savePhoto: jest.fn(),
  deletePhotos: jest.fn(),
  photoExists: () => true,
}));

jest.mock('@/shared/platform/region', () => ({ deviceRegion: () => 'FR' }));

jest.mock('@/shared/platform/haptics', () => ({
  haptics: { selection: jest.fn(), warning: jest.fn() },
}));

const mockSavePhoto = jest.mocked(savePhoto);

function renderForm(initial = { code: '123', format: BarcodeFormat.CODE128 }) {
  return renderHook(() => useCardForm(initial, { autoLinkBrand: true }));
}

describe('useCardForm', () => {
  it('links a store typed by hand, so the preview matches what gets saved', () => {
    const { result } = renderForm();

    act(() => result.current.onNameChange('Carrefour'));
    expect(result.current.brandId).toBe('carrefour');

    act(() => result.current.clearBrand());
    expect(result.current.brandId).toBeUndefined();
  });

  it('waits for a photo that is still being copied before saving', async () => {
    let finishCopy: (fileName: string) => void = () => undefined;
    mockSavePhoto.mockReturnValue(
      new Promise((resolve) => {
        finishCopy = resolve;
      }),
    );
    const onValid = jest.fn<undefined, [CardFormValues]>();
    const { result } = renderForm();

    act(() => result.current.onNameChange('Bakery'));
    let adding: Promise<void> = Promise.resolve();
    act(() => {
      adding = result.current.addPhoto('front', 'file:///camera/shot.jpg');
    });
    act(() => result.current.submit(onValid));
    expect(onValid).not.toHaveBeenCalled();

    await act(async () => {
      finishCopy('front.jpg');
      await adding;
    });

    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid.mock.calls[0]?.[0].photos).toEqual({ front: 'front.jpg' });
  });

  it('saves once when the button is pressed twice', async () => {
    const onValid = jest.fn<undefined, [CardFormValues]>();
    const { result } = renderForm();

    act(() => result.current.onNameChange('Bakery'));
    await act(async () => {
      result.current.submit(onValid);
      result.current.submit(onValid);
      await Promise.resolve();
    });

    expect(onValid).toHaveBeenCalledTimes(1);
  });
});
