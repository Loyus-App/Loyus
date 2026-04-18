import type { MigrationRegistry } from '../../domain/migration';

/** Current schema version for the card store. */
export const CARD_STORE_VERSION = 1;

/**
 * Card store migration registry.
 * Each key is the target version; the function migrates from version-1 to that version.
 * v0 -> v1: no-op (initial schema).
 */
export const cardMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
};
