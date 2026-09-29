---
paths:
  - "src/ui/**"
  - "src/app/**"
---

# UI Layer Rules

## Structure

- Routes in `src/app/` (Expo Router); card routes are root Stack siblings of `(tabs)` (modals)
- Tabs: `NativeTabs` in `src/app/(tabs)/_layout.tsx`, one Stack per tab; tab roots render `TabScreen` (large title and action on one row, right under the status bar). Search keeps an empty native header for `Stack.SearchBar` and uses `pinnedTitle`
- Other stack screens keep `tabStackOptions` headers → scroll views use `contentInsetAdjustmentBehavior="automatic"`
- Header buttons and menus: `Stack.Toolbar` inside the screen; never import `@react-navigation/*`
- Components are presentational; logic lives in stores and domain helpers
- Primitives (`src/ui/primitives`) before new components; card visuals via `CardTile` / `CardThumb`; card actions via `src/ui/utils/cardActions.ts`

## Styling

- Unistyles v3 only: `import { StyleSheet } from 'react-native-unistyles'`, styles at module level below the component
- Theme tokens only (`theme.colors`, `theme.space()`, `theme.radius`, `theme.typography`); no raw hex in components
- Barcode panel: `theme.barcode.paper` / `theme.barcode.ink` (white/black in both themes); scanner: `theme.scanner.*`
- Barcode size comes from `layoutSymbol` (`src/domain/barcodeLayout.ts`): GS1 X-dimension range, quiet zones and bar heights, modules snapped to device pixels. Don't size codes by hand
- Card fills: `cardColorOf(card)` + `textOnCard(fill)` (keeps AA); gradients via `GradientLayer` + `subtleGradient`
- Brand logos: `brandLogo(card.brandId)` + `BrandPlate` (tile) / `BrandFill` (thumb); initials are the fallback. Never rasterize the SVGs
- Motion tokens from `src/ui/theme/motion.ts`: functional only, no bounce, Reduce Motion respected
- Liquid Glass: `IconButton variant="glass"` (`expo-glass-effect`, iOS 26+, falls back to `raised`) for custom-header actions; native toolbar buttons get glass on their own

## i18n

- All user-facing strings via `t('section.key')`; keys are typed against `en.ts`

## Navigation

- `useFocusEffect` from `expo-router` for screen-level effects (brightness, keep awake, `recordOpen`)
- "+" opens the scanner first; manual entry is one tap away inside it

## Accessibility

- `testID` values from `src/ui/testIds.ts` via `tid()` (E2E builds only)
- Localized `accessibilityLabel`s; ≥ 44 pt targets; Dynamic Type friendly
