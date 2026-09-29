import { File, Paths } from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import type { Card } from '../../domain/card';
import { portableCard, SERIALIZER_VERSION } from '../../domain/serializer';
import { useCardStore } from '../../state/stores/cardStore';
import { deleteQuietly } from '../files';

interface ExportData {
  readonly version: number;
  readonly exportedAt: string;
  readonly cards: Card[];
}

export function buildExportFileName(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `loyus-cards-${y}-${m}-${d}.json`;
}

export function buildExportJson(cards: readonly Card[]): string {
  const data: ExportData = {
    version: SERIALIZER_VERSION,
    exportedAt: new Date().toISOString(),
    cards: cards.map(portableCard),
  };
  return JSON.stringify(data, null, 2);
}

export async function exportCards(): Promise<void> {
  const cards = Object.values(useCardStore.getState().cards);
  const json = buildExportJson(cards);
  const filename = buildExportFileName();
  const file = new File(Paths.cache, filename);

  await file.write(json);

  await shareAsync(file.uri, {
    mimeType: 'application/json',
    dialogTitle: 'Export Loyus Cards',
    // biome-ignore lint/style/useNamingConvention: Apple UTI API requires this exact key name
    UTI: 'public.json',
  });

  deleteQuietly(file);
}
