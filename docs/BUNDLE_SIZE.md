# Bundle Size — Loyus v0.1.0

**Measured:** 2026-04-17
**Tooling:** `npx expo export --platform <ios|android>`
**Hermes:** enabled (default on SDK 55)
**Target (plan 06-03):** ≤ 1.2 MB gzipped JS bytecode
**Status:** **OVER BUDGET** (iOS 2.27 MB gz, Android 2.31 MB gz)

## Measurement

| Platform | Raw bytecode | Gzipped  | Target   | Over by |
|----------|--------------|----------|----------|---------|
| iOS      | 5.6 MB (.hbc)| 2.27 MB  | 1.2 MB   | +89 %   |
| Android  | 5.7 MB (.hbc)| 2.31 MB  | 1.2 MB   | +93 %   |

Total `dist/` (bundle + bundled assets): **9.4 MB iOS / 16 MB Android**. The Android delta comes from vendor icon fonts (see below).

Commands used:
```bash
npx expo export --platform ios --output-dir dist
gzip -c dist/_expo/static/js/ios/*.hbc | wc -c

npx expo export --platform android --output-dir dist-android
gzip -c dist-android/_expo/static/js/android/*.hbc | wc -c
```

## Top contributors (estimated)

1. **`@expo/vector-icons`** — bundles the full Ionicons + MaterialCommunityIcons + FontAwesome6 families. Largest single source of bloat (MaterialCommunityIcons.ttf alone = 1.3 MB, bundled per platform).
2. **`react-native-vision-camera`** + `react-native-worklets-core` — code scanner + worklets runtime.
3. **`react-native-reanimated`** — heavy but unavoidable on New Architecture.
4. **`expo-router`** — file-based routing, pulls react-navigation stack + tabs.
5. **`react-native-svg`** + `@kichiyaki/react-native-barcode-generator` + `react-native-qrcode-svg` — barcode rendering stack.

## Reduction candidates (not blocking v0.1)

- **Replace `@expo/vector-icons` with per-icon imports** (or `lucide-react-native`): shipping only the glyphs used (~30) instead of 9 full font families would cut ~3 MB of assets and ~100 KB of JS registry code.
- **Drop unused font weights** from Inter/Manrope (we ship 9 files; audit which are actually referenced at runtime).
- **Tree-shake `expo-router`** unused modules — v55 already does some of this, but a `expo export --dev false --analyze` pass may surface leftover dev-only paths.
- **Lazy-load the scan pipeline**: `react-native-vision-camera` could be code-split behind the Scan tab route if Metro/Expo ever supports true RN lazy chunks (SDK 55 does not).

## Decision

**Ship v0.1 over budget.** The 1.2 MB target was aspirational; v0.1 is a single-feature wallet, not a size-sensitive shell. Reduction work is tracked for v0.2 in the reduction candidates list above. Users on Cellular see one-time download only — native binary size (iOS `.ipa`, Android `.aab`) is what the stores measure, not JS bundle.

## Native binary size — to be measured pre-submission

Run after `eas build --profile production`:

- iOS: inspect `.ipa` size from EAS build artifacts page.
- Android: inspect `.aab` size + use `bundletool` to measure per-split APK sizes (user download budget is split APK, not AAB).

Fill in below once builds are available:

| Platform | Binary | Size | Google Play target | Apple target |
|----------|--------|------|--------------------|--------------|
| iOS      | .ipa   | TBD  | —                  | < 200 MB uncompressed (Apple hard limit is 4 GB but < 100 MB avoids "cellular download warning") |
| Android  | split APK | TBD | < 150 MB (Play hard limit) | — |
