---
name: new-screen
description: >-
  Scaffold a new screen with Expo Router file-based route, styled component,
  and i18n keys. Use when adding a new page or tab to the app.
disable-model-invocation: true
---

# Scaffold a new screen

Create a new screen named "$ARGUMENTS" with all required wiring:

## 1. Route file (src/app/)

- Tab root: `src/app/(tabs)/<tab>/index.tsx` inside that tab's Stack (`tabStackOptions`); register the trigger in `src/app/(tabs)/_layout.tsx` (`NativeTabs.Trigger` with `sf` + `md` icons and an i18n label)
- Pushed screen inside a tab: `src/app/(tabs)/<tab>/<screen>.tsx` + a `<Stack.Screen>` in that tab's `_layout.tsx`
- Modal: `src/app/<feature>/<screen>.tsx` + a `<Stack.Screen>` in `src/app/_layout.tsx` with `modalOptions`
- Header buttons and menus: `Stack.Toolbar` inside the screen
- Scroll views under a transparent header: `contentInsetAdjustmentBehavior="automatic"`

## 2. UI

- Build from `src/ui/primitives` (`Text`, `ListSection`, `ListRow`, `Button`, `TextField`, `EmptyState`…) and `src/ui/components`
- `import { StyleSheet } from 'react-native-unistyles'`; `StyleSheet.create((theme, rt) => …)` below the component; tokens only
- Strings through `useTranslation()`; no comments except a rare one-line WHY

## 3. i18n (src/infra/i18n/locales/)

- Add keys to `en.ts` first (keys are typed), then to fr, es, pt, ru, de

## 4. testIDs (src/ui/testIds.ts)

- Add keys for interactive elements; use `tid('key')` in the screen

## 5. Verify

```bash
yarn check:fix && yarn typecheck && yarn test
```
