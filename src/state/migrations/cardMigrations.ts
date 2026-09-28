import type { MigrationRegistry } from '../../domain/migration';

export const CARD_STORE_VERSION = 1;

/** Key = target version (migrates N-1 -> N); v1 is the initial schema, hence a no-op. */
export const cardMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
};
