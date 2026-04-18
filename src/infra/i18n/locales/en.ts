const en = {
  common: {
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    close: 'Close',
    goBack: 'Go back',
    gotIt: 'Got it',
    copied: 'Copied!',
    viewAll: 'View All',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Find a card...',
    searchLabel: 'Search cards',
    sectionFavorites: 'FAVORITES',
    viewAllFavorites: 'View all favorites',
    sectionAllCards: 'ALL CARDS',
    cardLevelGold: 'GOLD LEVEL',
    cardLevelMember: 'MEMBER',
    addCardLabel: 'Add card',
    switchList: 'Switch to list view',
    switchGrid: 'Switch to grid view',
  },

  search: {
    placeholder: 'Find a card...',
    cancelText: 'Cancel',
    sectionRecent: 'RECENT',
    clearRecents: 'Clear',
    sectionBrowse: 'BROWSE',
    categoryAll: 'All Cards',
    categoryFavorites: 'Favorites',
    categoryRecent: 'Recently Used',
    noCardsInCategory: 'No cards in this category',
    noResultsTitle: 'No results for "{{query}}"',
    noResultsSub: 'Try a different name or check your spelling',
    searchFor: 'Search for {{term}}',
  },

  settings: {
    title: 'Settings',
    subtitle: 'Manage your data, appearance, and privacy preferences with total control.',
    sectionVisual: 'VISUAL ENVIRONMENT',
    appearanceTitle: 'Appearance',
    themeSystem: 'System default mode',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    pillLight: 'Light',
    pillDark: 'Dark',
    sectionLanguage: 'LANGUAGE',
    languageTitle: 'Language',
    languageAuto: 'System default',
    languageCurrent: 'English',
    sectionSync: 'SYNCHRONIZATION',
    cloudSyncTitle: 'Cloud Sync',
    cloudSyncDesc:
      'Securely sync your wallet data across authorized devices using end-to-end encryption.',
    cloudSyncBadge: 'ACTIVE',
    configureIcloud: 'Configure iCloud',
    privacyTitle: 'Privacy First',
    privacyDesc:
      'Your data never leaves your device unencrypted. We do not track your financial habits.',
    privacyLink: 'Privacy Policy',
    sectionData: 'DATA PORTABILITY',
    exportTitle: 'Export Backup',
    exportDesc: 'Generate a secure .json file of your wallet',
    exportLabel: 'Export all cards as JSON',
    importTitle: 'Import Data',
    importDesc: 'Restore your wallet from a previous backup',
    importLabel: 'Import data',
    footerTerms: 'TERMS OF SERVICE',
    footerPrivacy: 'PRIVACY POLICY',
    footerSecurity: 'SECURITY',
    version: 'Loyus v{{version}} • Built for Privacy',
    exportFailedTitle: 'Export Failed',
    errorUnexpected: 'An unexpected error occurred.',
  },

  cardDetail: {
    notFound: 'Card not found',
    closeLabel: 'Close barcode view',
    brightnessLabel: 'Screen brightness boosted for scanning',
    brightnessInstruction: 'SCREEN BRIGHTNESS INCREASED FOR SCANNING',
    instruction:
      'POSITION CODE WITHIN SCANNER FRAME.\nSCREEN BRIGHTNESS INCREASED FOR RELIABILITY.',
    secureMode: 'WALLET SECURE MODE',
    edit: 'EDIT',
    editLabel: 'Edit card',
    rotate: 'Rotate',
    rotated: 'Rotated',
    rotateLabel: 'Rotate barcode',
    resetRotateLabel: 'Reset barcode orientation',
    barcodeCardLabel: '{{name}} barcode card',
  },

  cardAdd: {
    headerTitle: 'Manual Entry',
    closeLabel: 'Close',
    helpLabel: 'Help',
    saveCard: 'Save Card',
    helpModalTitle: 'How to fill this form',
    helpItemStoreName: 'Store Name',
    helpItemStoreDesc:
      'The name of the store or loyalty program (e.g. "Blue Bottle Coffee"). Used to identify your card in the list.',
    helpItemCode: 'Card Number / Code',
    helpItemCodeDesc:
      'The number printed on your loyalty card, or scan its barcode using the Scan tab. This is the value encoded in the barcode.',
    helpItemBarcode: 'Barcode Type',
    helpItemBarcodeDesc:
      'The encoding format of your card. If unsure, use Code 128 — it works with most retail scanners. You can also scan the card and the format will be detected automatically.',
    closeHelp: 'Close help',
  },

  cardConfirm: {
    saveCard: 'Save Card',
    noScanError: 'No scanned code found. Please scan a code first.',
    rotatingWarning:
      'This code looks like a temporary token. It may not work when you try to use it later.',
  },

  cardEdit: {
    headerTitle: 'Edit Card',
    updateCard: 'Update Card',
    notFound: 'Card not found',
    deleteLabel: 'Delete this card',
    deleteText: 'Delete Card',
  },

  scan: {
    headerTitle: 'Scan Card',
    closeLabel: 'Close scanner',
    enterManuallyLabel: 'Enter card manually',
    enterManuallyText: 'Enter Manually',
    noCamera: 'No camera available on this device',
    quickTipBold: 'Quick Tip  ',
    quickTip: "Ensure you're in a well-lit area for the fastest card detection",
  },

  form: {
    storeName: 'STORE NAME',
    storeNamePlaceholder: 'e.g. Blue Bottle Coffee',
    storeNameLabel: 'Store name',
    cardCode: 'CARD NUMBER / CODE',
    cardCodePlaceholder: 'Scan or type card digits',
    cardCodeLabel: 'Card number or code',
    clearCode: 'Clear code',
    barcodeType: 'BARCODE TYPE',
    color: 'COLOR',
    colorNone: 'None',
    cardColor: 'Card color',
    defaultColor: 'Default color',
    cardPreview: 'CARD PREVIEW',
    enterDetailsAbove: 'ENTER CARD DETAILS ABOVE',
    favoriteLabel: 'Mark as Favorite',
    favoriteSub: 'Pin this card to your dashboard',
    favoriteAccessibility: 'Mark as favorite',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove from favorites',
    selectBarcodeType: 'Select Barcode Type',
    validationNameRequired: 'Card name is required',
    validationNameTooLong: 'Card name must be 50 characters or less',
    validationCodeRequired: 'Card code is required',
  },

  empty: {
    title: 'Start your digital wallet',
    subtitle:
      'A cleaner way to manage your essentials. Securely store your primary cards and access them with sophisticated ease.',
    addFirstCard: 'Add Your First Card',
    addFirstLabel: 'Add your first loyalty card',
    importExisting: 'IMPORT EXISTING DATA',
    importLabel: 'Import existing data',
  },

  camera: {
    permissionTitle: 'Camera Access Needed',
    permissionMessage: 'Loyus needs camera access to scan loyalty card barcodes.',
    grantAccess: 'Grant Camera Access',
    grantLabel: 'Grant camera access to scan barcodes',
    goToSettings: 'Go to Settings',
    goToSettingsLabel: 'Open device settings to grant camera access',
  },

  scanner: {
    alignText: 'Align barcode in frame',
  },

  copy: {
    copyNumber: 'Copy Number',
    copiedLabel: 'Copied to clipboard',
  },

  torch: {
    turnOn: 'Turn on flashlight',
    turnOff: 'Turn off flashlight',
  },

  error: {
    title: 'Something went wrong',
    tryAgain: 'Try Again',
    tryAgainLabel: 'Try again',
    restart: 'Please restart the app to continue.',
    barcodeRenderFailed: 'Unable to render barcode',
    barcodeRenderHint: 'Try editing the card code',
    visualNotAvailable: 'Visual rendering not available',
    formatLabel: 'Format: {{format}}',
  },

  quickActions: {
    deleteTitle: 'Delete Card',
    deleteMessage: 'Are you sure you want to delete "{{name}}"? This cannot be undone.',
    favorite: 'Favorite',
    unfavorite: 'Unfavorite',
    cardActionsTitle: 'Card Actions',
  },
} as const;

export default en;
