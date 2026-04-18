---
paths:
  - "src/state/**"
---

# State Layer Rules

## Zustand 5 + MMKV Persistence

- Use `create()` from zustand with `persist` middleware + `createJSONStorage(() => mmkvStateStorage)`
- One store per bounded concern: `cardStore`, `settingsStore`, `uiStore`, `captureStore`
- `partialize`: exclude all actions, persist only data fields
- Schema versioning: `version` number + `migrate` callback using domain `runMigrations`

## Selectors

- Selectors live in `src/state/selectors/` -- never subscribe to whole-store
- Use `useShallow` for array/object selectors to prevent unnecessary rerenders
- Selector functions are pure and composable (e.g., `selectSortedCards`, `selectCardById`)

## ID Generation

- Use `expo-crypto` `randomUUID()` for card ID generation (not `Math.random` or `uuid` package)
- Cast result: `randomUUID() as CardId`

## Testing Patterns

- `simulateColdRestart` pattern: snapshot MMKV storage before clearing Zustand state to verify persistence survives cold restart (prevents persist subscriber overwrite race)
- One test per public action and selector
- Store tests import from store file directly, not through barrel exports
