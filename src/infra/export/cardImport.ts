import { getDocumentAsync } from 'expo-document-picker';
import { File } from 'expo-file-system';
import type { Card } from '../../domain/card';
import { deserializeCards } from '../../domain/serializer';
import { deleteQuietly } from '../files';

export async function pickBackupCards(): Promise<Card[] | null> {
  const result = await getDocumentAsync({
    type: ['application/json', 'public.json', '*/*'],
    copyToCacheDirectory: true,
  });
  const asset = result.canceled ? undefined : result.assets[0];
  if (!asset) return null;
  const file = new File(asset.uri);
  const cards = deserializeCards(await file.text());
  deleteQuietly(file);
  return cards;
}
