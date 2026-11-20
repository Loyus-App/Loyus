# Loyus

Offline-first loyalty-card wallet for iOS/Android. Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6 strict (Expo SDK 58 expects ~6.0; TypeScript 7 ships no JS API or `tsserver`). Yarn 4 (Corepack, `nodeLinker: node-modules`).

## Build and Run

```bash
yarn ios              # Dev build for iOS (no Expo Go)
yarn android          # Dev build for Android
yarn check:fix        # oxlint --fix, then oxfmt
yarn typecheck        # TypeScript strict (tsc --noEmit)
yarn test             # Jest unit tests
yarn test:e2e         # Maestro E2E flows
```

## Architecture (feature slices, strict boundaries)

```
src/
├── app/        Expo Router routes and layouts only
├── boot/       startup (Unistyles config, i18n, appearance), loaded by index.ts before the router
├── features/   one folder per user capability: library, checkout, scan, card-editor, settings, backup, shortcuts
├── entities/   business objects shared by features: card, barcode, brand, settings
└── shared/     no business notion: ui, theme, i18n, storage, platform, lib, testing
```

- Layers import downward only: `app` / `boot` → `features` → `entities` → `shared`
- A feature never imports another feature: the route composes them (callbacks or elements as props)
- Entities import each other without cycles (`card` → `barcode`, `brand`; `settings` → `card`)
- Inside a slice, segments keep the layer rules:

| Segment   | Allowed imports                                                          |
|-----------|--------------------------------------------------------------------------|
| `domain/` | other `domain/` folders and `shared/lib` only; pure TS, zero RN/Expo/React/Zustand |
| `state/`  | anything but `ui/` (Zustand stores, selectors, migrations)               |
| `infra/`  | `domain/`, `shared`, native modules; never `state/` or `ui/`             |
| `ui/`     | anything the layer rules allow                                           |

- Imports inside a slice (`entities/card`, `shared/ui`…) are relative; imports across slices use `@/…`
- No barrel files except `shared/ui/primitives` and `shared/theme`
- Folders kebab-case; components PascalCase, modules camelCase, hooks `useX`; tests in `__tests__/` next to the code
- Size caps (oxlint): 200 lines per file, 80 per function; generated files, locales and tests are exempt
- Enforced by `src/__tests__/architecture.test.ts` (layers, slices, segments, purity, entity cycles) and oxlint `import/no-cycle`
- Components are pure presentational -- no business logic, no direct persistence
- Logic lives in Zustand stores (one per bounded concern)
- Store subscriptions via selectors only (never whole-store)

## Linting and formatting (OXC: oxlint + oxfmt)

- Run: `yarn check:fix` (`oxlint --fix && oxfmt`); CI runs `yarn check`
- Config: `.oxlintrc.json` (type-aware rules through `oxlint-tsgolint`) and `.oxfmtrc.json` at repo root; both cover `src/` and `__mocks__/` only
- Lint exceptions go in `.oxlintrc.json` `overrides`, never in `oxlint-disable` comments
- NEVER suggest ESLint, Prettier, Biome, or eslint-* packages

## Conventions

