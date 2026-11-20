import { Alert } from 'react-native';
import { useCardStore } from '@/entities/card/state/cardStore';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { i18n } from '@/shared/i18n';
import { haptics } from '@/shared/platform/haptics';
import { exportCards } from '../infra/cardExport';
import { pickBackupCards } from '../infra/cardImport';

export async function exportBackup(): Promise<void> {
  const cards = Object.values(useCardStore.getState().cards);
  try {
    const shared = await exportCards(cards);
    if (shared && cards.length > 0) useSettingsStore.getState().setLastBackupAt(Date.now());
  } catch {
    Alert.alert(i18n.t('settings.exportFailedTitle'), i18n.t('settings.exportFailedBody'));
  }
}

export async function restoreBackup(): Promise<void> {
  let cards: Awaited<ReturnType<typeof pickBackupCards>>;
  try {
    cards = await pickBackupCards();
  } catch {
    haptics.warning();
    Alert.alert(i18n.t('settings.restoreFailedTitle'), i18n.t('settings.restoreFailedBody'));
    return;
  }
  if (!cards) return;
  const summary = useCardStore.getState().importCards(cards);
  haptics.success();
  Alert.alert(
    i18n.t('settings.restoreDoneTitle'),
    i18n.t('settings.restoreDoneBody', { ...summary }),
  );
}
