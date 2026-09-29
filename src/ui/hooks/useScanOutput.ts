import type { CameraOutput } from 'react-native-vision-camera';
import type { DetectedCode } from './useCodeScanHandler';

export function useScanOutput(_onCodes: (codes: DetectedCode[]) => void): CameraOutput {
  throw new Error('Barcode scanning is only supported on iOS and Android');
}
