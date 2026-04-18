---
paths:
  - "**/*.test.*"
  - "**/__tests__/**"
  - "jest.config.*"
---

# Testing Rules

## Framework

- Jest 29 + jest-expo (NOT Jest 30 -- breaking import scope changes)
- `jest.config.js` (not .ts, avoids ts-node dependency)
- No snapshot tests -- use RNTL assertions for component output

## Mocks

- Mocks in `__mocks__/` for: unistyles, mmkv, expo-crypto, nitro-modules, netinfo
- Unistyles mock matches 3.2.x `StyleSheet` API
- MMKV mock uses in-memory Map for synchronous get/set

## Transform Patterns

- pnpm `transformIgnorePatterns`: `node_modules/(?!(.pnpm/[^/]+/node_modules/)?(pkg))` handles both npm and pnpm layouts

## Domain Tests

- Zero RN imports (enforced by architecture.test.ts)
- >= 80% coverage threshold (lines, functions, statements)
- Pure functions: test input/output, no mocks needed

## Store Tests

- One test per public action and selector
- `simulateColdRestart` pattern: snapshot MMKV before clearing Zustand state to verify persistence
- `as unknown as NetInfoState` for E2E fake objects (strict TS compatibility)

## Coverage

- `collectCoverageFrom`: `src/**/*.{ts,tsx}` excluding `.d.ts` and barrel `index.ts`
- Domain coverage threshold enforced in jest.config.js
