# Loyus — Privacy Policy

**Effective date:** 2026-04-18
**Last updated:** 2026-04-18
**Publisher:** Arthur Monteiro
**Contact:** `arthurmtro@gmail.com`

---

## 1. Introduction

Loyus is an offline-first loyalty-card wallet for iOS and Android. This policy explains what data Loyus does and does not handle. The short version: **Loyus does not collect, transmit, or store any personal data on external servers.** Every claim below is enforced by the app's architecture, not by promise.

## 2. Data Collection

**Loyus does not collect any personal data.**

- No user account, no login, no sign-up.
- No analytics SDK. No tracking SDK. No crash-reporting SDK.
- No advertising identifiers.
- No device fingerprinting.
- No usage telemetry.

The only data Loyus handles is the data you enter yourself (card name, card code, barcode format, color, favorite flag), and that data never leaves your device.

## 3. Data Storage

All card data is stored **locally on your device** using MMKV (a native key-value store).

- On **iOS**, data is written to the app's private `Documents/mmkv/` directory.
- On **Android**, data is written to the app's private internal storage.

Only Loyus can read this data. iOS/Android sandboxing prevents other apps from accessing it.

## 4. Device Backup

Card data may be included in your device's standard OS backup mechanism:

- **iOS:** iCloud Backup (if enabled in Settings → [Your Name] → iCloud → iCloud Backup).
- **Android:** Google Backup (if enabled in Settings → System → Backup).

This is controlled entirely by your device settings, not by Loyus. Loyus does not operate any cloud service of its own.

## 5. Data Sharing

**Loyus does not share any data with any third party.**

- No data is transmitted to any server operated by the publisher.
- No data is transmitted to analytics vendors, advertising networks, or any other party.
- Loyus does not make any network requests during normal operation.

## 6. Third-Party Services

Loyus uses the following first-party platform services only:

- **Camera** (via Apple's AVFoundation / Android's CameraX through `react-native-vision-camera`): used **solely** to scan a barcode locally on the device. The camera feed is never recorded, saved, or transmitted. Frames are decoded on-device and discarded immediately.
- **Haptic feedback** (iOS UIImpactFeedbackGenerator / Android Vibrator): local vibration only.
- **OS share sheet**: when you choose to export your cards as a JSON file, the file is written to your device and offered to the OS share sheet. What happens next depends on which destination you pick (Mail, Files, AirDrop, etc.) — that target application is not operated by Loyus.

No web APIs, no remote SDKs, no advertising partners.

## 7. Export and Deletion

You have full control over your data at all times:

- **Export:** Settings → Export → produces a JSON file you can save anywhere.
- **Delete one card:** long-press the card → Delete, or use the Edit screen's Delete button.
- **Delete all cards:** remove them individually, or uninstall Loyus (uninstalling removes all local data).

Because Loyus does not keep any copy on any server, uninstalling the app is a complete deletion.

## 8. Children's Privacy

Loyus does not knowingly target children. Since the app does not collect any data, there is no child-specific data handling path. The app is rated 4+ on the App Store and Everyone on Google Play.

## 9. Open Source

Loyus is open source under the MIT license. The full source code is available at [github.com/Loyus-App/Loyus](https://github.com/Loyus-App/Loyus) — every claim in this policy can be verified against the repository.

## 10. Changes to This Policy

If this policy changes, the `Last updated` date above will be bumped and the published URL will show the new version. For material changes (e.g., if data collection ever starts — which is not planned), a prominent in-app notice will be shown on the next launch.

## 11. Contact

Questions or concerns: `arthurmtro@gmail.com`.

---

## Appendix A — Trademark Compliance (audit 2026-04-17)

Per Apple App Store Review Guideline 5.2 and Google Play Policy on Impersonation:

- Production code (`app/`, `src/ui/`, `src/infra/`, `src/state/`, `src/domain/`, `assets/`): **no retailer brand names, logos, or trademarks**. Audit via `grep` confirmed zero matches for Carrefour, Leclerc, Auchan, Lidl, Intermarché, Casino, Monoprix, Franprix, Fnac, Decathlon, Starbucks, Sephora, McDonald, Burger King, Ikea, Zara, H&M, Uniqlo, Nike, Adidas, Stocard, Klarna, Fidme, Loyverse.
- Test fixtures (`src/domain/__tests__/`, `src/state/__tests__/`, `.maestro/`): reference common retailer names (Carrefour, Starbucks, Monoprix) **only as test-input strings**. These do not ship in the release binary and do not appear in any user-visible screen or store listing.
- App icon + screenshots: must use **generic names only** (e.g., "Coffee Shop", "Bookstore", "Gym"). Screenshot seed data to be produced with generic names before submission — see `docs/STORE_LISTING.md` § Screenshot Spec.

## Appendix B — Claim-to-code mapping

Every substantive claim in this policy is backed by a verifiable architectural fact:

| Claim | Enforced by |
|-------|-------------|
| No data transmitted | `src/domain/__tests__/noNetwork.test.ts` scans the critical path for `fetch`, `XMLHttpRequest`, `axios`, `ky`, `got`, `http.request`, `https.request`, `WebSocket`, `@apollo` — CI-gated. |
| No analytics SDK | `package.json` has no analytics dependency; reviewable in the open-source repo. |
| Data stored locally only | `src/state/stores/*.ts` persists via Zustand + MMKV adapter (`src/infra/persistence`); no other persistence path exists. |
| Camera frames not recorded | `src/ui/components/CameraPermissionGate.tsx` + scan pipeline use `react-native-vision-camera` code scanner only; no `CameraRoll` / MediaLibrary writes; no file I/O in the scan pipeline. |
| No account required | No authentication code in the repo. |
