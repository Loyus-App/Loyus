import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Hook that tracks the system Reduced Motion preference.
 * Returns `{ reducedMotion: true }` when the user has enabled
 * "Reduce Motion" in device accessibility settings.
 *
 * Usage: gate animations so they are skipped (duration 0) when enabled.
 * ```ts
 * const { reducedMotion } = useReducedMotion();
 * const duration = reducedMotion ? 0 : 300;
 * ```
 */
export function useReducedMotion(): { reducedMotion: boolean } {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Read initial value
    AccessibilityInfo.isReduceMotionEnabled()
      .then(setReducedMotion)
      .catch(() => undefined);

    // Subscribe to live changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return { reducedMotion };
}
