import { type MigrationRegistry, runMigrations } from '../migration';

describe('runMigrations', () => {
  it('returns state unchanged when fromVersion === toVersion', () => {
    const state = { cards: [] };
    const registry: MigrationRegistry = {};
    expect(runMigrations(state, 1, 1, registry)).toBe(state);
  });

  it('applies a no-op v0->v1 migration', () => {
    const state = { cards: ['a'] };
    const registry: MigrationRegistry = {
      1: (s: unknown) => s,
    };
    const result = runMigrations(state, 0, 1, registry);
    expect(result).toBe(state);
  });

  it('applies transformations sequentially v0->v2', () => {
    const state = { value: 0 };
    const registry: MigrationRegistry = {
      1: (s: unknown) => ({ ...(s as Record<string, unknown>), value: 1 }),
      2: (s: unknown) => ({ ...(s as Record<string, unknown>), value: 2, extra: true }),
    };
    const result = runMigrations(state, 0, 2, registry) as { value: number; extra: boolean };
    expect(result.value).toBe(2);
    expect(result.extra).toBe(true);
  });

  it('throws on missing migration function', () => {
    const registry: MigrationRegistry = {
      1: (s: unknown) => s,
      // missing 2
    };
    expect(() => runMigrations({}, 0, 2, registry)).toThrow(/migration.*2/i);
  });

  it('applies only migrations in range (skips earlier ones)', () => {
    const calls: number[] = [];
    const registry: MigrationRegistry = {
      1: (s: unknown) => {
        calls.push(1);
        return s;
      },
      2: (s: unknown) => {
        calls.push(2);
        return s;
      },
      3: (s: unknown) => {
        calls.push(3);
        return s;
      },
    };
    runMigrations({}, 1, 3, registry);
    expect(calls).toEqual([2, 3]);
  });
});
