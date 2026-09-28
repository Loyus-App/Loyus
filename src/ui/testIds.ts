import { isE2E } from '../infra/env';

const TEST_IDS = {
  homeScreen: 'home-screen',
  homeTitle: 'home-title',
  themeLabel: 'theme-label',
  addCardButton: 'add-card-button',
  cardListItem: 'card-list-item',
  searchInput: 'search-input',
  emptyStateCta: 'empty-state-cta',
  favoriteToggle: 'favorite-toggle',
  cardNameInput: 'card-name-input',
  cardCodeInput: 'card-code-input',
  formatPicker: 'format-picker',
  colorPicker: 'color-picker',
  saveCardButton: 'save-card-button',
  barcodeDisplay: 'barcode-display',
  cardDetailName: 'card-detail-name',
  editCardButton: 'edit-card-button',
  deleteCardButton: 'delete-card-button',
  confirmDeleteButton: 'confirm-delete-button',
  scanScreen: 'scan-screen',
  permissionRationale: 'permission-rationale',
  permissionRequestButton: 'permission-request-button',
  openSettingsButton: 'open-settings-button',
  torchToggle: 'torch-toggle',
  scannerOverlay: 'scanner-overlay',
  confirmScreen: 'confirm-screen',
  rotatingCodeWarning: 'rotating-code-warning',
  searchScreen: 'search-screen',
  searchTab: 'search-tab',
  scanTab: 'scan-tab',
  cardGridTile: 'card-grid-tile',
  addCardTile: 'add-card-tile',
  viewModeToggle: 'view-mode-toggle',
  favoritesSection: 'favorites-section',
  markFavoriteToggle: 'mark-favorite-toggle',
  clearCodeButton: 'clear-code-button',
  cardPreview: 'card-preview',
  copyNumberButton: 'copy-number-button',
  walletSecureBadge: 'wallet-secure-badge',
  barcodeCard: 'barcode-card',
  closeDetailButton: 'close-detail-button',
  brightnessButton: 'brightness-button',
  settingsScreen: 'settings-screen',
  languageRow: 'language-row',
  themeLight: 'theme-light',
  themeDark: 'theme-dark',
  themeSystem: 'theme-system',
  exportCardsRow: 'export-cards-row',
  aboutVersion: 'about-version',
} as const;

type TestIdKey = keyof typeof TEST_IDS;

export function testId(key: TestIdKey): string | undefined {
  return isE2E ? TEST_IDS[key] : undefined;
}

export function tid(key: TestIdKey): { testID: string } | Record<string, never> {
  return isE2E ? { testID: TEST_IDS[key] } : {};
}
