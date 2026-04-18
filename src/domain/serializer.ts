// Domain serializer — zero react-native / expo imports

import type { Card } from './card';

/** Current serialization format version. */
export const SERIALIZER_VERSION = 1;

interface SerializedData {
  readonly version: number;
  readonly cards: Card[];
}

const REQUIRED_CARD_FIELDS: readonly (keyof Card)[] = [
  'id',
  'name',
  'code',
  'format',
  'isFavorite',
  'createdAt',
  'updatedAt',
];

/**
 * Serializes cards to a JSON string with a version header.
 */
export function serializeCards(cards: readonly Card[]): string {
  const data: SerializedData = {
    version: SERIALIZER_VERSION,
    cards: [...cards],
  };
  return JSON.stringify(data);
}

function parseJson(json: string): unknown {
  try {
    return JSON.parse(json) as unknown;
  } catch {
    throw new Error('Invalid JSON');
  }
}

function extractCardArray(parsed: unknown): unknown[] {
  if (
    parsed === null ||
    typeof parsed !== 'object' ||
    !('version' in parsed) ||
    typeof (parsed as Record<string, unknown>).version !== 'number'
  ) {
    throw new Error('Missing or invalid version header');
  }
  const data = parsed as Record<string, unknown>;
  if (!Array.isArray(data.cards)) {
    throw new Error('Missing cards array');
  }
  return data.cards as unknown[];
}

function validateCard(card: unknown, index: number): void {
  if (card === null || typeof card !== 'object') {
    throw new Error(`Card at index ${index} is not an object`);
  }
  const cardObj = card as Record<string, unknown>;
  for (const field of REQUIRED_CARD_FIELDS) {
    if (!(field in cardObj) || cardObj[field] === undefined) {
      throw new Error(`Card at index ${index} missing required field: ${field}`);
    }
  }
}

/**
 * Deserializes cards from a JSON string.
 * Validates version header and required card fields.
 * Throws on invalid input.
 */
export function deserializeCards(json: string): Card[] {
  const parsed = parseJson(json);
  const cards = extractCardArray(parsed);
  for (let i = 0; i < cards.length; i++) {
    validateCard(cards[i], i);
  }
  return cards as Card[];
}
