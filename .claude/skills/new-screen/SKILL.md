---
name: new-screen
description: >-
  Scaffold a new screen with Expo Router file-based route, styled component,
  and i18n keys. Use when adding a new page or tab to the app.
disable-model-invocation: true
---

# Scaffold a new screen

Create a new screen named "$ARGUMENTS" with all required wiring:

## 1. Route file (app/)

- Create the route file following Expo Router file-based conventions
- For tabs: `app/(tabs)/screenname.tsx`
- For stack screens: `app/screenname.tsx` or `app/feature/screenname.tsx`
- Import `StyleSheet` from `src/ui/theme/unistyles` (NOT from `react-native`)
- Import `useUnistyles` for theme access
- Import `{ useTranslation }` from `react-i18next` for all user-facing strings
- Keep the route file under ~40 lines — delegate complex content to components

## 2. Component (src/ui/components/)

- Create if the screen has non-trivial content: `src/ui/components/{ScreenName}.tsx`
- Pure presentational — no business logic, no direct store access
- Props typed with `readonly` interface
- All user-visible strings wrapped in `t()`
- `StyleSheet.create()` from `src/ui/theme/unistyles`
- Keep under ~50 lines of TSX

## 3. i18n (src/infra/i18n/locales/)

- Add screen-related translation keys to ALL 6 locale files: en.ts, fr.ts, es.ts, pt.ts, ru.ts, de.ts
- Namespace: `screens.screenName.title`, `screens.screenName.description`, etc.

## 4. Navigation

- **Tab screen**: Add `<Tabs.Screen>` entry in `app/(tabs)/_layout.tsx` with icon and label
- **Stack screen**: Add `<Stack.Screen>` entry in `app/_layout.tsx` with options (title, headerShown, presentation)

## 5. testIDs (src/ui/testIds.ts)

- Add testID constants for the new screen's interactive elements
- Follow naming pattern: `screenName-element` (e.g., `settings-theme-toggle`)

## 6. Verify

```bash
pnpm check:fix && pnpm typecheck && pnpm test
```
