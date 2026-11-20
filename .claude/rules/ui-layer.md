---
paths:
  - "src/**/ui/**"
  - "src/app/**"
  - "src/boot/**"
  - "src/shared/theme/**"
---

# UI Layer Rules

## Structure

- Routes in `src/app/` (Expo Router); card routes are root Stack siblings of `(tabs)` (modals)
- Screen parts live in `src/features/<feature>/ui/`; a feature never imports another feature, the route composes them
- Tabs: `NativeTabs` in `src/app/(tabs)/_layout.tsx`, one Stack per tab; tab roots render `TabScreen` (large title and action on one row, right under the status bar). Search keeps an empty native header for `Stack.SearchBar` and uses `pinnedTitle`
- Other stack screens keep `tabStackOptions` headers → scroll views use `contentInsetAdjustmentBehavior="automatic"`
- Header buttons and menus: `Stack.Toolbar` inside the screen; never import `@react-navigation/*`
- Components are presentational; logic lives in stores and domain helpers
- Primitives (`src/shared/ui/primitives`) before new components; card visuals via `CardTile` / `CardThumb`; card actions via `src/entities/card/ui/cardActions.ts`

## Styling

- Unistyles v3 only: `import { StyleSheet } from 'react-native-unistyles'`, styles at module level below the component
- Theme tokens only (`theme.colors`, `theme.space()`, `theme.radius`, `theme.typography`); no raw hex in components
- Barcode panel: `theme.barcode.paper` / `theme.barcode.ink` (white/black in both themes); scanner: `theme.scanner.*`
- Barcode size comes from `layoutSymbol` (`src/entities/barcode/domain/barcodeLayout.ts`): GS1 X-dimension range, quiet zones and bar heights, modules snapped to device pixels. Don't size codes by hand
- Card fills: `cardColorOf(card)` + `textOnCard(fill)` (keeps AA); gradients via `GradientLayer` + `subtleGradient`
- Brand logos: `brandLogo(card.brandId)` + `BrandPlate` (tile) / `BrandFill` (thumb); initials are the fallback. Never rasterize the SVGs
- Motion tokens from `src/shared/theme/motion.ts`: functional only, no bounce, Reduce Motion respected
- Liquid Glass: `IconButton variant="glass"` (`expo-glass-effect`, iOS 26+, falls back to `raised`) for custom-header actions; native toolbar buttons get glass on their own
- Form sheets: `sheetOptions` from `src/shared/ui/stackOptions.ts`; on iOS 26+ the glass sheet owns its background, so sheet content paints none. Sheets sized to their content pad with `sheetBottomInset(rt.insets.bottom)`; scrolling sheets that can reach full height keep `rt.insets.bottom`
- Settings sub-screens wrap their content in `SettingsSubscreen`; app icons render through `AppIconImage`; app name/version come from `APP_INFO`
- Native controls on iOS through `@expo/ui/swift-ui`, one `.ios.tsx` file per component next to the React Native version Android keeps: `SortBar` (Menu + inline Picker for the sort; the grid/list `ViewModeToggle` stays visible), `FormatSection` (menu Picker), `SegmentedControl` (segmented Picker), `PhotoSlot` (Menu of photo actions), `CardLink` (ContextMenu with a `CardPeek` barcode preview). React Native content inside SwiftUI goes through `RNHostView matchContents` with an explicit width
- Don't use expo-router `Link.Preview` / `Link.Menu` for cards: its `display: contents` wrapper drops the tiles from the accessibility tree (VoiceOver and Maestro can't reach them); `CardLink` uses the SwiftUI `ContextMenu` instead

## i18n

- All user-facing strings via `t('section.key')`; keys are typed against `en.ts`

## Navigation

- `useFocusEffect` from `expo-router` for screen-level effects (brightness, keep awake, `recordOpen`)
- "+" opens the scanner first; manual entry is one tap away inside it

## Accessibility

- `testID` values from `src/shared/ui/testIds.ts` via `tid()` (E2E builds only)
- Localized `accessibilityLabel`s; ≥ 44 pt targets; Dynamic Type friendly
