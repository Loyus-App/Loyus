import { randomUUID } from 'expo-crypto';
import { Directory, File, Paths } from 'expo-file-system';
import { deleteQuietly } from '../files';

const FOLDER = 'card-photos';
const FILE_NAME = /^[\w-]+\.[a-z0-9]{1,5}$/i;
const EXTENSION = /\.([a-z0-9]{1,5})$/i;
const QUERY_OR_HASH = /[?#]/;

function photoFolder(): Directory {
  return new Directory(Paths.document, FOLDER);
}

function photoFile(fileName: string): File | null {
  return FILE_NAME.test(fileName) ? new File(photoFolder(), fileName) : null;
}

function extensionOf(uri: string): string {
  const path = uri.split(QUERY_OR_HASH)[0] ?? '';
  return EXTENSION.exec(path)?.[1]?.toLowerCase() ?? 'jpg';
}

export async function savePhoto(sourceUri: string): Promise<string> {
  const folder = photoFolder();
  folder.create({ intermediates: true, idempotent: true });
  const fileName = `${randomUUID()}.${extensionOf(sourceUri)}`;
  await new File(sourceUri).copy(new File(folder, fileName));
  return fileName;
}

export function photoUri(fileName: string): string | null {
  return photoFile(fileName)?.uri ?? null;
}

export function photoExists(fileName: string): boolean {
  try {
    return photoFile(fileName)?.exists ?? false;
  } catch {
    return false;
  }
}

export function deletePhotos(fileNames: readonly string[]): void {
  for (const fileName of fileNames) {
    deleteQuietly(photoFile(fileName));
  }
}
