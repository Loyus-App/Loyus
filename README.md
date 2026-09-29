<div align="center">

# Loyus

**Your loyalty cards, ready at the till.**<br />
Scan a card once, then show it in one tap, even offline.

![Platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android-8E8E93)
![Expo SDK 58](https://img.shields.io/badge/Expo-SDK%2058-000020?logo=expo&logoColor=white)
![React Native 0.88](https://img.shields.io/badge/React%20Native-0.88-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Offline first](https://img.shields.io/badge/offline-first-2EA44F)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/dark/01-home.webp" />
    <img src="docs/screenshots/light/01-home.webp" width="23%" alt="Cards, with pinned cards above the others" />
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/dark/04-checkout.webp" />
    <img src="docs/screenshots/light/04-checkout.webp" width="23%" alt="A card open at the till" />
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/dark/07-search.webp" />
    <img src="docs/screenshots/light/07-search.webp" width="23%" alt="Search with recently used cards" />
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/dark/08-settings.webp" />
    <img src="docs/screenshots/light/08-settings.webp" width="23%" alt="Settings" />
  </picture>
</p>

<p align="center"><a href="docs/screenshots/README.md">See every screen, in light and dark →</a></p>

## Contents

- [Why](#why)
- [Features](#features)
- [Compatibility](#compatibility)
- [Getting started](#getting-started)
- [Using the app](#using-the-app)
- [Development](#development)
- [How it works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Privacy](#privacy)
- [License and disclaimer](#license-and-disclaimer)

## Why

The bakery, the bookshop and the gym still hand out loyalty cards, and most of them will never be in Apple Wallet or Google Wallet. Loyus keeps all of them on your phone. Scan a card once. At the till it opens in one tap, with a barcode sized for the store's scanner, even in airplane mode.

## Features

- **Scanning**: point the camera at a card, read the barcode from a photo or a screenshot, or type the number.
- **Store brands**: pick the store from the popular ones in your country or search more than 400 brands. The card gets the store's logo and color. Typing a known name suggests the matching stores.
- **At the till**: one tap opens the barcode at full brightness and keeps the screen awake. The code follows the GS1 retail specs: module width, quiet zones and bar height, snapped to the screen's pixels.
- **Long codes**: rotate a code across the whole screen, or copy the number.
- **Pinning and sorting**: pin favorites to the top, then sort the rest by most used, recently used, A → Z or your own order. Drag to reorder; VoiceOver users get move actions.
- **Search**: find a card by store, owner or number.
- **Card details**:
  - an owner or nickname to tell two cards from the same store apart;
  - a note (PIN, member number) shown under the code;
  - front and back photos;
  - 12 card colors;
  - a duplicate check before saving, and a warning when a code looks temporary.
- **Widgets and shortcuts**: Home Screen and Lock Screen widgets on iOS, and quick actions on the app icon for your three most used cards.
- **Personalization**:
  - grid or list layout;
  - light, dark or system theme, six accent colors, and Liquid Glass buttons on iOS 26 and later;
  - English, French, Spanish, Portuguese, Russian or German, whatever the system language;
  - maximum brightness at the till, on or off.
- **Backups**: export and import your cards as a JSON file. Photos stay on the phone.
- **Accessible**: VoiceOver and TalkBack labels and actions, Dynamic Type, 44 pt touch targets, and WCAG AA contrast checked in tests.
- **Private**: no account, no network access, no analytics. Everything stays on the device.

## Compatibility

| Barcode or OS                      | Status                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| EAN-13, EAN-8, UPC-A, UPC-E        | Scanned and drawn                                                                            |
| Code 128, Code 39, ITF-14, Codabar | Scanned and drawn                                                                            |
| QR code                            | Scanned and drawn                                                                            |
| MSI, Pharmacode                    | Typed in, then drawn                                                                         |
| Data Matrix, PDF417, Aztec         | Scanned, then shown as the card number                                                       |
| GS1 DataBar                        | Scanned on iOS, then shown as the card number                                                |
| iOS                                | iOS 16.4 or later. Tested on iOS 26.5 simulators and on an iPhone with iOS 27                |
| Android                            | Android 10 (API 29) or later. Builds from the same code base, but not yet tested on a device |

## Getting started

### Prerequisites

- **Node 24** (or 22.13 and later) with Corepack enabled. The repository pins **Yarn 4**.
- **Xcode 27** for iOS (the Expo SDK 58 preview no longer builds with Xcode 26.2), and/or **Android Studio** for Android.
- A **physical phone** to scan real cards. Simulators have no camera, but you can type a number or read a barcode from a photo there.

### Install and run

```bash
git clone https://github.com/Loyus-App/Loyus.git
cd Loyus
corepack enable
yarn install

yarn ios               # build and launch the dev build on an iOS simulator
yarn ios --device      # or on a connected iPhone
yarn android           # or on an Android device or emulator
```

> [!IMPORTANT]
> The app uses native modules (VisionCamera, MMKV, Unistyles, expo-widgets), so it doesn't run in **Expo Go**. `yarn ios` and `yarn android` build a development build instead.

> [!TIP]
> To install on your own iPhone, set `ios.appleTeamId` in [`app.config.ts`](app.config.ts) to your Apple team ID. `com.loyus.app` belongs to the Loyus team, so also change the app and widget bundle identifiers and the App Group to ones you own. A free Personal Team can sideload the app, but it can't give the widget the App Group.

After the first build, `yarn start` is enough: Metro serves the JavaScript and changes reload instantly.

## Using the app

1. Tap **+** and point the camera at the card's barcode. No camera at hand? Choose **From a photo** or **Type it in**.
2. Check the store name, the number and the barcode type, pick a color, then save.
3. At the till, tap the card. The barcode opens at full brightness. Tap **Rotate** for a long code.
4. Long-press a card to pin, edit, share or delete it. Pinned cards stay at the top.
5. Use the sort menu under the title (**Most used**, **Recently used**, **A → Z**, **Manual**) and switch between grid and list.
6. In **Settings**, pick the theme, the accent color and the language, and export a backup.

## Development

| Command                     | What it does                                                    |
| --------------------------- | --------------------------------------------------------------- |
| `yarn start`                | Metro for the dev build                                         |
| `yarn ios` / `yarn android` | Build and run the dev build                                     |
| `yarn check:fix`            | Biome lint and format                                           |
| `yarn typecheck`            | TypeScript check (`tsc --noEmit`)                               |
| `yarn test`                 | Jest with React Native Testing Library                          |
| `yarn test:e2e`             | [Maestro](https://maestro.dev) flows in [`.maestro/`](.maestro) |
| `yarn test:e2e:studio`      | Maestro Studio, to write and debug flows                        |

### Stack

Expo SDK 58 · React Native 0.88 · React 19.3 · TypeScript (strict) · expo-router with native tabs · [Unistyles 3](https://www.unistyl.es) · zustand and MMKV · [VisionCamera 5](https://react-native-vision-camera.com) · Reanimated 4 · react-native-svg · JsBarcode and node-qrcode · i18next.

### Project structure

```text
src/
├── app/        routes (expo-router): tabs, card screens and sheets
├── domain/     pure TypeScript: cards, barcode layout, sorting, search, backups
├── state/      zustand stores, selectors and migrations
├── infra/      camera, files, i18n, persistence, shortcuts
├── ui/         design system: theme, primitives, components, hooks
└── widgets/    iOS Home Screen and Lock Screen widgets
modules/
└── image-barcode-scanner/   native module that reads barcodes from photos
plugins/        Expo config plugins
```

Dependencies flow one way: `app` and `ui` → `state` → `domain`, with `infra` wrapping the native APIs. [`architecture.test.ts`](src/domain/__tests__/architecture.test.ts) keeps the domain free of React Native and Expo, and [`noNetwork.test.ts`](src/domain/__tests__/noNetwork.test.ts) fails CI if network calls reach the app. [`CLAUDE.md`](CLAUDE.md) has the full rules for each layer.

## How it works

The till screen encodes the card with JsBarcode (1D codes) or node-qrcode (QR), then [`layoutSymbol`](src/domain/barcodeLayout.ts) picks the largest module that fits the screen within the ranges of the [GS1 General Specifications](https://ref.gs1.org/standards/genspecs/). Every module is a whole number of device pixels, so bar edges stay sharp and scanners read even widths.

| Rule         | 1D codes                                                   | QR code                              |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| Module width | 0.264 to 0.66 mm                                           | 0.375 to 0.99 mm, at most 36 mm wide |
| Quiet zone   | 11 modules (EAN-13), 9 (UPC), 7 (EAN-8), 10 for the others | 4 modules on every side              |
| Bar height   | GS1 height for EAN and UPC, a third of the width otherwise | Square                               |

A point is about 0.16 mm on current phones. When a code is too dense for the width, the till screen suggests rotating it.

Cards live in a zustand store persisted to MMKV, with versioned migrations. Photos are files in the app's own folder, and backups are portable JSON without them. Reading a barcode from a photo goes through a local Expo module: Apple Vision on iOS, ML Kit on Android.

## Troubleshooting

<details>
<summary><strong>The till's scanner doesn't read the code</strong></summary>

- Keep **Maximum brightness** on (Settings → At the till) and hold the phone flat, 10 to 15 cm from the scanner.
- Tap **Rotate** for a long code: the bars get wider.
- Check the barcode type in **Edit**. It must match the one printed on the card.
- Some older tills use laser scanners, which can't read phone screens. Read out the number printed under the code instead.

</details>

<details>
<summary><strong>The camera doesn't pick up my card</strong></summary>

- Check the camera permission: iOS Settings → Privacy & Security → Camera, or the app's permissions on Android.
- Move to better light and fill the frame with the barcode.
- Take a photo of the card and use **From a photo**, or **Type it in**.

</details>

<details>
<summary><strong>A card only shows its number</strong></summary>

Data Matrix, PDF417, Aztec and GS1 DataBar codes are scanned and saved, but the app doesn't draw them yet. The till screen shows the number in large type so the cashier can type it.

</details>

<details>
<summary><strong>The development build closes when the JavaScript reloads</strong></summary>

This is a known issue of the Expo SDK 58 preview (`ExpoFabricView.injectInitializer`) and only affects development builds. Relaunch the app.

</details>

## Roadmap

- [x] Scan with the camera or from a photo, or type the number
- [x] Barcodes sized to the GS1 specs, brightness and rotation at the till
- [x] Pinning, sorting, manual order and search
- [x] iOS widgets, quick actions and backups
- [x] Themes, accent colors and six languages
- [x] Store logos and colors on cards
- [ ] Draw Data Matrix, PDF417 and Aztec codes
- [ ] App icon and alternate icons
- [ ] Android widget
- [ ] Separate search tab on iOS 27 (waiting for `UISearchTab` support in react-native-screens)
- [ ] Android testing on real hardware

## Contributing

Issues and pull requests are welcome. Before opening a PR:

1. Run `yarn check:fix && yarn typecheck && yarn test`. It must pass.
2. Follow the conventions in [`CLAUDE.md`](CLAUDE.md) and [`.claude/rules/`](.claude/rules):
   - Yarn only;
   - Unistyles theme tokens for styling;
   - every UI string in all six locale files;
   - no comments in code;
   - no React Native or Expo imports in the domain layer.
3. Ship new behavior with tests. PR titles follow [Conventional Commits](https://www.conventionalcommits.org), and CI checks them.

The [contributing guide](docs/CONTRIBUTING.md) covers the CI and release pipeline. The repository is set up for AI-assisted development with [Claude Code](https://claude.com/claude-code):

- **Rules:** path-scoped rules for each layer in `.claude/rules/`.
- **Agents:** a design auditor and a Maestro flow writer in `.claude/agents/`.
- **Skills:** a full quality check and a new-screen scaffold in `.claude/skills/`.

## Acknowledgements

- The [GS1 General Specifications](https://ref.gs1.org/standards/genspecs/) for barcode dimensions.
- [JsBarcode](https://github.com/lindell/JsBarcode) and [node-qrcode](https://github.com/soldair/node-qrcode) for encoding.
- [Expo](https://expo.dev), [Unistyles](https://www.unistyl.es), [VisionCamera](https://react-native-vision-camera.com) and [react-native-reorderable-list](https://github.com/omahili/react-native-reorderable-list).

## Privacy

Loyus collects no data: no account, no analytics, no tracking, and nothing leaves your device. Read the full [privacy policy](docs/PRIVACY_POLICY.md).

## License and disclaimer

Copyright © 2026 Arthur Monteiro.

Loyus is released under the [MIT License](LICENSE).

Loyus is an independent project. Store names and logos belong to their owners, and Loyus is not affiliated with or endorsed by any retailer. The software is provided as is, without warranty of any kind.
