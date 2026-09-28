import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

interface HapticActions {
  lightImpact: () => void;
  mediumImpact: () => void;
  selection: () => void;
}

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
