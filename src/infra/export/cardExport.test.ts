import { Platform, Share } from 'react-native';
import { BarcodeFormat, type Card } from '../../domain/card';
import { SERIALIZER_VERSION } from '../../domain/serializer';
import { buildExportFileName, exportCards } from './cardExport';

const mockFiles = new Map<string, string>();
const mockPickDirectory = jest.fn<Promise<unknown>, []>();

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

  class Directory {
    readonly uri: string;
    constructor(uri: string) {
      this.uri = uri;
    }
    createFile(name: string): File {
      return new File(this.uri, name);
    }
    static pickDirectoryAsync = () => mockPickDirectory();
  }

  return { Directory, File, Paths: { cache: 'file:///cache' } };
});

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
  mockPickDirectory.mockReset();
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
  const originalOs = Platform.OS;
  let shareSpy: jest.SpyInstance;

  beforeEach(() => {
    shareSpy = jest.spyOn(Share, 'share');
  });

  afterEach(() => {
    shareSpy.mockRestore();
    Platform.OS = originalOs;
  });

  it('shares a versioned backup of the cards, then deletes the file', async () => {
    let shared: { version: number; cards: Card[] } | undefined;
    shareSpy.mockImplementation(({ url }: { url: string }) => {
      shared = JSON.parse(mockFiles.get(url) ?? 'null');
      return Promise.resolve({ action: Share.sharedAction });
    });

    await expect(exportCards([sampleCard])).resolves.toBe(true);

    expect(shared?.version).toBe(SERIALIZER_VERSION);
    expect(shared?.cards).toEqual([sampleCard]);
    expect(mockFiles.size).toBe(0);
  });

  it('reports a dismissed share sheet on iOS', async () => {
    shareSpy.mockResolvedValue({ action: Share.dismissedAction });

    await expect(exportCards([sampleCard])).resolves.toBe(false);
    expect(mockFiles.size).toBe(0);
  });

  it('deletes the backup file when sharing fails', async () => {
    shareSpy.mockRejectedValue(new Error('dismissed'));

    await expect(exportCards([sampleCard])).rejects.toThrow('dismissed');
    expect(mockFiles.size).toBe(0);
  });

  it('saves into the folder chosen on Android', async () => {
    Platform.OS = 'android';
    mockPickDirectory.mockResolvedValue(
      new (require('expo-file-system').Directory)('content://drive'),
    );

    await expect(exportCards([sampleCard])).resolves.toBe(true);
    const saved = [...mockFiles.keys()];
    expect(saved).toEqual([expect.stringMatching(/^content:\/\/drive\/loyus-cards-/)]);
    expect(shareSpy).not.toHaveBeenCalled();
  });

  it('reports a cancelled folder picker on Android', async () => {
    Platform.OS = 'android';
    mockPickDirectory.mockRejectedValue(
      Object.assign(new Error('cancelled'), { code: 'ERR_PICKER_CANCELLED' }),
    );

    await expect(exportCards([sampleCard])).resolves.toBe(false);
    expect(mockFiles.size).toBe(0);
  });
});
