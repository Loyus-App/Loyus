import { useCallback } from 'react';
import type { CameraOutput } from 'react-native-vision-camera';
import { type Barcode, useBarcodeScannerOutput } from 'react-native-vision-camera-barcode-scanner';
import { ANDROID_FORMAT_TO_FORMAT, ANDROID_SCAN_FORMATS } from '../../infra/camera/formatMap';
import type { DetectedCode } from './useCodeScanHandler';

function ignoreFrameError(): void {
  // Non-fatal: the scanner keeps running and retries on the next frame.
}

export function useScanOutput(onCodes: (codes: DetectedCode[]) => void): CameraOutput {
  const onBarcodeScanned = useCallback(
    (barcodes: Barcode[]) => {
      const codes: DetectedCode[] = [];
      for (const barcode of barcodes) {
        const format = ANDROID_FORMAT_TO_FORMAT[barcode.format];
        if (format !== undefined) {
          codes.push({ value: barcode.rawValue, format });
        }
      }
      onCodes(codes);
    },
    [onCodes],
  );

  return useBarcodeScannerOutput({
    barcodeFormats: ANDROID_SCAN_FORMATS,
    onBarcodeScanned,
    onError: ignoreFrameError,
  });
}
