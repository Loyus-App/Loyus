# Loyus

Offline-first loyalty-card wallet for iOS/Android. Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6 strict. Yarn 4 (Corepack, `nodeLinker: node-modules`).

## Build and Run

```bash
yarn ios              # Dev build for iOS (no Expo Go)
yarn android          # Dev build for Android
yarn check:fix        # Biome lint + format (biome check --write)
yarn typecheck        # TypeScript strict (tsc --noEmit)
yarn test             # Jest unit tests
yarn test:e2e         # Maestro E2E flows
```

## Architecture (4-layer, strict boundaries)

| Layer  | Path          | Allowed Imports                         |
|--------|---------------|-----------------------------------------|
| Domain | `src/domain/` | stdlib only (zero RN/Expo imports)      |
| State  | `src/state/`  | domain, infra/persistence               |
| Infra  | `src/infra/`  | domain, expo/RN native modules          |
| UI     | `src/ui/`, `src/app/` | state (via selectors), domain types |

- Components are pure presentational -- no business logic, no direct persistence
- Logic lives in Zustand stores (one per bounded concern)
- Store subscriptions via selectors only (never whole-store)
- Domain layer enforced by `src/domain/__tests__/architecture.test.ts`

## Linting (Biome.js, NOT ESLint)

- Run: `yarn check:fix` (biome check --write)
- Config: `biome.json` at repo root
- NEVER suggest ESLint, Prettier, or eslint-* packages

## Conventions

- TypeScript strict: `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- No `any` in app code (noExplicitAny: error in Biome)
- Optional fields: `field?: T | undefined`
- Spread conditionally: `...(val !== undefined ? { field: val } : {})`
- Branded types for IDs: `CardId = string & { readonly [Brand]: typeof Brand }`
- Readonly interfaces for domain types
- `import type` for type-only imports (enforced by Biome useImportType)

## i18n

- All user-facing strings wrapped in `t('section.key')` via react-i18next
- Locale files in `src/infra/i18n/locales/` (en, fr, es, pt, ru, de)
- Synchronous init (`initImmediate: false`) -- no async flash
- When adding a string: add key to ALL 6 locale files

## Design (see `docs/DESIGN_RESEARCH.md`)

- Neutral, calm UI: colour comes only from the card tiles (brand colours); the accent is for controls
- The barcode is always black on a white panel, even in dark mode
- System font, type scale 34 / 28 / 20 / 16 / 15 / 13 / 12; body text 16; targets ≥ 44 pt; AA contrast (tested)
- Native navigation: `NativeTabs` (Cards, Settings, Search `role="search"`), native large-title headers, `Stack.Toolbar` for header buttons and menus
- Icons: SF Symbols / Material Symbols through `expo-symbols` (`icons` in `src/ui/primitives/icons.ts`)
- Store brands: `assets/brands/*.svg` + `brands.json` → `yarn brands:build` regenerates `src/domain/brandCatalog.ts` (names, aliases, markets, colors, logo framing) and `src/ui/brands/brandLogos.ts`. Logos stay SVG: Metro loads `.svg` as strings (`scripts/svgTransformer.js`), `BrandPlate` / `BrandFill` draw them, `cardColorOf` falls back to the brand color
- Design-system primitives in `src/ui/primitives` (`Text`, `Button`, `ListSection`, `ListRow`, `TextField`…); Loyus components in `src/ui/components`

## Styling (Unistyles 3.x)

- `import { StyleSheet } from 'react-native-unistyles'` directly; never from `react-native` and never re-exported
- `src/ui/theme/unistyles.ts` only configures themes; `index.ts` loads it (via `src/ui/boot.ts`) before the router
- `StyleSheet.create((theme, rt) => …)` at module level; variants + `styles.useVariants`; `rt.insets` for safe areas
- Tokens only: `theme.colors.*`, `theme.space(n)`, `theme.radius.*`, `theme.typography.*`, `theme.barcode.*`, `theme.scanner.*`
- `withUnistyles` for non-style props; `useUnistyles()` only in leaf components or navigation options
- Theme changes go through `setThemePreference` (`src/ui/theme/preference.ts`), which also syncs `Appearance`

## State (Zustand 5 + MMKV)

- Stores: cardStore, settingsStore, uiStore, captureStore
- MMKV persistence via `createJSONStorage(() => mmkvStateStorage)`
- `partialize` to exclude actions from persistence
- Schema versioning with `version` + `migrate` callback using domain `runMigrations`
- `expo-crypto` `randomUUID()` for ID generation (not Math.random or uuid)

## Testing

- Jest 29 + jest-expo (NOT Jest 30 -- breaking import scope changes)
- `jest.config.js` (not .ts, avoids ts-node dependency)
- No snapshot tests -- use RNTL assertions
- Domain: >= 80% coverage, zero RN imports
- Unistyles and Reanimated use their official mocks (`jest.setup.ts`); `__mocks__/` covers mmkv, expo-crypto, nitro-modules, netinfo, vision-camera
- Shared test fixture: `makeCard` in `src/testing/makeCard.ts`
- Maestro E2E in `.maestro/` (shared flows in `.maestro/shared/`)

## Commit Style

- Conventional commits: `type(scope): message`
- Types: feat, fix, test, docs, refactor, chore
- Scope = phase number or feature area
