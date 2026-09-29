import { BarcodeFormat, type Card } from '../../domain/card';
import { SERIALIZER_VERSION } from '../../domain/serializer';
import { buildExportFileName, exportCards } from './cardExport';

const mockFiles = new Map<string, string>();
const mockShare = jest.fn<Promise<void>, [string]>();

jest.mock('expo-file-system', () => {
  class File {
    readonly uri: string;
    constructor(folder: string, name: string) {
      this.uri = `${folder}/${name}`;
    }
    get exists(): boolean {
      return mockFiles.has(this.uri);
    }
    write(content: string): Promise<void> {
      mockFiles.set(this.uri, content);
      return Promise.resolve();
    }
    delete(): void {
      mockFiles.delete(this.uri);
    }
  }

  // biome-ignore lint/style/useNamingConvention: mirrors the expo-file-system exports
  return { File, Paths: { cache: 'file:///cache' } };
});

jest.mock('expo-sharing', () => ({
  shareAsync: (uri: string) => mockShare(uri),
}));

jest.mock('../i18n', () => ({ i18n: { t: (key: string) => key } }));

const sampleCard: Card = {
  id: 'card-1' as Card['id'],
  name: 'Test Store',
  code: '1234567890128',
  format: BarcodeFormat.EAN13,
  isPinned: false,
  openCount: 0,
  createdAt: 1700000000000,
  updatedAt: 1700000000000,
};

beforeEach(() => {
  mockFiles.clear();
  mockShare.mockReset();
});

describe('buildExportFileName', () => {
  it('returns loyus-cards-YYYY-MM-DD.json for a given date', () => {
    const date = new Date('2026-04-14T12:00:00Z');
    expect(buildExportFileName(date)).toBe('loyus-cards-2026-04-14.json');
  });

  it('pads single-digit month and day', () => {
    const date = new Date('2026-01-05T00:00:00Z');
    expect(buildExportFileName(date)).toBe('loyus-cards-2026-01-05.json');
  });
});

describe('exportCards', () => {
  it('shares a versioned backup of the cards, then deletes the file', async () => {
    let shared: { version: number; cards: Card[] } | undefined;
    mockShare.mockImplementation((uri) => {
      shared = JSON.parse(mockFiles.get(uri) ?? 'null');
      return Promise.resolve();
    });

    await exportCards([sampleCard]);

    expect(shared?.version).toBe(SERIALIZER_VERSION);
    expect(shared?.cards).toEqual([sampleCard]);
    expect(mockFiles.size).toBe(0);
  });

  it('deletes the backup file when sharing fails', async () => {
    mockShare.mockRejectedValue(new Error('dismissed'));

    await expect(exportCards([sampleCard])).rejects.toThrow('dismissed');
    expect(mockFiles.size).toBe(0);
  });
});
