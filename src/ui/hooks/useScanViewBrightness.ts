import { useFocusEffect } from '@react-navigation/native';
import * as Brightness from 'expo-brightness';
import { useKeepAwake } from 'expo-keep-awake';
import { useCallback, useRef } from 'react';

/**
 * Maxes screen brightness on focus, restores on blur. Keeps screen awake.
 * Uses app-level setBrightnessAsync only (no system permissions needed).
 */
export function useScanViewBrightness(): void {
  useKeepAwake();
  const previousBrightness = useRef<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      (async () => {
        try {
          const current = await Brightness.getBrightnessAsync();
          if (mounted) {
            previousBrightness.current = current;
            await Brightness.setBrightnessAsync(1);
          }
        } catch {
          // Silently fail -- brightness is a nice-to-have
        }
      })();

      return () => {
        mounted = false;
        if (previousBrightness.current !== null) {
          Brightness.setBrightnessAsync(previousBrightness.current).catch(() => undefined);
        }
      };
    }, []),
  );
}
