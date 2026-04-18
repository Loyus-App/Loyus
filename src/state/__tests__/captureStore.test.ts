import { BarcodeFormat } from '../../domain/card';
import { useCaptureStore } from '../stores/captureStore';

beforeEach(() => {
  useCaptureStore.setState({
    scannedCode: null,
    scannedFormat: null,
    isScanning: false,
  });
});

describe('captureStore', () => {
  it('setScannedResult sets code and format', () => {
    useCaptureStore.getState().setScannedResult('4006381333931', BarcodeFormat.EAN13);

    expect(useCaptureStore.getState().scannedCode).toBe('4006381333931');
    expect(useCaptureStore.getState().scannedFormat).toBe(BarcodeFormat.EAN13);
  });

  it('clearScan resets to null', () => {
    useCaptureStore.getState().setScannedResult('123', BarcodeFormat.CODE128);
    useCaptureStore.getState().clearScan();

    expect(useCaptureStore.getState().scannedCode).toBeNull();
    expect(useCaptureStore.getState().scannedFormat).toBeNull();
  });

  it('setIsScanning toggles scanning state', () => {
    expect(useCaptureStore.getState().isScanning).toBe(false);

    useCaptureStore.getState().setIsScanning(true);
    expect(useCaptureStore.getState().isScanning).toBe(true);

    useCaptureStore.getState().setIsScanning(false);
    expect(useCaptureStore.getState().isScanning).toBe(false);
  });
});
