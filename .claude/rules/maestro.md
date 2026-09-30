---
paths:
  - ".maestro/**"
---

# Maestro E2E Rules

## Structure

- All flows in `.maestro/` at repo root
- Shared reusable flows in `.maestro/shared/` (e.g., `launch-fresh.yaml`)
- `runFlow: shared/launch-fresh.yaml` at start of every flow

## Selectors

- Use testID selectors from `src/ui/testIds.ts` constants where one exists, NOT text matchers
- Reference testID values by their `id:` property in Maestro YAML
- Several elements are native-only and have no testID -- select these by their (localized,
  English-build) visible text or accessibility label instead:
  - `NativeTabs` bar items (`tab-cards`/`tab-settings`/`tab-search` testIDs exist on the
    triggers but are unconfirmed to surface as accessibility identifiers on iOS native
    tabs) -- prefer `tapOn: text: "Cards"` / `"Settings"` / `"Search"`
  - Checkout header buttons (`Stack.Toolbar`) -- "Close card", "More actions"
  - The "More actions" menu and the grid/list long-press action sheet -- "Pin to top" /
    "Unpin", "Edit", "Share", "Delete", "Cancel"
  - Native `Alert` confirmations (e.g. delete) -- "Delete this card?", "Delete"
  - `OptionSheet` rows (sort menu, format picker) -- tapping the option's label text both
    selects it and closes the sheet
  - The Search tab's native `Stack.SearchBar` has no testID; it autofocuses, but tap its
    placeholder text once before typing to make sure focus landed on it

## Timing

- `extendedWaitUntil` with 15s timeout instead of `sleep` for wait conditions
- Never use fixed sleeps -- always wait on visible/enabled conditions

## App Configuration

- appId: `com.loyus.app` (from app.config.ts `ios.bundleIdentifier`)
- E2E builds use `EXPO_PUBLIC_E2E=true` build flag

## Running

- Run all: `yarn test:e2e` (wraps `bash scripts/test-e2e.sh`)
- Single flow: `maestro test .maestro/<flow>.yaml`
- Studio: `yarn test:e2e:studio`

## Data Injection

- E2E-gated deep-link prefill via `useLocalSearchParams` for captureStore injection
  (`loyus:///card/confirm?code=<code>&format=<FORMAT>`, `FORMAT` matches a `BarcodeFormat`
  enum value from `src/domain/card.ts`, e.g. `EAN13`, `QR_CODE`)
- No `EXPO_PUBLIC_E2E` in Maestro env headers -- it is a build-time flag only

## Parameterized Shared Flows

- Shared flows can take parameters via `runFlow: { file: ..., env: { KEY: "value" } }`,
  referenced inside the shared flow as `${KEY}` (see `shared/add-card-manual.yaml`)
- Use `runFlow: { when: { visible: ... } | { notVisible: ... }, commands: [...] }` to branch
  on which state a screen is in (e.g. empty vs populated Home) instead of duplicating a flow
  per state
- The camera is unavailable on the iOS Simulator (`useCameraDevice` returns `undefined`), so
  the scanner always falls back to its "No camera available" screen in CI -- flows that need
  a card on screen should go through that fallback's manual entry, not assume a live camera