- TypeScript strict: `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- No `any` in app code (`typescript/no-explicit-any`: error in oxlint)
- Optional fields: `field?: T | undefined`
- Spread conditionally: `...(val !== undefined ? { field: val } : {})`
- Branded types for IDs: `CardId = string & { readonly [Brand]: typeof Brand }`
- Readonly interfaces for domain types
- `import type` for type-only imports (enforced by oxlint `typescript/consistent-type-imports`)

## i18n

- All user-facing strings wrapped in `t('section.key')` via react-i18next
- Locale files in `src/shared/i18n/locales/` (en, fr, es, pt, ru, de)
- Synchronous init (`initImmediate: false`) -- no async flash
- When adding a string: add key to ALL 6 locale files

## Design (see `docs/DESIGN_RESEARCH.md`)

- Neutral, calm UI: colour comes only from the card tiles (brand colours); the accent is for controls
- The barcode is always black on a white panel, even in dark mode
- System font, type scale 34 / 28 / 20 / 16 / 15 / 13 / 12; body text 16; targets ≥ 44 pt; AA contrast (tested)
- Native navigation: `NativeTabs` (Cards, Settings, Search `role="search"`), native large-title headers, `Stack.Toolbar` for header buttons and menus
- Icons: SF Symbols / Material Symbols through `expo-symbols` (`icons` in `src/shared/ui/primitives/icons.ts`)
- Store brands: `assets/brands/*.svg` + `brands.json` → `yarn brands:build` regenerates `src/entities/brand/domain/generated/catalog.ts` (names, aliases, markets, colors, logo framing) and `src/entities/brand/ui/generated/logos.ts`. Logos stay SVG: Metro loads `.svg` as strings (`scripts/svgTransformer.js`), `BrandPlate` / `BrandFill` draw them, `cardColorOf` falls back to the brand color
- App icons: themes in `src/entities/settings/domain/appIcon.ts` (default `night`), sources `assets/app-icon/<theme>.svg` + `monochrome.svg` → `yarn icons:build` (needs `rsvg-convert` + ImageMagick) regenerates `assets/images/app-icons/` (iOS light/dark/tinted, Android layers, thumbnails) and the splash icon. Alternates switch through `expo-alternate-app-icons` (Settings › Appearance › App icon); native changes need a prebuild
- Design-system primitives in `src/shared/ui/primitives` (`Text`, `Button`, `ListSection`, `ListRow`, `TextField`…); card visuals in `src/entities/card/ui`; screen parts in `src/features/<feature>/ui`

## Styling (Unistyles 3.x)

- `import { StyleSheet } from 'react-native-unistyles'` directly; never from `react-native` and never re-exported
- `src/boot/unistyles.ts` only configures themes; `index.ts` loads it (via `src/boot/index.ts`) before the router
- `StyleSheet.create((theme, rt) => …)` at module level; variants + `styles.useVariants`; `rt.insets` for safe areas
- Tokens only: `theme.colors.*`, `theme.space(n)`, `theme.radius.*`, `theme.typography.*`, `theme.barcode.*`, `theme.scanner.*`
- `withUnistyles` for non-style props; `useUnistyles()` only in leaf components or navigation options
- Theme changes go through `setThemePreference` (`src/entities/settings/ui/preference.ts`), which also syncs `Appearance`; theme and accent switches run inside `crossfadeWindow` (`src/shared/platform/crossfade.ts`): on iOS the local module `modules/window-crossfade` covers the window with a snapshot and fades it out once React is idle, so native and React Native parts change together (Android switches instantly)

## State (Zustand 5 + MMKV)

- Stores: `cardStore` (`entities/card`), `settingsStore` (`entities/settings`), `captureStore` (`entities/barcode`), `uiStore` (`shared/ui`)
- MMKV persistence via `createJSONStorage(() => mmkvStateStorage)`
- `partialize` to exclude actions from persistence
- Schema versioning with `version` + `migrate` callback using domain `runMigrations`
- `expo-crypto` `randomUUID()` for ID generation (not Math.random or uuid)

## Testing

- Jest 30 + jest-expo; Expo-managed versions (jest, jest-expo, react, react-native…) follow `npx expo install --check`
- `jest.config.js` (not .ts, avoids ts-node dependency)
- No snapshot tests -- use RNTL assertions
- Domain: >= 80% coverage, zero RN imports
- Unistyles and Reanimated use their official mocks (`jest.setup.ts`); `__mocks__/` covers mmkv, expo-crypto, nitro-modules, vision-camera, expo-alternate-app-icons
- Shared test fixture: `makeCard` in `src/entities/card/testing/makeCard.ts`
- Maestro E2E in `.maestro/` (shared flows in `.maestro/shared/`)

## Commit Style

- Conventional commits: `type(scope): message`
- Types: feat, fix, test, docs, refactor, chore
- Scope = phase number or feature area
