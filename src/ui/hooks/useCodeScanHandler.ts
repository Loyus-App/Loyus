import { useCallback, useRef } from 'react';
import type { Code } from 'react-native-vision-camera';

const DEBOUNCE_MS = 500;
const REQUIRED_CONSECUTIVE = 2;

/**
 * Debounce + consecutive-read confirmation for barcode scanning.
 *
 * Requires the same code detected 2x (outside a 500ms debounce window)
 * before calling `onConfirm`. Prevents false positives from scanner noise.
 *
 * Returns a handler compatible with VisionCamera `onCodeScanned` signature.
 */
export function useCodeScanHandler(
  onConfirm: (code: string, codeType: string) => void,
): (codes: Code[]) => void {
  const lastCode = useRef<string | null>(null);
  const lastTime = useRef(0);
  const consecutiveCount = useRef(0);

  return useCallback(
    (codes: Code[]) => {
      const first = codes[0];
      if (!first?.value) return;
      const { value, type } = first;

      const now = Date.now();

      // Debounce: ignore duplicate within 500ms
      if (value === lastCode.current && now - lastTime.current < DEBOUNCE_MS) {
        return;
      }

      if (value === lastCode.current) {
        consecutiveCount.current += 1;
      } else {
        consecutiveCount.current = 1;
        lastCode.current = value;
      }
      lastTime.current = now;

      if (consecutiveCount.current >= REQUIRED_CONSECUTIVE) {
        consecutiveCount.current = 0;
        onConfirm(value, type);
      }
    },
    [onConfirm],
  );
}
