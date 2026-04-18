// Domain migration registry — zero react-native / expo imports

/** Maps version numbers to migration functions. */
export type MigrationRegistry = Record<number, (state: unknown) => unknown>;

/**
 * Applies migrations sequentially from fromVersion+1 to toVersion.
 * Throws if a migration function is missing for any version in the range.
 * Returns state unchanged if fromVersion === toVersion.
 */
export function runMigrations(
  persisted: unknown,
  fromVersion: number,
  toVersion: number,
  registry: MigrationRegistry,
): unknown {
  let state = persisted;

  for (let v = fromVersion + 1; v <= toVersion; v++) {
    const migrate = registry[v];
    if (migrate === undefined) {
      throw new Error(`Missing migration function for version ${v}`);
    }
    state = migrate(state);
  }

  return state;
}
