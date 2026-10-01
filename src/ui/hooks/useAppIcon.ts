import { useEffect } from 'react';
import type { AppIconName } from '@/domain/appIcon';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { reconcileAppIcon } from '@/ui/utils/appIcon';

export function useAppIcon(): AppIconName {
  useEffect(reconcileAppIcon, []);
  return useSettingsStore((state) => state.appIcon);
}
