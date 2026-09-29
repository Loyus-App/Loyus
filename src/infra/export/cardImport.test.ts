import { pickBackupCards } from './cardImport';

const mockFiles = new Map<string, string>();

jest.mock('expo-document-picker', () => ({
  getDocumentAsync: () =>
    Promise.resolve({ canceled: false, assets: [{ uri: 'file:///cache/backup.json' }] }),
}));

jest.mock('expo-file-system', () => {
  class File {
    readonly uri: string;
    constructor(uri: string) {
      this.uri = uri;
    }
    get exists(): boolean {
      return mockFiles.has(this.uri);
    }
    text(): Promise<string> {
      return Promise.resolve(mockFiles.get(this.uri) ?? '');
    }
    delete(): void {
      mockFiles.delete(this.uri);
    }
  }

  // biome-ignore lint/style/useNamingConvention: mirrors the expo-file-system exports
  return { File };
});

beforeEach(() => {
  mockFiles.clear();
});

describe('pickBackupCards', () => {
  it('reads the cards and deletes the cached copy', async () => {
    const card = { id: 'c1', name: 'A', code: '1', format: 'CODE128', createdAt: 1, updatedAt: 1 };
    mockFiles.set('file:///cache/backup.json', JSON.stringify({ version: 2, cards: [card] }));

    const cards = await pickBackupCards();

    expect(cards?.map((restored) => restored.id)).toEqual(['c1']);
    expect(mockFiles.size).toBe(0);
  });

  it('deletes the cached copy when the backup is invalid', async () => {
    mockFiles.set('file:///cache/backup.json', 'not json');

    await expect(pickBackupCards()).rejects.toThrow('Invalid JSON');
    expect(mockFiles.size).toBe(0);
  });
});
