[![E2E Tests](https://github.com/Loyus-App/Loyus/actions/workflows/e2e.yml/badge.svg)](https://github.com/Loyus-App/Loyus/actions/workflows/e2e.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

# Loyus

**Universal offline-first loyalty-card wallet for iOS and Android.**

Your loyalty cards from local bakeries, small shops, and independent stores don't fit in Apple Wallet or Google Wallet — they don't have a partner pass. Loyus does. Scan any barcode or QR code, store it locally, show it at checkout. No accounts, no tracking, no network calls.

## Why Loyus

- **Universal capture.** EAN-13, UPC-A, Code 128, Code 39, QR, Data Matrix, PDF417, Aztec. If your card has a code a camera can read, Loyus keeps it.
- **Private by design.** No analytics SDK, no tracking SDK, no crash-reporting SDK. No network calls on the critical path — CI-enforced by `src/domain/__tests__/noNetwork.test.ts`.
- **Offline-first.** The app works the same on the subway, in a parking garage, or in airplane mode, because it never connects to anything in the first place.
- **Accessible.** Full VoiceOver/TalkBack support, Dynamic Type, color-not-sole-signal.
- **Open source.** MIT licensed. Every privacy claim is auditable against the source.

## Architecture

Strict 4-layer separation, enforced by tests:

| Layer  | Path          | Allowed imports                  |
|--------|---------------|----------------------------------|
| Domain | `src/domain/` | stdlib only (zero RN/Expo)       |
| State  | `src/state/`  | domain, infra/persistence        |
| Infra  | `src/infra/`  | domain, Expo/RN native modules   |
| UI     | `src/ui/`, `app/` | state (via selectors), domain types |

- Domain purity enforced by `src/domain/__tests__/architecture.test.ts`
- No-network guarantee enforced by `src/domain/__tests__/noNetwork.test.ts`
- Components pure presentational, logic in Zustand stores

## Stack

- Expo SDK 55, React Native 0.83, React 19
- TypeScript strict (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Zustand 5 + MMKV for state + persistence
- Unistyles 3.x for theming (warm-tone palette, light/dark)
- react-native-vision-camera 4.7 for scanning
- Biome.js (not ESLint/Prettier)
- Jest 29 for unit, Maestro for E2E
- i18n: en, fr, es, pt, ru, de

## Develop

**Prerequisites:** Node 20+, pnpm 10+, Xcode 15+ (iOS) / Android Studio (Android), Maestro CLI 2.4.0 for E2E.

```bash
# Install
pnpm install

# Run on device/simulator
pnpm ios            # iOS dev build (no Expo Go)
pnpm android        # Android dev build

# Quality gates
pnpm check:fix      # Biome lint + format
pnpm typecheck      # tsc --noEmit
pnpm test           # Jest unit tests

# E2E
EXPO_PUBLIC_E2E=true npx expo run:ios   # build E2E flavor
pnpm test:e2e                            # run all Maestro flows
pnpm test:e2e:studio                     # interactive flow debugging
```

**E2E build flags:**
- `EXPO_PUBLIC_E2E=true` — mocks NetInfo + overrides Appearance for deterministic flows
- `EXPO_PUBLIC_E2E_THEME=dark` — force dark theme
- `EXPO_PUBLIC_E2E_OFFLINE=true` — force offline state

## CI

E2E tests run on every PR and push to `main` via GitHub Actions (`macos-15` + iOS simulator + Maestro 2.4.0) — see `.github/workflows/e2e.yml`. On failure, Maestro reports and screenshots upload as workflow artifacts (7-day retention).

## Privacy

See [PRIVACY_POLICY.md](./docs/PRIVACY_POLICY.md). Loyus collects nothing, shares nothing, and makes no network calls during normal operation. The privacy policy claims are backed by architectural tests — if a contributor adds `fetch()` on the critical path, CI fails.

## Contributing

Contributions welcome. Before opening a PR:

1. `pnpm check:fix && pnpm typecheck && pnpm test` must all pass
2. If you add a user-facing string, add it to **all 6** locale files (`src/infra/i18n/locales/`)
3. Domain layer stays pure (no RN/Expo imports)
4. No `any` in app code (Biome enforces)
5. Project conventions live in [CLAUDE.md](./CLAUDE.md) — read it before larger changes

## License

MIT — see [LICENSE](./LICENSE).
