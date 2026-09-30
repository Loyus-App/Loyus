import { useCallback } from 'react';
import {
  type CameraOutput,
  isScannedCode,
  type ScannedObject,
  useObjectOutput,
} from 'react-native-vision-camera';
import { IOS_SCAN_TYPES, IOS_TYPE_TO_FORMAT } from '../../infra/camera/formatMap';
import type { DetectedCode } from './useCodeScanHandler';

export function useScanOutput(onCodes: (codes: DetectedCode[]) => void): CameraOutput {
  const onObjectsScanned = useCallback(
    (objects: ScannedObject[]) => {
      const codes: DetectedCode[] = [];
      for (const object of objects) {
        const format = IOS_TYPE_TO_FORMAT[object.type];
        if (format !== undefined && isScannedCode(object)) {
          codes.push({ value: object.value, format });
        }
      }
      onCodes(codes);
    },
    [onCodes],
  );

  return useObjectOutput({ types: IOS_SCAN_TYPES, onObjectsScanned });
}
