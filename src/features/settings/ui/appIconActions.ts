import type { AppIconName } from '@/entities/settings/domain/appIcon';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { haptics } from '@/shared/platform/haptics';
import { canChangeAppIcon, readAppIcon, writeAppIcon } from '../infra/appIcon';

export { canChangeAppIcon };

let reconciled = false;
let latestRequest = 0;
let writes: Promise<void> = Promise.resolve();

function showSystemIcon(): void {
  useSettingsStore.getState().setAppIcon(readAppIcon());
}

export function reconcileAppIcon(): void {
  if (reconciled || !canChangeAppIcon) return;
  reconciled = true;
  showSystemIcon();
}

export function chooseAppIcon(name: AppIconName): void {
  const { appIcon, setAppIcon } = useSettingsStore.getState();
  if (name === appIcon) return;
  setAppIcon(name);
  const request = ++latestRequest;
  writes = writes.then(async () => {
    if (request !== latestRequest) return;
    try {
      await writeAppIcon(name);
    } catch {
      if (request !== latestRequest) return;
      showSystemIcon();
      haptics.warning();
    }
  });
}
