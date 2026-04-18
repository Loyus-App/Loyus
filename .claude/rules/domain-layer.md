---
paths:
  - "src/domain/**"
---

# Domain Layer Rules

## Purity Constraint

Zero React Native, Expo, Zustand, or React imports allowed in `src/domain/`.
Enforced by `src/domain/__tests__/architecture.test.ts` (scans all domain files for forbidden import patterns).

Allowed: pure TypeScript, stdlib, `node:crypto` in tests only.

## Type Patterns

- **Branded types** for IDs: `CardId = string & { readonly [Brand]: typeof Brand }`
- **BarcodeFormat** is an `enum` (not a string union)
- **Readonly interfaces** for all domain types (`readonly` on every property)
- **Optional fields** use `field?: T | undefined` pattern (exactOptionalPropertyTypes)
- **Conditional spread** for optional fields: `...(val !== undefined ? { field: val } : {})`

## Function Patterns

- Factory functions (`createCard`, `createCardId`) return fully typed objects
- Pure functions: `validateBarcode`, `searchCards`, `sortCards`, `runMigrations`
- No side effects, no I/O, no state management
- All functions are deterministic (except timestamp via `Date.now()` in factories)
