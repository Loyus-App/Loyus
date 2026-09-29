import { useSyncExternalStore } from 'react';
import { AccessibilityInfo } from 'react-native';
import { ignore } from '@/ui/utils/ignore';

let reduceMotion = false;
let watching = false;
const listeners = new Set<() => void>();

function update(enabled: boolean): void {
  if (enabled === reduceMotion) return;
  reduceMotion = enabled;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  if (!watching) {
    watching = true;
    AccessibilityInfo.isReduceMotionEnabled().then(update).catch(ignore);
    AccessibilityInfo.addEventListener('reduceMotionChanged', update);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot(): boolean {
  return reduceMotion;
}

export function useReduceMotion(): boolean {
  return useSyncExternalStore(subscribe, snapshot);
}
