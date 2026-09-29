declare const CardIdBrand: unique symbol;

export type CardId = string & { readonly [CardIdBrand]: typeof CardIdBrand };

export enum BarcodeFormat {
  CODE128 = 'CODE128',
  CODE39 = 'CODE39',
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  UPC_A = 'UPC_A',
  UPC_E = 'UPC_E',
  ITF14 = 'ITF14',
  CODABAR = 'CODABAR',
  MSI = 'MSI',
  PHARMACODE = 'PHARMACODE',
  QR_CODE = 'QR_CODE',
  DATA_MATRIX = 'DATA_MATRIX',
  PDF417 = 'PDF417',
  AZTEC = 'AZTEC',
  GS1_DATABAR = 'GS1_DATABAR',
}

export const JSBARCODE_FORMAT: Record<BarcodeFormat, string> = {
  [BarcodeFormat.CODE128]: 'CODE128',
  [BarcodeFormat.CODE39]: 'CODE39',
  [BarcodeFormat.EAN13]: 'EAN13',
  [BarcodeFormat.EAN8]: 'EAN8',
  [BarcodeFormat.UPC_A]: 'UPC',
  [BarcodeFormat.UPC_E]: 'UPCE',
  [BarcodeFormat.ITF14]: 'ITF14',
  [BarcodeFormat.CODABAR]: 'codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'pharmacode',
  [BarcodeFormat.QR_CODE]: 'QR_CODE',
  [BarcodeFormat.DATA_MATRIX]: 'DATA_MATRIX',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'AZTEC',
  [BarcodeFormat.GS1_DATABAR]: 'GS1_DATABAR',
};

export const FORMAT_LABEL: Record<BarcodeFormat, string> = {
  [BarcodeFormat.EAN13]: 'EAN-13',
  [BarcodeFormat.EAN8]: 'EAN-8',
  [BarcodeFormat.UPC_A]: 'UPC-A',
  [BarcodeFormat.UPC_E]: 'UPC-E',
  [BarcodeFormat.ITF14]: 'ITF-14',
  [BarcodeFormat.CODE128]: 'Code 128',
  [BarcodeFormat.CODE39]: 'Code 39',
  [BarcodeFormat.CODABAR]: 'Codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'Pharmacode',
  [BarcodeFormat.QR_CODE]: 'QR code',
  [BarcodeFormat.DATA_MATRIX]: 'Data Matrix',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'Aztec',
  [BarcodeFormat.GS1_DATABAR]: 'GS1 DataBar',
};

export interface CardPhotos {
  readonly front?: string | undefined;
  readonly back?: string | undefined;
}

export interface Card {
  readonly id: CardId;
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
  readonly color?: string | undefined;
  readonly brandId?: string | undefined;
  readonly owner?: string | undefined;
  readonly note?: string | undefined;
  readonly photos?: CardPhotos | undefined;
  readonly isPinned: boolean;
  readonly barcodeRotated?: boolean | undefined;
  readonly openCount: number;
  readonly lastOpenedAt?: number | undefined;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface CreateCardInput {
  readonly id: CardId;
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
  readonly color?: string | undefined;
  readonly brandId?: string | undefined;
  readonly owner?: string | undefined;
  readonly note?: string | undefined;
  readonly photos?: CardPhotos | undefined;
  readonly isPinned?: boolean | undefined;
}

function optionalText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function compactPhotos(photos: CardPhotos | undefined): CardPhotos | undefined {
  const front = photos?.front || undefined;
  const back = photos?.back || undefined;
  if (!(front || back)) return undefined;
  return { ...(front ? { front } : {}), ...(back ? { back } : {}) };
}

export function photoFileNames(photos: CardPhotos | undefined): string[] {
  return [photos?.front, photos?.back].filter((name): name is string => Boolean(name));
}

export function createCard(input: CreateCardInput, now: number = Date.now()): Card {
  const owner = optionalText(input.owner);
  const note = optionalText(input.note);
  const photos = compactPhotos(input.photos);
  return {
    id: input.id,
    name: input.name.trim(),
    code: input.code.trim(),
    format: input.format,
    ...(input.color === undefined ? {} : { color: input.color }),
    ...(input.brandId === undefined ? {} : { brandId: input.brandId }),
    ...(owner === undefined ? {} : { owner }),
    ...(note === undefined ? {} : { note }),
    ...(photos === undefined ? {} : { photos }),
    isPinned: input.isPinned ?? false,
    openCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

const WORD_SEPARATOR = /[^\p{L}\p{N}]+/u;

export function cardInitials(name: string): string {
  const words = name.split(WORD_SEPARATOR).filter(Boolean);
  const [first = '', second = ''] = words;
  const initials = second
    ? `${[...first][0] ?? ''}${[...second][0] ?? ''}`
    : [...first].slice(0, 2).join('');
  return initials.toUpperCase() || '?';
}

const DIGITS = /^\d+$/;
const GROUPS_OF_FOUR = /(\d{4})(?=\d)/g;

function splitBy(code: string, sizes: readonly number[]): string {
  const parts: string[] = [];
  let index = 0;
  for (const size of sizes) {
    parts.push(code.slice(index, index + size));
    index += size;
  }
  return parts.filter(Boolean).join(' ');
}

export function formatCodeForDisplay(code: string, format: BarcodeFormat): string {
  if (!DIGITS.test(code)) return code;
  if (format === BarcodeFormat.EAN13 && code.length === 13) return splitBy(code, [1, 6, 6]);
  if (format === BarcodeFormat.EAN8 && code.length === 8) return splitBy(code, [4, 4]);
  if (format === BarcodeFormat.UPC_A && code.length === 12) return splitBy(code, [1, 5, 5, 1]);
  return code.replace(GROUPS_OF_FOUR, '$1 ');
}

export function findDuplicate(
  cards: readonly Card[],
  code: string,
  excludeId?: CardId,
): Card | undefined {
  const needle = code.trim();
  if (!needle) return undefined;
  return cards.find((card) => card.id !== excludeId && card.code === needle);
}
