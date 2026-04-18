import { isE2E } from '../infra/env';

const TEST_IDS = {
  homeScreen: 'home-screen',
  homeTitle: 'home-title',
  themeLabel: 'theme-label',
  // Phase 03 - Card List
  addCardButton: 'add-card-button',
  cardListItem: 'card-list-item',
  searchInput: 'search-input',
  emptyStateCta: 'empty-state-cta',
  favoriteToggle: 'favorite-toggle',
  // Phase 03 - Card Form
  cardNameInput: 'card-name-input',
  cardCodeInput: 'card-code-input',
  formatPicker: 'format-picker',
  colorPicker: 'color-picker',
  saveCardButton: 'save-card-button',
  // Phase 03 - Card Detail
  barcodeDisplay: 'barcode-display',
  cardDetailName: 'card-detail-name',
  editCardButton: 'edit-card-button',
  deleteCardButton: 'delete-card-button',
  // Phase 03 - Edit
  confirmDeleteButton: 'confirm-delete-button',
  // Phase 04 - Scanner
  scanScreen: 'scan-screen',
  permissionRationale: 'permission-rationale',
  permissionRequestButton: 'permission-request-button',
  openSettingsButton: 'open-settings-button',
  torchToggle: 'torch-toggle',
  scannerOverlay: 'scanner-overlay',
  // Phase 04 - Confirmation
  confirmScreen: 'confirm-screen',
  rotatingCodeWarning: 'rotating-code-warning',
  // Phase 05.1 - Design Overhaul
  searchScreen: 'search-screen',
  searchTab: 'search-tab',
  scanTab: 'scan-tab',
  // Phase 05.1 - Home Grid
  cardGridTile: 'card-grid-tile',
  addCardTile: 'add-card-tile',
  viewModeToggle: 'view-mode-toggle',
  favoritesSection: 'favorites-section',
  // Phase 05.1 - Card Form Redesign
  markFavoriteToggle: 'mark-favorite-toggle',
  clearCodeButton: 'clear-code-button',
  cardPreview: 'card-preview',
  // Phase 05.1 - Barcode Detail Redesign
  copyNumberButton: 'copy-number-button',
  walletSecureBadge: 'wallet-secure-badge',
  barcodeCard: 'barcode-card',
  closeDetailButton: 'close-detail-button',
  brightnessButton: 'brightness-button',
  // Phase 05 - Settings
  settingsScreen: 'settings-screen',
  languageRow: 'language-row',
  themeLight: 'theme-light',
  themeDark: 'theme-dark',
  themeSystem: 'theme-system',
  exportCardsRow: 'export-cards-row',
  aboutVersion: 'about-version',
} as const;

type TestIdKey = keyof typeof TEST_IDS;

/** Returns the testID string if E2E mode is active, undefined otherwise */
export function testId(key: TestIdKey): string | undefined {
  return isE2E ? TEST_IDS[key] : undefined;
}

/** Spread-friendly testID: returns { testID: string } in E2E, empty object otherwise */
export function tid(key: TestIdKey): { testID: string } | Record<string, never> {
  return isE2E ? { testID: TEST_IDS[key] } : {};
}
