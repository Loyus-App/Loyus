import type { Translation } from '../types';

const fr: Translation = {
  common: {
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    save: 'Enregistrer',
    close: 'Fermer',
    goBack: 'Retour',
    gotIt: 'Compris',
    copied: 'Copié !',
    viewAll: 'Voir tout',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Trouver une carte...',
    searchLabel: 'Rechercher des cartes',
    sectionFavorites: 'FAVORIS',
    viewAllFavorites: 'Voir tous les favoris',
    sectionAllCards: 'TOUTES LES CARTES',
    cardLevelGold: 'NIVEAU OR',
    cardLevelMember: 'MEMBRE',
    addCardLabel: 'Ajouter une carte',
    switchList: 'Passer à la vue liste',
    switchGrid: 'Passer à la vue grille',
  },

  search: {
    placeholder: 'Trouver une carte...',
    cancelText: 'Annuler',
    sectionRecent: 'RÉCENT',
    clearRecents: 'Effacer',
    sectionBrowse: 'PARCOURIR',
    categoryAll: 'Toutes les cartes',
    categoryFavorites: 'Favoris',
    categoryRecent: 'Récemment utilisées',
    noCardsInCategory: 'Aucune carte dans cette catégorie',
    noResultsTitle: 'Aucun résultat pour « {{query}} »',
    noResultsSub: "Essayez un autre nom ou vérifiez l'orthographe",
    searchFor: 'Rechercher {{term}}',
  },

  settings: {
    title: 'Paramètres',
    subtitle:
      "Gérez vos données, l'apparence et les préférences de confidentialité en toute maîtrise.",
    sectionVisual: 'ENVIRONNEMENT VISUEL',
    appearanceTitle: 'Apparence',
    themeSystem: 'Mode système par défaut',
    themeLight: 'Mode clair',
    themeDark: 'Mode sombre',
    pillLight: 'Clair',
    pillDark: 'Sombre',
    sectionLanguage: 'LANGUE',
    languageTitle: 'Langue',
    languageAuto: 'Système par défaut',
    languageCurrent: 'Français',
    sectionSync: 'SYNCHRONISATION',
    cloudSyncTitle: 'Sync Cloud',
    cloudSyncDesc:
      'Synchronisez vos données de portefeuille sur tous vos appareils autorisés avec un chiffrement de bout en bout.',
    cloudSyncBadge: 'ACTIF',
    configureIcloud: 'Configurer iCloud',
    privacyTitle: 'La confidentialité avant tout',
    privacyDesc:
      'Vos données ne quittent jamais votre appareil sans chiffrement. Nous ne suivons pas vos habitudes financières.',
    privacyLink: 'Politique de confidentialité',
    sectionData: 'PORTABILITÉ DES DONNÉES',
    exportTitle: 'Exporter la sauvegarde',
    exportDesc: 'Générer un fichier .json sécurisé de votre portefeuille',
    exportLabel: 'Exporter toutes les cartes en JSON',
    importTitle: 'Importer des données',
    importDesc: 'Restaurer votre portefeuille depuis une sauvegarde précédente',
    importLabel: 'Importer des données',
    footerTerms: "CONDITIONS D'UTILISATION",
    footerPrivacy: 'POLITIQUE DE CONFIDENTIALITÉ',
    footerSecurity: 'SÉCURITÉ',
    version: 'Loyus v{{version}} • Conçu pour la vie privée',
    exportFailedTitle: "Échec de l'exportation",
    errorUnexpected: "Une erreur inattendue s'est produite.",
  },

  cardDetail: {
    notFound: 'Carte introuvable',
    closeLabel: 'Fermer la vue du code-barres',
    brightnessLabel: 'Luminosité augmentée pour la lecture',
    brightnessInstruction: 'LUMINOSITÉ AUGMENTÉE POUR LA LECTURE',
    instruction:
      'POSITIONNEZ LE CODE DANS LE CADRE.\nLA LUMINOSITÉ A ÉTÉ AUGMENTÉE POUR PLUS DE FIABILITÉ.',
    secureMode: 'MODE SÉCURISÉ DU PORTEFEUILLE',
    edit: 'MODIFIER',
    editLabel: 'Modifier la carte',
    rotate: 'Pivoter',
    rotated: 'Pivoté',
    rotateLabel: 'Pivoter le code-barres',
    resetRotateLabel: "Réinitialiser l'orientation du code-barres",
    barcodeCardLabel: 'Carte code-barres de {{name}}',
  },

  cardAdd: {
    headerTitle: 'Saisie manuelle',
    closeLabel: 'Fermer',
    helpLabel: 'Aide',
    saveCard: 'Enregistrer la carte',
    helpModalTitle: 'Comment remplir ce formulaire',
    helpItemStoreName: 'Nom du magasin',
    helpItemStoreDesc:
      'Le nom du magasin ou du programme de fidélité (ex. « Blue Bottle Coffee »). Utilisé pour identifier votre carte dans la liste.',
    helpItemCode: 'Numéro / Code de la carte',
    helpItemCodeDesc:
      "Le numéro imprimé sur votre carte de fidélité, ou scannez son code-barres via l'onglet Scanner. C'est la valeur encodée dans le code-barres.",
    helpItemBarcode: 'Type de code-barres',
    helpItemBarcodeDesc:
      "Le format d'encodage de votre carte. En cas de doute, utilisez Code 128 — il fonctionne avec la plupart des scanners. Vous pouvez aussi scanner la carte et le format sera détecté automatiquement.",
    closeHelp: "Fermer l'aide",
  },

  cardConfirm: {
    saveCard: 'Enregistrer la carte',
    noScanError: "Aucun code scanné trouvé. Veuillez d'abord scanner un code.",
    rotatingWarning:
      'Ce code ressemble à un jeton temporaire. Il pourrait ne pas fonctionner lors de sa prochaine utilisation.',
  },

  cardEdit: {
    headerTitle: 'Modifier la carte',
    updateCard: 'Mettre à jour la carte',
    notFound: 'Carte introuvable',
    deleteLabel: 'Supprimer cette carte',
    deleteText: 'Supprimer la carte',
  },

  scan: {
    headerTitle: 'Scanner une carte',
    closeLabel: 'Fermer le scanner',
    enterManuallyLabel: 'Saisir la carte manuellement',
    enterManuallyText: 'Saisir manuellement',
    noCamera: 'Aucune caméra disponible sur cet appareil',
    quickTipBold: 'Conseil rapide  ',
    quickTip: "Assurez-vous d'être dans un endroit bien éclairé pour une détection optimale.",
  },

  form: {
    storeName: 'NOM DU MAGASIN',
    storeNamePlaceholder: 'ex. Blue Bottle Coffee',
    storeNameLabel: 'Nom du magasin',
    cardCode: 'NUMÉRO / CODE DE LA CARTE',
    cardCodePlaceholder: 'Scanner ou saisir les chiffres',
    cardCodeLabel: 'Numéro ou code de la carte',
    clearCode: 'Effacer le code',
    barcodeType: 'TYPE DE CODE-BARRES',
    color: 'COULEUR',
    colorNone: 'Aucune',
    cardColor: 'Couleur de la carte',
    defaultColor: 'Couleur par défaut',
    cardPreview: 'APERÇU DE LA CARTE',
    enterDetailsAbove: 'SAISISSEZ LES DÉTAILS CI-DESSUS',
    favoriteLabel: 'Marquer comme favori',
    favoriteSub: 'Épingler cette carte sur votre tableau de bord',
    favoriteAccessibility: 'Marquer comme favori',
    addFavorite: 'Ajouter aux favoris',
    removeFavorite: 'Retirer des favoris',
    selectBarcodeType: 'Sélectionner le type de code-barres',
    validationNameRequired: 'Le nom de la carte est requis',
    validationNameTooLong: 'Le nom de la carte doit contenir 50 caractères ou moins',
    validationCodeRequired: 'Le code de la carte est requis',
  },

  empty: {
    title: 'Commencez votre portefeuille numérique',
    subtitle:
      'Une façon plus simple de gérer vos essentiels. Stockez vos cartes principales en toute sécurité et accédez-y avec élégance.',
    addFirstCard: 'Ajouter votre première carte',
    addFirstLabel: 'Ajouter votre première carte de fidélité',
    importExisting: 'IMPORTER DES DONNÉES EXISTANTES',
    importLabel: 'Importer des données existantes',
  },

  camera: {
    permissionTitle: 'Accès à la caméra requis',
    permissionMessage:
      "Loyus a besoin d'accéder à la caméra pour scanner les codes-barres des cartes de fidélité.",
    grantAccess: "Autoriser l'accès à la caméra",
    grantLabel: "Autoriser l'accès à la caméra pour scanner les codes-barres",
    goToSettings: 'Aller dans les paramètres',
    goToSettingsLabel: "Ouvrir les paramètres de l'appareil pour autoriser la caméra",
  },

  scanner: {
    alignText: 'Alignez le code-barres dans le cadre',
  },

  copy: {
    copyNumber: 'Copier le numéro',
    copiedLabel: 'Copié dans le presse-papiers',
  },

  torch: {
    turnOn: 'Activer la lampe de poche',
    turnOff: 'Désactiver la lampe de poche',
  },

  error: {
    title: "Une erreur s'est produite",
    tryAgain: 'Réessayer',
    tryAgainLabel: 'Réessayer',
    restart: "Veuillez redémarrer l'application pour continuer.",
    barcodeRenderFailed: "Impossible d'afficher le code-barres",
    barcodeRenderHint: 'Essayez de modifier le code de la carte',
    visualNotAvailable: 'Rendu visuel indisponible',
    formatLabel: 'Format : {{format}}',
  },

  quickActions: {
    deleteTitle: 'Supprimer la carte',
    deleteMessage:
      'Êtes-vous sûr de vouloir supprimer « {{name}} » ? Cette action est irréversible.',
    favorite: 'Ajouter aux favoris',
    unfavorite: 'Retirer des favoris',
    cardActionsTitle: 'Actions sur la carte',
  },
};

export default fr;
