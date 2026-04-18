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

- Use testID selectors from `src/ui/testIds.ts` constants, NOT text matchers
- Reference testID values by their `id:` property in Maestro YAML

## Timing

- `extendedWaitUntil` with 15s timeout instead of `sleep` for wait conditions
- Never use fixed sleeps -- always wait on visible/enabled conditions

## App Configuration

- appId: `com.loyus.app` (from app.config.ts `ios.bundleIdentifier`)
- E2E builds use `EXPO_PUBLIC_E2E=true` build flag

## Running

- Run all: `pnpm test:e2e` (wraps `bash scripts/test-e2e.sh`)
- Single flow: `maestro test .maestro/<flow>.yaml`
- Studio: `pnpm test:e2e:studio`

## Data Injection

- E2E-gated deep-link prefill via `useLocalSearchParams` for captureStore injection
- No `EXPO_PUBLIC_E2E` in Maestro env headers -- it is a build-time flag only
