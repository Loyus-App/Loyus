import { File, Paths } from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import type { Card } from '../../domain/card';
import { serializeCards } from '../../domain/serializer';
import { deleteQuietly } from '../files';
import { i18n } from '../i18n';

export function buildExportFileName(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `loyus-cards-${y}-${m}-${d}.json`;
}

export async function exportCards(cards: readonly Card[]): Promise<void> {
  const now = new Date();
  const file = new File(Paths.cache, buildExportFileName(now));
  try {
    await file.write(serializeCards(cards, now));
    await shareAsync(file.uri, {
      mimeType: 'application/json',
      dialogTitle: i18n.t('settings.exportDialogTitle'),
      // biome-ignore lint/style/useNamingConvention: Apple UTI API requires this exact key name
      UTI: 'public.json',
    });
  } finally {
    deleteQuietly(file);
  }
}
