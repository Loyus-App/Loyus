# RAM Profiling — Loyus v0.1.0

**Target (plan 06-03):** ≤ 120 MB iOS RSS, ≤ 150 MB Android RSS at idle with 50 cards seeded.
**Status:** methodology documented; measurements pending device build.

## Why this matters

Loyus is offline-first and stays backgrounded most of its life. Excessive RAM causes two visible problems: OS eviction (cold relaunch on next open = slow) and device-wide jank on low-end Androids. The figures below are the ceiling we want to stay under at rest, not peak.

## iOS methodology (Xcode Instruments)

1. Build a release profile on-device:
   ```bash
   eas build --profile production --platform ios --local
   # or
   npx expo prebuild --clean && npx expo run:ios --configuration Release
   ```
2. Install on a mid-range device (iPhone 12 or later).
3. Launch **Xcode → Open Developer Tool → Instruments → Allocations** template.
4. Choose the Loyus process as target, Record.
5. Seed the store by adding 50 cards (or long-press the E2E seed button if you enable `EXPO_PUBLIC_E2E` in a local build).
6. Navigate: Home → scroll full list → open 3 different cards → back to Home.
7. Wait 30 s idle on Home.
8. Read **Persistent Bytes** (live heap) and **Resident Memory** (RSS) columns.
9. Record the idle steady-state number and the peak during navigation.

Extra passes:
- **Leaks instrument**: run alongside Allocations; zero retained cycles expected.
- **Time Profiler**: quick sanity pass to ensure no hot loop in JS when idle.

## Android methodology (Android Studio Profiler)

1. Build release:
   ```bash
   eas build --profile production --platform android --local
   ```
2. Install on a Pixel 6 or equivalent.
3. **Android Studio → View → Tool Windows → Profiler**.
4. Attach to the `com.loyus.app` process.
5. Select the Memory profiler, click Record (Java/Kotlin allocations + Native).
6. Repeat the same user journey as iOS (seed 50 cards, scroll, open 3 cards, return).
7. Wait 30 s idle.
8. Record **Java/Kotlin**, **Native**, **Graphics**, **Code**, **Stack**, **Others** totals — sum = app RSS.

## Results

Fill in after measurement:

| Platform | Device      | OS    | RSS idle | RSS peak | Status |
|----------|-------------|-------|----------|----------|--------|
| iOS      | TBD         | TBD   | TBD MB   | TBD MB   | TBD    |
| Android  | TBD         | TBD   | TBD MB   | TBD MB   | TBD    |

## Common leaks to check

Loyus does not use any of the following in its critical path, but these are the standard suspects in an RN app — re-audit if numbers creep up:

- **FlashList / FlatList off-screen rendering**: we use `ScrollView` on Home (≤ 50 cards by design), so no virtualization overhead. If Home ever switches to FlashList, verify `estimatedItemSize` is accurate — wrong estimates cause over-rendering.
- **Event listener cleanup**: `useFocusEffect` in `app/card/[id].tsx` for Brightness restore — already returns a teardown closure. Verify no new `addListener` without `remove`.
- **Reanimated shared values**: none currently created at screen scope; verify any new worklet holds `useSharedValue` inside the component, not module scope.
- **Image caching**: Loyus ships zero remote images. Icon fonts are native assets, not managed by JS cache.
- **MMKV listeners**: `useMMKVStorage` pattern not used; we bridge through Zustand persist only. No per-subscription listener leaks.

## Re-measurement cadence

Re-run this checklist:
- Before every store submission.
- After any native-module addition (new Expo plugin, new lib with autolinked native code).
- After any change to Home screen that replaces `ScrollView` with a virtualized list.
