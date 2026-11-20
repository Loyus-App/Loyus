---
paths:
  - "**/*.test.*"
  - "**/__tests__/**"
  - "jest.config.*"
---

# Testing Rules

## Framework

- Jest 30 + jest-expo, at the versions `npx expo install --check` expects
- `jest.config.js` (not .ts, avoids ts-node dependency)
- No snapshot tests -- use RNTL assertions for component output

## Mocks

- Official Unistyles and Reanimated mocks in `jest.setup.ts`; `__mocks__/` for mmkv, expo-crypto, nitro-modules, vision-camera
- Unistyles mock matches 3.2.x `StyleSheet` API
- MMKV mock uses in-memory Map for synchronous get/set
- `jest.setup.ts` loads the Unistyles config, which pulls in `src/entities/settings/ui/preference.ts` and `src/shared/platform/crossfade.ts`: tests that mock modules under that chain call `jest.resetModules()` and `require` the subject afterwards (see `crossfade.test.ts`)

## Transform Patterns

- `transformIgnorePatterns`: `node_modules/(?!(pkg))` — Yarn uses a flat `node_modules` layout (`nodeLinker: node-modules`)

## Domain Tests

- Zero RN imports (enforced by architecture.test.ts)
- >= 80% coverage threshold (lines, functions, statements)
- Pure functions: test input/output, no mocks needed

## Store Tests

- One test per public action and selector
- `simulateColdRestart` pattern: snapshot MMKV before clearing Zustand state to verify persistence

## Coverage

- `collectCoverageFrom`: `src/**/*.{ts,tsx}` excluding `.d.ts` and barrel `index.ts`
- Domain coverage threshold enforced in jest.config.js
