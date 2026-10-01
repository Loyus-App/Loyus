import { Alert } from 'react-native';
import { exportCards } from '@/infra/export/cardExport';
import { pickBackupCards } from '@/infra/export/cardImport';
import { i18n } from '@/infra/i18n';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { haptics } from './haptics';

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
