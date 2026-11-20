import { useEffect } from 'react';
import type { AppIconName } from '@/entities/settings/domain/appIcon';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { reconcileAppIcon } from './appIconActions';

export function useAppIcon(): AppIconName {
  useEffect(reconcileAppIcon, []);
  return useSettingsStore((state) => state.appIcon);
}
