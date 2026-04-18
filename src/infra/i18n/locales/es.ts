import type { Translation } from '../types';

const es: Translation = {
  common: {
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    save: 'Guardar',
    close: 'Cerrar',
    goBack: 'Volver',
    gotIt: 'Entendido',
    copied: '¡Copiado!',
    viewAll: 'Ver todo',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Buscar una tarjeta...',
    searchLabel: 'Buscar tarjetas',
    sectionFavorites: 'FAVORITOS',
    viewAllFavorites: 'Ver todos los favoritos',
    sectionAllCards: 'TODAS LAS TARJETAS',
    cardLevelGold: 'NIVEL ORO',
    cardLevelMember: 'MIEMBRO',
    addCardLabel: 'Agregar tarjeta',
    switchList: 'Cambiar a vista de lista',
    switchGrid: 'Cambiar a vista de cuadrícula',
  },

  search: {
    placeholder: 'Buscar una tarjeta...',
    cancelText: 'Cancelar',
    sectionRecent: 'RECIENTE',
    clearRecents: 'Limpiar',
    sectionBrowse: 'EXPLORAR',
    categoryAll: 'Todas las tarjetas',
    categoryFavorites: 'Favoritos',
    categoryRecent: 'Usadas recientemente',
    noCardsInCategory: 'No hay tarjetas en esta categoría',
    noResultsTitle: 'Sin resultados para "{{query}}"',
    noResultsSub: 'Intenta con un nombre diferente o revisa la ortografía',
    searchFor: 'Buscar {{term}}',
  },

  settings: {
    title: 'Ajustes',
    subtitle: 'Gestiona tus datos, apariencia y preferencias de privacidad con total control.',
    sectionVisual: 'ENTORNO VISUAL',
    appearanceTitle: 'Apariencia',
    themeSystem: 'Modo predeterminado del sistema',
    themeLight: 'Modo claro',
    themeDark: 'Modo oscuro',
    pillLight: 'Claro',
    pillDark: 'Oscuro',
    sectionLanguage: 'IDIOMA',
    languageTitle: 'Idioma',
    languageAuto: 'Predeterminado del sistema',
    languageCurrent: 'Español',
    sectionSync: 'SINCRONIZACIÓN',
    cloudSyncTitle: 'Sincronización en la nube',
    cloudSyncDesc:
      'Sincroniza los datos de tu cartera en todos tus dispositivos autorizados con cifrado de extremo a extremo.',
    cloudSyncBadge: 'ACTIVO',
    configureIcloud: 'Configurar iCloud',
    privacyTitle: 'La privacidad primero',
    privacyDesc:
      'Tus datos nunca salen de tu dispositivo sin cifrado. No rastreamos tus hábitos financieros.',
    privacyLink: 'Política de privacidad',
    sectionData: 'PORTABILIDAD DE DATOS',
    exportTitle: 'Exportar copia de seguridad',
    exportDesc: 'Genera un archivo .json seguro de tu cartera',
    exportLabel: 'Exportar todas las tarjetas como JSON',
    importTitle: 'Importar datos',
    importDesc: 'Restaura tu cartera desde una copia de seguridad anterior',
    importLabel: 'Importar datos',
    footerTerms: 'TÉRMINOS DE SERVICIO',
    footerPrivacy: 'POLÍTICA DE PRIVACIDAD',
    footerSecurity: 'SEGURIDAD',
    version: 'Loyus v{{version}} • Creado para la privacidad',
    exportFailedTitle: 'Error al exportar',
    errorUnexpected: 'Ocurrió un error inesperado.',
  },

  cardDetail: {
    notFound: 'Tarjeta no encontrada',
    closeLabel: 'Cerrar vista de código de barras',
    brightnessLabel: 'Brillo de pantalla aumentado para el escaneo',
    brightnessInstruction: 'BRILLO DE PANTALLA AUMENTADO PARA ESCANEO',
    instruction:
      'POSICIONA EL CÓDIGO EN EL MARCO.\nBRILLO DE PANTALLA AUMENTADO PARA MAYOR FIABILIDAD.',
    secureMode: 'MODO SEGURO DE CARTERA',
    edit: 'EDITAR',
    editLabel: 'Editar tarjeta',
    rotate: 'Rotar',
    rotated: 'Rotado',
    rotateLabel: 'Rotar código de barras',
    resetRotateLabel: 'Restablecer orientación del código de barras',
    barcodeCardLabel: 'Tarjeta de código de barras de {{name}}',
  },

  cardAdd: {
    headerTitle: 'Entrada manual',
    closeLabel: 'Cerrar',
    helpLabel: 'Ayuda',
    saveCard: 'Guardar tarjeta',
    helpModalTitle: 'Cómo rellenar este formulario',
    helpItemStoreName: 'Nombre de la tienda',
    helpItemStoreDesc:
      'El nombre de la tienda o programa de fidelidad (ej. "Blue Bottle Coffee"). Se usa para identificar tu tarjeta en la lista.',
    helpItemCode: 'Número / Código de la tarjeta',
    helpItemCodeDesc:
      'El número impreso en tu tarjeta de fidelidad, o escanea su código de barras usando la pestaña Escanear. Este es el valor codificado en el código de barras.',
    helpItemBarcode: 'Tipo de código de barras',
    helpItemBarcodeDesc:
      'El formato de codificación de tu tarjeta. Si no estás seguro, usa Code 128 — funciona con la mayoría de los lectores. También puedes escanear la tarjeta y el formato se detectará automáticamente.',
    closeHelp: 'Cerrar ayuda',
  },

  cardConfirm: {
    saveCard: 'Guardar tarjeta',
    noScanError: 'No se encontró ningún código escaneado. Por favor, escanea un código primero.',
    rotatingWarning:
      'Este código parece un token temporal. Es posible que no funcione cuando intentes usarlo más tarde.',
  },

  cardEdit: {
    headerTitle: 'Editar tarjeta',
    updateCard: 'Actualizar tarjeta',
    notFound: 'Tarjeta no encontrada',
    deleteLabel: 'Eliminar esta tarjeta',
    deleteText: 'Eliminar tarjeta',
  },

  scan: {
    headerTitle: 'Escanear tarjeta',
    closeLabel: 'Cerrar escáner',
    enterManuallyLabel: 'Ingresar tarjeta manualmente',
    enterManuallyText: 'Ingresar manualmente',
    noCamera: 'No hay cámara disponible en este dispositivo',
    quickTipBold: 'Consejo rápido  ',
    quickTip: 'Asegúrate de estar en un área bien iluminada para una detección más rápida',
  },

  form: {
    storeName: 'NOMBRE DE LA TIENDA',
    storeNamePlaceholder: 'ej. Blue Bottle Coffee',
    storeNameLabel: 'Nombre de la tienda',
    cardCode: 'NÚMERO / CÓDIGO DE LA TARJETA',
    cardCodePlaceholder: 'Escanear o escribir los dígitos',
    cardCodeLabel: 'Número o código de la tarjeta',
    clearCode: 'Borrar código',
    barcodeType: 'TIPO DE CÓDIGO DE BARRAS',
    color: 'COLOR',
    colorNone: 'Ninguno',
    cardColor: 'Color de la tarjeta',
    defaultColor: 'Color predeterminado',
    cardPreview: 'VISTA PREVIA DE TARJETA',
    enterDetailsAbove: 'INGRESE LOS DETALLES ARRIBA',
    favoriteLabel: 'Marcar como favorito',
    favoriteSub: 'Anclar esta tarjeta a tu panel',
    favoriteAccessibility: 'Marcar como favorito',
    addFavorite: 'Agregar a favoritos',
    removeFavorite: 'Quitar de favoritos',
    selectBarcodeType: 'Seleccionar tipo de código de barras',
    validationNameRequired: 'El nombre de la tarjeta es obligatorio',
    validationNameTooLong: 'El nombre de la tarjeta debe tener 50 caracteres o menos',
    validationCodeRequired: 'El código de la tarjeta es obligatorio',
  },

  empty: {
    title: 'Comienza tu cartera digital',
    subtitle:
      'Una forma más ordenada de gestionar tus esenciales. Almacena tus tarjetas principales de forma segura y accede a ellas con facilidad.',
    addFirstCard: 'Agrega tu primera tarjeta',
    addFirstLabel: 'Agregar tu primera tarjeta de fidelidad',
    importExisting: 'IMPORTAR DATOS EXISTENTES',
    importLabel: 'Importar datos existentes',
  },

  camera: {
    permissionTitle: 'Se necesita acceso a la cámara',
    permissionMessage:
      'Loyus necesita acceso a la cámara para escanear códigos de barras de tarjetas de fidelidad.',
    grantAccess: 'Conceder acceso a la cámara',
    grantLabel: 'Conceder acceso a la cámara para escanear códigos de barras',
    goToSettings: 'Ir a ajustes',
    goToSettingsLabel: 'Abrir los ajustes del dispositivo para conceder acceso a la cámara',
  },

  scanner: {
    alignText: 'Alinea el código de barras en el marco',
  },

  copy: {
    copyNumber: 'Copiar número',
    copiedLabel: 'Copiado al portapapeles',
  },

  torch: {
    turnOn: 'Encender linterna',
    turnOff: 'Apagar linterna',
  },

  error: {
    title: 'Algo salió mal',
    tryAgain: 'Intentar de nuevo',
    tryAgainLabel: 'Intentar de nuevo',
    restart: 'Por favor, reinicia la aplicación para continuar.',
    barcodeRenderFailed: 'No se puede mostrar el código de barras',
    barcodeRenderHint: 'Intenta editar el código de la tarjeta',
    visualNotAvailable: 'Representación visual no disponible',
    formatLabel: 'Formato: {{format}}',
  },

  quickActions: {
    deleteTitle: 'Eliminar tarjeta',
    deleteMessage:
      '¿Estás seguro de que deseas eliminar "{{name}}"? Esta acción no se puede deshacer.',
    favorite: 'Favorito',
    unfavorite: 'Quitar de favoritos',
    cardActionsTitle: 'Acciones de tarjeta',
  },
};

export default es;
