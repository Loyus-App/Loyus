import * as Brightness from 'expo-brightness';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { ignore } from '@/ui/utils/ignore';

const KEEP_AWAKE_TAG = 'loyus-checkout';
const FULL_BRIGHTNESS = 1;

function isForeground(state: string | null | undefined): boolean {
  return state !== 'background' && state !== 'inactive';
}

function useAppInForeground(): boolean {
  const [foreground, setForeground] = useState(() => isForeground(AppState.currentState));

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      setForeground(isForeground(state));
    });
    return () => subscription.remove();
  }, []);

  return foreground;
}

function restoreBrightness(previous: number): void {
  if (Platform.OS === 'android') {
    Brightness.restoreSystemBrightnessAsync().catch(ignore);
    return;
  }
  Brightness.setBrightnessAsync(previous).catch(ignore);
}

function boostBrightness(): () => void {
  let cancelled = false;
  let previous: number | null = null;

  Brightness.getBrightnessAsync()
    .then((current) => {
      if (cancelled) return Promise.resolve();
      previous = current;
      return Brightness.setBrightnessAsync(FULL_BRIGHTNESS);
    })
    .catch(ignore);

  return () => {
    cancelled = true;
    if (previous !== null) restoreBrightness(previous);
  };
}

export function useCheckoutDisplay(maxBrightness: boolean): void {
  const inForeground = useAppInForeground();

  useFocusEffect(
    useCallback(() => {
      activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(ignore);
      return () => {
        deactivateKeepAwake(KEEP_AWAKE_TAG).catch(ignore);
      };
    }, []),
  );

  useFocusEffect(
    useCallback(
      () => (maxBrightness && inForeground ? boostBrightness() : undefined),
      [maxBrightness, inForeground],
    ),
  );
}
