import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

interface HapticActions {
  /** Light impact — card save */
  lightImpact: () => void;
  /** Medium impact — card delete */
  mediumImpact: () => void;
  /** Selection feedback — favorite toggle */
  selection: () => void;
}

/**
 * Provides haptic feedback callbacks for key user actions.
 * Each callback is fire-and-forget with try/catch so haptic
 * failures (simulator, unsupported devices) never crash the app.
 */
export function useHaptic(): HapticActions {
  const lightImpact = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics unavailable — silently ignore
    }
  }, []);

  const mediumImpact = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Haptics unavailable — silently ignore
    }
  }, []);

  const selection = useCallback(() => {
    try {
      Haptics.selectionAsync();
    } catch {
      // Haptics unavailable — silently ignore
    }
  }, []);

  return { lightImpact, mediumImpact, selection };
}
