import { Directory, File, Paths } from 'expo-file-system';
import { Platform, Share } from 'react-native';
import type { Card } from '../../domain/card';
import { serializeCards } from '../../domain/serializer';
import { deleteQuietly } from '../files';

const PICKER_CANCELLED = 'ERR_PICKER_CANCELLED';

export function buildExportFileName(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `loyus-cards-${y}-${m}-${d}.json`;
}

function isPickerCancelled(error: unknown): boolean {
  return (error as { code?: unknown } | null)?.code === PICKER_CANCELLED;
}

async function saveToChosenFolder(name: string, json: string): Promise<boolean> {
  let folder: Directory;
  try {
    folder = await Directory.pickDirectoryAsync();
  } catch (error) {
    if (isPickerCancelled(error)) return false;
    throw error;
  }
  await folder.createFile(name, 'application/json').write(json);
  return true;
}

async function shareFromCache(name: string, json: string): Promise<boolean> {
  const file = new File(Paths.cache, name);
  try {
    await file.write(json);
    const result = await Share.share({ url: file.uri });
    return result.action === Share.sharedAction;
  } finally {
    deleteQuietly(file);
  }
}

export function exportCards(cards: readonly Card[]): Promise<boolean> {
  const now = new Date();
  const name = buildExportFileName(now);
  const json = serializeCards(cards, now);
  return Platform.OS === 'android' ? saveToChosenFolder(name, json) : shareFromCache(name, json);
}
