import { type Card, type CardId, isBarcodeFormat } from './card';

export const SERIALIZER_VERSION = 2;

interface SerializedData {
  readonly version: number;
  readonly exportedAt: string;
  readonly cards: readonly Card[];
}

type Fields = Readonly<Record<string, unknown>>;

type Guard<T> = (value: unknown) => value is T;

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const isRecord = (value: unknown): value is Fields =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const isFilled = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '';

const isTime = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && HEX_COLOR.test(value);

function portableCard(card: Card): Card {
  const { photos: _photos, ...rest } = card;
  return rest;
}

export function serializeCards(cards: readonly Card[], exportedAt: Date = new Date()): string {
  const data: SerializedData = {
    version: SERIALIZER_VERSION,
    exportedAt: exportedAt.toISOString(),
    cards: cards.map(portableCard),
  };
  return JSON.stringify(data, null, 2);
}

function parseJson(json: string): unknown {
  try {
    return JSON.parse(json) as unknown;
  } catch {
    throw new Error('Invalid JSON');
  }
}

function extractCardArray(parsed: unknown): readonly unknown[] {
  if (!(isRecord(parsed) && typeof parsed.version === 'number')) {
    throw new Error('Missing or invalid version header');
  }
  if (!Array.isArray(parsed.cards)) {
    throw new Error('Missing cards array');
  }
  return parsed.cards;
}

function required<T>(fields: Fields, index: number, field: string, valid: Guard<T>): T {
  const value = fields[field];
  if (value === undefined) {
    throw new Error(`Card at index ${index} missing required field: ${field}`);
  }
  if (!valid(value)) {
    throw new Error(`Card at index ${index} has an invalid field: ${field}`);
  }
  return value;
}

function optional<T>(value: unknown, valid: Guard<T>): T | undefined {
  return valid(value) ? value : undefined;
}

function readCard(raw: unknown, index: number): Card {
  if (!isRecord(raw)) {
    throw new Error(`Card at index ${index} is not an object`);
  }
  const field = <T>(name: string, valid: Guard<T>): T => required(raw, index, name, valid);
  const id = field('id', isFilled) as CardId;
  const name = field('name', isFilled);
  const code = field('code', isFilled);
  const format = field('format', isBarcodeFormat);
  const createdAt = field('createdAt', isTime);
  const updatedAt = field('updatedAt', isTime);
  const color = optional(raw.color, isHexColor);
  const brandId = optional(raw.brandId, isFilled);
  const owner = optional(raw.owner, isFilled);
  const note = optional(raw.note, isFilled);
  const barcodeRotated = optional(raw.barcodeRotated, isBoolean);
  const lastOpenedAt = optional(raw.lastOpenedAt, isTime);
  return {
    id,
    name,
    code,
    format,
    ...(color === undefined ? {} : { color }),
    ...(brandId === undefined ? {} : { brandId }),
    ...(owner === undefined ? {} : { owner }),
    ...(note === undefined ? {} : { note }),
    isPinned: isBoolean(raw.isPinned) ? raw.isPinned : raw.isFavorite === true,
    ...(barcodeRotated === undefined ? {} : { barcodeRotated }),
    openCount: isCount(raw.openCount) ? raw.openCount : 0,
    ...(lastOpenedAt === undefined ? {} : { lastOpenedAt }),
    createdAt,
    updatedAt,
  };
}

export function deserializeCards(json: string): Card[] {
  return extractCardArray(parseJson(json)).map(readCard);
}
