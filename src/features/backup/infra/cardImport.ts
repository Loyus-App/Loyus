import { getDocumentAsync } from 'expo-document-picker';
import { File } from 'expo-file-system';
import type { Card } from '@/entities/card/domain/card';
import { deleteQuietly } from '@/shared/platform/files';
import { deserializeCards } from '../domain/serializer';

export async function pickBackupCards(): Promise<Card[] | null> {
  const result = await getDocumentAsync({
    type: ['application/json', 'public.json', '*/*'],
    copyToCacheDirectory: true,
  });
  const asset = result.canceled ? undefined : result.assets[0];
  if (!asset) return null;
  const file = new File(asset.uri);
  try {
    return deserializeCards(await file.text());
  } finally {
    deleteQuietly(file);
  }
}
