import { useCallback, useRef } from 'react';
import type { BarcodeFormat } from '../../domain/card';

const STABLE_FOR_MS = 500;
const LOST_AFTER_MS = 1000;

export interface DetectedCode {
  value: string | undefined;
  format: BarcodeFormat;
}

type Sighting = {
  readonly firstSeen: number;
  readonly lastSeen: number;
};

type Sightings = Map<string, Sighting>;

function forgetLost(seen: Sightings, now: number): void {
  for (const [value, sighting] of seen) {
    if (now - sighting.lastSeen > LOST_AFTER_MS) seen.delete(value);
  }
}

type StableCode = { readonly value: string; readonly format: BarcodeFormat };

function stableCode(
  seen: Sightings,
  codes: readonly DetectedCode[],
  now: number,
): StableCode | null {
  for (const { value, format } of codes) {
    if (!value) continue;
    const firstSeen = seen.get(value)?.firstSeen ?? now;
    if (now - firstSeen >= STABLE_FOR_MS) return { value, format };
    seen.set(value, { firstSeen, lastSeen: now });
  }
  return null;
}

export function useCodeScanHandler(
  onConfirm: (code: string, format: BarcodeFormat) => void,
): (codes: DetectedCode[]) => void {
  const sightings = useRef<Sightings>(new Map());

  return useCallback(
    (codes: DetectedCode[]) => {
      const now = Date.now();
      forgetLost(sightings.current, now);
      const stable = stableCode(sightings.current, codes, now);
      if (!stable) return;
      sightings.current.clear();
      onConfirm(stable.value, stable.format);
    },
    [onConfirm],
  );
}
