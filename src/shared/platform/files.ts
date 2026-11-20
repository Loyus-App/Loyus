import type { File } from 'expo-file-system';

export function deleteQuietly(file: File | null): boolean {
  try {
    if (file?.exists) file.delete();
    return true;
  } catch {
    return false;
  }
}
