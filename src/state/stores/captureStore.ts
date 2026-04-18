import { create } from 'zustand';
import type { BarcodeFormat } from '../../domain/card';

interface CaptureStoreState {
  scannedCode: string | null;
  scannedFormat: BarcodeFormat | null;
  isScanning: boolean;
  setScannedResult: (code: string, format: BarcodeFormat) => void;
  clearScan: () => void;
  setIsScanning: (value: boolean) => void;
}

export const useCaptureStore = create<CaptureStoreState>()((set) => ({
  scannedCode: null,
  scannedFormat: null,
  isScanning: false,
  setScannedResult: (code, format) => set({ scannedCode: code, scannedFormat: format }),
  clearScan: () => set({ scannedCode: null, scannedFormat: null }),
  setIsScanning: (value) => set({ isScanning: value }),
}));
