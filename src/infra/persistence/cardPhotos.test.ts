const mockFiles = new Set<string>();
const mockFolders = new Set<string>();

jest.mock('expo-file-system', () => {
  const join = (parts: readonly unknown[]): string =>
    parts
      .map((part) => (typeof part === 'string' ? part : (part as { uri: string }).uri))
      .join('/');

  class Directory {
    readonly uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    create(): void {
      mockFolders.add(this.uri);
    }
  }

  class File {
    readonly uri: string;
    constructor(...parts: unknown[]) {
      this.uri = join(parts);
    }
    get exists(): boolean {
      return mockFiles.has(this.uri);
    }
    copy(destination: File): Promise<void> {
      mockFiles.add(destination.uri);
      return Promise.resolve();
    }
    delete(): void {
      mockFiles.delete(this.uri);
    }
  }

  // biome-ignore lint/style/useNamingConvention: mirrors the expo-file-system exports
  return { Directory, File, Paths: { document: new Directory('file:///docs') } };
});

import { deletePhotos, photoExists, photoUri, savePhoto } from './cardPhotos';

const FOLDER = 'file:///docs/card-photos';

beforeEach(() => {
  mockFiles.clear();
  mockFolders.clear();
});

describe('savePhoto', () => {
  it('copies the picture into the photo folder under a new name', async () => {
    const fileName = await savePhoto('file:///cache/ImagePicker/IMG_1.JPG');
    expect(fileName).toMatch(/^test-uuid-\d+\.jpg$/);
    expect(mockFolders.has(FOLDER)).toBe(true);
    expect(mockFiles.has(`${FOLDER}/${fileName}`)).toBe(true);
  });

  it('never reuses a name', async () => {
    const first = await savePhoto('file:///cache/a.png');
    const second = await savePhoto('file:///cache/a.png');
    expect(first).not.toBe(second);
    expect(first.endsWith('.png')).toBe(true);
  });

  it('falls back to jpg when the source has no extension', async () => {
    expect(await savePhoto('content://media/external/images/42?x=1')).toMatch(/\.jpg$/);
  });
});

describe('photoUri', () => {
  it('points inside the photo folder', () => {
    expect(photoUri('abc.jpg')).toBe(`${FOLDER}/abc.jpg`);
  });

  it('rejects names that could escape the folder', () => {
    expect(photoUri('../mmkv/cards')).toBeNull();
    expect(photoUri('')).toBeNull();
  });
});

describe('photoExists', () => {
  it('reflects the file on disk', async () => {
    const fileName = await savePhoto('file:///cache/a.jpg');
    expect(photoExists(fileName)).toBe(true);
    expect(photoExists('missing.jpg')).toBe(false);
  });
});

describe('deletePhotos', () => {
  it('removes the given files and ignores unknown ones', async () => {
    const kept = await savePhoto('file:///cache/a.jpg');
    const removed = await savePhoto('file:///cache/b.jpg');
    deletePhotos([removed, 'missing.jpg']);
    expect(photoExists(removed)).toBe(false);
    expect(photoExists(kept)).toBe(true);
  });

  it('never touches files outside the folder', () => {
    mockFiles.add('file:///docs/mmkv.default');
    deletePhotos(['../mmkv.default']);
    expect(mockFiles.has('file:///docs/mmkv.default')).toBe(true);
  });
});
