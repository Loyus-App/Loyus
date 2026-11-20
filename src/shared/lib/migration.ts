export type MigrationRegistry = Record<number, (state: unknown) => unknown>;

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
