import * as Brightness from 'expo-brightness';
import { useKeepAwake } from 'expo-keep-awake';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';

// App-level brightness only (not system), so no permission is required.
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
