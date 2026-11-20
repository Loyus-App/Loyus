import { type BarcodeFormat, FORMAT_LABEL } from '@/entities/barcode/domain/barcodeFormat';

declare const CardIdBrand: unique symbol;

export type CardId = string & { readonly [CardIdBrand]: typeof CardIdBrand };

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

export function droppedPhotos(
  before: CardPhotos | undefined,
  after: CardPhotos | undefined,
): string[] {
  const kept = new Set(photoFileNames(after));
  return photoFileNames(before).filter((name) => !kept.has(name));
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

export function cardSubtitle(card: Pick<Card, 'owner' | 'format'>): string {
  const format = FORMAT_LABEL[card.format];
  return card.owner ? `${card.owner} · ${format}` : format;
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

export function findDuplicate(
  cards: readonly Card[],
  code: string,
  excludeId?: CardId,
): Card | undefined {
  const needle = code.trim();
  if (!needle) return undefined;
  return cards.find((card) => card.id !== excludeId && card.code === needle);
}
