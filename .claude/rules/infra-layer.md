---
paths:
  - "src/infra/**"
---

# Infrastructure Layer Rules

## Purpose

Bridge between domain logic and platform capabilities. May import domain types and expo/RN native modules.

## Environment Variables

- All `EXPO_PUBLIC_*` reads centralized in `src/infra/env.ts` -- no direct `process.env` reads elsewhere
- `EXPO_PUBLIC_E2E` build flag for E2E test mocking (Appearance)
- `EXPO_PUBLIC_E2E_THEME` forces color scheme in E2E builds

## Camera

- react-native-vision-camera 5 (Nitro). Scanning is split per platform in `src/ui/hooks/useScanOutput.{ios,android}.ts`:
  - iOS: native object output (`useObjectOutput`, AVFoundation) — the object output does not exist on Android
  - Android: ML Kit via `react-native-vision-camera-barcode-scanner`, excluded from iOS autolinking in `package.json` (ML Kit has no iOS simulator slices)
- Format mapping for both platforms lives in `src/infra/camera/formatMap.ts`
- VisionCamera 5 has no config plugin: `NSCameraUsageDescription` is in `ios.infoPlist` and the CAMERA permission in `android.permissions` (`app.config.ts`)
- `useRef`-based state in scan handler (not useState) to avoid re-renders from high-frequency callbacks

## Barcode Rendering

- 1D formats: `@kichiyaki/react-native-barcode-generator`
- QR codes: `react-native-qrcode-svg`
- Exotic 2D formats: text fallback
- Cast `JSBARCODE_FORMAT` as `Format` type for @kichiyaki type union compatibility

## File System

- expo-file-system SDK 55 class-based API (`File`, `Paths`) -- not legacy `writeAsStringAsync`

## Persistence

- MMKV adapter in `src/infra/persistence/`
- Custom 12-line StateStorage adapter for Zustand (not zustand-mmkv-storage package)

## Network

- Network info mocked via `EXPO_PUBLIC_E2E` flag for deterministic E2E tests
