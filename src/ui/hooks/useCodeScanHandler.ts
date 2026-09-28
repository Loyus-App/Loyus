import { useCallback, useRef } from 'react';
import type { BarcodeFormat } from '../../domain/card';

const DEBOUNCE_MS = 500;
const REQUIRED_CONSECUTIVE = 2;

export interface DetectedCode {
  value: string | undefined;
  format: BarcodeFormat;
}

/** Confirms a code only after repeated reads, filtering out scanner misreads. */
export function useCodeScanHandler(
  onConfirm: (code: string, format: BarcodeFormat) => void,
): (codes: DetectedCode[]) => void {
  const lastCode = useRef<string | null>(null);
  const lastTime = useRef(0);
  const consecutiveCount = useRef(0);

  return useCallback(
    (codes: DetectedCode[]) => {
      const first = codes[0];
      if (!first?.value) return;
      const { value, format } = first;

      const now = Date.now();

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
        onConfirm(value, format);
      }
    },
    [onConfirm],
  );
}
