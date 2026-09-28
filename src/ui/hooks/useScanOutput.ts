import type { CameraOutput } from 'react-native-vision-camera';
import type { DetectedCode } from './useCodeScanHandler';

// Real impls are in .ios/.android; this fallback only exists for TS module resolution.
export function useScanOutput(_onCodes: (codes: DetectedCode[]) => void): CameraOutput {
  throw new Error('Barcode scanning is only supported on iOS and Android');
}
