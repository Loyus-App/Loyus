import type { Translation } from '../types';

const de: Translation = {
  common: {
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    save: 'Speichern',
    close: 'Schließen',
    goBack: 'Zurück',
    gotIt: 'Verstanden',
    copied: 'Kopiert!',
    viewAll: 'Alle anzeigen',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Karte suchen...',
    searchLabel: 'Karten suchen',
    sectionFavorites: 'FAVORITEN',
    viewAllFavorites: 'Alle Favoriten anzeigen',
    sectionAllCards: 'ALLE KARTEN',
    cardLevelGold: 'GOLD-LEVEL',
    cardLevelMember: 'MITGLIED',
    addCardLabel: 'Karte hinzufügen',
    switchList: 'Zur Listenansicht wechseln',
    switchGrid: 'Zur Rasteransicht wechseln',
  },

  search: {
    placeholder: 'Karte suchen...',
    cancelText: 'Abbrechen',
    sectionRecent: 'ZULETZT',
    clearRecents: 'Löschen',
    sectionBrowse: 'DURCHSUCHEN',
    categoryAll: 'Alle Karten',
    categoryFavorites: 'Favoriten',
    categoryRecent: 'Zuletzt verwendet',
    noCardsInCategory: 'Keine Karten in dieser Kategorie',
    noResultsTitle: 'Keine Ergebnisse für „{{query}}"',
    noResultsSub: 'Versuche einen anderen Namen oder überprüfe die Schreibweise',
    searchFor: '{{term}} suchen',
  },

  settings: {
    title: 'Einstellungen',
    subtitle: 'Verwalte deine Daten, das Erscheinungsbild und Datenschutzeinstellungen.',
    sectionVisual: 'VISUELLE UMGEBUNG',
    appearanceTitle: 'Erscheinungsbild',
    themeSystem: 'Systemstandardmodus',
    themeLight: 'Hellmodus',
    themeDark: 'Dunkelmodus',
    pillLight: 'Hell',
    pillDark: 'Dunkel',
    sectionLanguage: 'SPRACHE',
    languageTitle: 'Sprache',
    languageAuto: 'Systemstandard',
    languageCurrent: 'Deutsch',
    sectionSync: 'SYNCHRONISIERUNG',
    cloudSyncTitle: 'Cloud-Synchronisierung',
    cloudSyncDesc:
      'Synchronisiere deine Wallet-Daten sicher auf allen autorisierten Geräten mit Ende-zu-Ende-Verschlüsselung.',
    cloudSyncBadge: 'AKTIV',
    configureIcloud: 'iCloud konfigurieren',
    privacyTitle: 'Datenschutz zuerst',
    privacyDesc:
      'Deine Daten verlassen dein Gerät niemals unverschlüsselt. Wir verfolgen keine Finanzgewohnheiten.',
    privacyLink: 'Datenschutzerklärung',
    sectionData: 'DATENPORTABILITÄT',
    exportTitle: 'Backup exportieren',
    exportDesc: 'Eine sichere .json-Datei deiner Wallet erstellen',
    exportLabel: 'Alle Karten als JSON exportieren',
    importTitle: 'Daten importieren',
    importDesc: 'Deine Wallet aus einem früheren Backup wiederherstellen',
    importLabel: 'Daten importieren',
    footerTerms: 'NUTZUNGSBEDINGUNGEN',
    footerPrivacy: 'DATENSCHUTZERKLÄRUNG',
    footerSecurity: 'SICHERHEIT',
    version: 'Loyus v{{version}} • Für Datenschutz entwickelt',
    exportFailedTitle: 'Export fehlgeschlagen',
    errorUnexpected: 'Ein unerwarteter Fehler ist aufgetreten.',
  },

  cardDetail: {
    notFound: 'Karte nicht gefunden',
    closeLabel: 'Barcode-Ansicht schließen',
    brightnessLabel: 'Bildschirmhelligkeit für das Scannen erhöht',
    brightnessInstruction: 'BILDSCHIRMHELLIGKEIT FÜR DAS SCANNEN ERHÖHT',
    instruction:
      'CODE IM RAHMEN POSITIONIEREN.\nBILDSCHIRMHELLIGKEIT FÜR MEHR ZUVERLÄSSIGKEIT ERHÖHT.',
    secureMode: 'SICHERER WALLET-MODUS',
    edit: 'BEARBEITEN',
    editLabel: 'Karte bearbeiten',
    rotate: 'Drehen',
    rotated: 'Gedreht',
    rotateLabel: 'Barcode drehen',
    resetRotateLabel: 'Barcode-Ausrichtung zurücksetzen',
    barcodeCardLabel: '{{name}} Barcode-Karte',
  },

  cardAdd: {
    headerTitle: 'Manuelle Eingabe',
    closeLabel: 'Schließen',
    helpLabel: 'Hilfe',
    saveCard: 'Karte speichern',
    helpModalTitle: 'So füllst du dieses Formular aus',
    helpItemStoreName: 'Geschäftsname',
    helpItemStoreDesc:
      'Der Name des Geschäfts oder Treueprogramms (z. B. „Blue Bottle Coffee"). Wird zur Identifikation deiner Karte in der Liste verwendet.',
    helpItemCode: 'Kartennummer / Code',
    helpItemCodeDesc:
      'Die auf deiner Treuekarte aufgedruckte Nummer, oder scanne den Barcode über den Tab „Scannen". Dies ist der im Barcode kodierte Wert.',
    helpItemBarcode: 'Barcode-Typ',
    helpItemBarcodeDesc:
      'Das Kodierungsformat deiner Karte. Bei Unsicherheit verwende Code 128 — es funktioniert mit den meisten Scannern. Du kannst die Karte auch scannen und das Format wird automatisch erkannt.',
    closeHelp: 'Hilfe schließen',
  },

  cardConfirm: {
    saveCard: 'Karte speichern',
    noScanError: 'Kein gescannter Code gefunden. Bitte scanne zuerst einen Code.',
    rotatingWarning:
      'Dieser Code sieht wie ein temporäres Token aus. Er funktioniert möglicherweise nicht, wenn du ihn später verwenden möchtest.',
  },

  cardEdit: {
    headerTitle: 'Karte bearbeiten',
    updateCard: 'Karte aktualisieren',
    notFound: 'Karte nicht gefunden',
    deleteLabel: 'Diese Karte löschen',
    deleteText: 'Karte löschen',
  },

  scan: {
    headerTitle: 'Karte scannen',
    closeLabel: 'Scanner schließen',
    enterManuallyLabel: 'Karte manuell eingeben',
    enterManuallyText: 'Manuell eingeben',
    noCamera: 'Kein Kamera auf diesem Gerät verfügbar',
    quickTipBold: 'Schnelltipp  ',
    quickTip: 'Stelle sicher, dass du dich in einem gut beleuchteten Bereich befindest',
  },

  form: {
    storeName: 'GESCHÄFTSNAME',
    storeNamePlaceholder: 'z. B. Blue Bottle Coffee',
    storeNameLabel: 'Geschäftsname',
    cardCode: 'KARTENNUMMER / CODE',
    cardCodePlaceholder: 'Scannen oder Ziffern eingeben',
    cardCodeLabel: 'Kartennummer oder Code',
    clearCode: 'Code löschen',
    barcodeType: 'BARCODE-TYP',
    color: 'FARBE',
    colorNone: 'Keine',
    cardColor: 'Kartenfarbe',
    defaultColor: 'Standardfarbe',
    cardPreview: 'KARTENVORSCHAU',
    enterDetailsAbove: 'KARTENDETAILS OBEN EINGEBEN',
    favoriteLabel: 'Als Favorit markieren',
    favoriteSub: 'Diese Karte auf deinem Dashboard anheften',
    favoriteAccessibility: 'Als Favorit markieren',
    addFavorite: 'Zu Favoriten hinzufügen',
    removeFavorite: 'Aus Favoriten entfernen',
    selectBarcodeType: 'Barcode-Typ auswählen',
    validationNameRequired: 'Kartenname ist erforderlich',
    validationNameTooLong: 'Kartenname darf höchstens 50 Zeichen lang sein',
    validationCodeRequired: 'Kartencode ist erforderlich',
  },

  empty: {
    title: 'Starte deine digitale Wallet',
    subtitle:
      'Eine übersichtlichere Art, deine Essentials zu verwalten. Speichere deine wichtigsten Karten sicher und greife mit Leichtigkeit darauf zu.',
    addFirstCard: 'Erste Karte hinzufügen',
    addFirstLabel: 'Erste Treuekarte hinzufügen',
    importExisting: 'VORHANDENE DATEN IMPORTIEREN',
    importLabel: 'Vorhandene Daten importieren',
  },

  camera: {
    permissionTitle: 'Kamerazugriff erforderlich',
    permissionMessage: 'Loyus benötigt Kamerazugriff, um Barcodes von Treuekarten zu scannen.',
    grantAccess: 'Kamerazugriff erlauben',
    grantLabel: 'Kamerazugriff zum Scannen von Barcodes erlauben',
    goToSettings: 'Zu Einstellungen',
    goToSettingsLabel: 'Geräteeinstellungen öffnen, um Kamerazugriff zu erlauben',
  },

  scanner: {
    alignText: 'Barcode im Rahmen ausrichten',
  },

  copy: {
    copyNumber: 'Nummer kopieren',
    copiedLabel: 'In die Zwischenablage kopiert',
  },

  torch: {
    turnOn: 'Taschenlampe einschalten',
    turnOff: 'Taschenlampe ausschalten',
  },

  error: {
    title: 'Etwas ist schiefgelaufen',
    tryAgain: 'Erneut versuchen',
    tryAgainLabel: 'Erneut versuchen',
    restart: 'Bitte starte die App neu, um fortzufahren.',
    barcodeRenderFailed: 'Barcode kann nicht angezeigt werden',
    barcodeRenderHint: 'Versuche den Kartencode zu bearbeiten',
    visualNotAvailable: 'Visuelle Darstellung nicht verfügbar',
    formatLabel: 'Format: {{format}}',
  },

  quickActions: {
    deleteTitle: 'Karte löschen',
    deleteMessage:
      'Möchtest du „{{name}}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
    favorite: 'Favorit',
    unfavorite: 'Aus Favoriten entfernen',
    cardActionsTitle: 'Kartenaktionen',
  },
};

export default de;
