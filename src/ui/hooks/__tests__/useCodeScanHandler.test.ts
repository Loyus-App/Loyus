import { act, renderHook } from '@/testing/renderHook';
import { BarcodeFormat } from '../../../domain/card';
import { type DetectedCode, useCodeScanHandler } from '../useCodeScanHandler';

function makeCode(value: string, format = BarcodeFormat.QR_CODE): DetectedCode {
  return { value, format };
}

describe('useCodeScanHandler', () => {
  let onConfirm: jest.Mock;
  let now: number;
  let scan: (codes: DetectedCode[], at: number) => void;

  beforeEach(() => {
    onConfirm = jest.fn();
    now = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
    const { result } = renderHook(() => useCodeScanHandler(onConfirm));
    scan = (codes, at) => {
      now = at;
      act(() => result.current(codes));
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not confirm a single sighting', () => {
    scan([makeCode('ABC123')], 1000);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('confirms a code seen steadily for half a second', () => {
    scan([makeCode('ABC123')], 1000);
    scan([makeCode('ABC123')], 1300);
    expect(onConfirm).not.toHaveBeenCalled();

    scan([makeCode('ABC123')], 1600);
    expect(onConfirm).toHaveBeenCalledWith('ABC123', BarcodeFormat.QR_CODE);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('does not confirm a code that changed', () => {
    scan([makeCode('ABC123')], 1000);
    scan([makeCode('XYZ789')], 1600);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('starts over after a confirmation', () => {
    scan([makeCode('ABC123')], 1000);
    scan([makeCode('ABC123')], 1600);
    scan([makeCode('ABC123')], 2200);
    expect(onConfirm).toHaveBeenCalledTimes(1);

    scan([makeCode('ABC123')], 2800);
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it('confirms a card with two symbols whose order changes between frames', () => {
    const qr = makeCode('QR-1');
    const bars = makeCode('4006381333931', BarcodeFormat.EAN13);
    scan([qr, bars], 1000);
    scan([bars, qr], 1200);
    scan([qr, bars], 1400);
    scan([bars, qr], 1600);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith('4006381333931', BarcodeFormat.EAN13);
  });

  it('forgets a code that left the frame for more than a second', () => {
    scan([makeCode('ABC123')], 1000);
    scan([], 1500);
    scan([makeCode('ABC123')], 11_000);
    expect(onConfirm).not.toHaveBeenCalled();

    scan([makeCode('ABC123')], 11_600);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('ignores an empty frame and codes without a value', () => {
    scan([], 1000);
    scan([{ value: undefined, format: BarcodeFormat.QR_CODE }], 2000);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
