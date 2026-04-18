---
paths:
  - "src/ui/**"
  - "app/**"
---

# UI Layer Rules

## Component Principles

- Components are pure presentational -- no business logic, no direct persistence
- No component file should exceed ~50 lines of TSX
- File-based routing in `app/` directory (Expo Router)
- Card routes as root Stack siblings to `(tabs)` -- hides tab bar on detail/add/edit

## Styling

- Import `{ StyleSheet, useUnistyles }` from `src/ui/theme/unistyles` (re-export), NOT from `react-native-unistyles` directly
- All colors from `theme.colors`, all spacing from `theme.spacing` -- never hardcoded values
- Exception: `BarcodeErrorBoundary` uses plain RN `StyleSheet` (intentional, theme-independent)
- Exception: `#2D4739` hardcoded in barcode detail (always dark green regardless of theme)

## i18n

- All user-facing strings wrapped in `t()` from react-i18next
- When adding visible text, always use `t('section.key')` -- never raw string literals

## Navigation

- `useFocusEffect` for screen-level cleanup (brightness restore, etc.)
- After delete, navigate to `/(tabs)` instead of `router.back()` to avoid returning to deleted card

## Accessibility

- `testID` values from `src/ui/testIds.ts` constants (never inline strings)
- BarcodeRenderer `accessibilityLabel` describes card name, not barcode digits

## Typography

- Font: Manrope family from `@expo-google-fonts/manrope` (Regular, Medium, SemiBold, Bold, ExtraBold)
- ScrollView for home screen (heterogeneous layout, < 50 cards, not FlashList)
