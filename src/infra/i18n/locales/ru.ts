import type { Translation } from '../types';

const ru: Translation = {
  common: {
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Изменить',
    save: 'Сохранить',
    close: 'Закрыть',
    goBack: 'Назад',
    gotIt: 'Понятно',
    copied: 'Скопировано!',
    viewAll: 'Смотреть всё',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Найти карту...',
    searchLabel: 'Поиск карт',
    sectionFavorites: 'ИЗБРАННОЕ',
    viewAllFavorites: 'Смотреть всё избранное',
    sectionAllCards: 'ВСЕ КАРТЫ',
    cardLevelGold: 'ЗОЛОТОЙ УРОВЕНЬ',
    cardLevelMember: 'УЧАСТНИК',
    addCardLabel: 'Добавить карту',
    switchList: 'Переключить на вид списка',
    switchGrid: 'Переключить на вид сетки',
  },

  search: {
    placeholder: 'Найти карту...',
    cancelText: 'Отмена',
    sectionRecent: 'НЕДАВНИЕ',
    clearRecents: 'Очистить',
    sectionBrowse: 'ОБЗОР',
    categoryAll: 'Все карты',
    categoryFavorites: 'Избранное',
    categoryRecent: 'Недавно использованные',
    noCardsInCategory: 'В этой категории нет карт',
    noResultsTitle: 'Нет результатов для «{{query}}»',
    noResultsSub: 'Попробуйте другое название или проверьте правописание',
    searchFor: 'Поиск {{term}}',
  },

  settings: {
    title: 'Настройки',
    subtitle: 'Управляйте данными, внешним видом и настройками конфиденциальности.',
    sectionVisual: 'ВИЗУАЛЬНАЯ СРЕДА',
    appearanceTitle: 'Внешний вид',
    themeSystem: 'Системная тема',
    themeLight: 'Светлая тема',
    themeDark: 'Тёмная тема',
    pillLight: 'Светлая',
    pillDark: 'Тёмная',
    sectionLanguage: 'ЯЗЫК',
    languageTitle: 'Язык',
    languageAuto: 'По умолчанию системы',
    languageCurrent: 'Русский',
    sectionSync: 'СИНХРОНИЗАЦИЯ',
    cloudSyncTitle: 'Облачная синхронизация',
    cloudSyncDesc:
      'Безопасно синхронизируйте данные вашего кошелька на всех авторизованных устройствах с сквозным шифрованием.',
    cloudSyncBadge: 'АКТИВНО',
    configureIcloud: 'Настроить iCloud',
    privacyTitle: 'Конфиденциальность прежде всего',
    privacyDesc:
      'Ваши данные никогда не покидают устройство в незашифрованном виде. Мы не отслеживаем ваши финансовые привычки.',
    privacyLink: 'Политика конфиденциальности',
    sectionData: 'ПЕРЕНОС ДАННЫХ',
    exportTitle: 'Экспорт резервной копии',
    exportDesc: 'Создать защищённый .json файл вашего кошелька',
    exportLabel: 'Экспортировать все карты в JSON',
    importTitle: 'Импорт данных',
    importDesc: 'Восстановить кошелёк из предыдущей резервной копии',
    importLabel: 'Импортировать данные',
    footerTerms: 'УСЛОВИЯ ИСПОЛЬЗОВАНИЯ',
    footerPrivacy: 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
    footerSecurity: 'БЕЗОПАСНОСТЬ',
    version: 'Loyus v{{version}} • Создан для конфиденциальности',
    exportFailedTitle: 'Ошибка экспорта',
    errorUnexpected: 'Произошла непредвиденная ошибка.',
  },

  cardDetail: {
    notFound: 'Карта не найдена',
    closeLabel: 'Закрыть просмотр штрих-кода',
    brightnessLabel: 'Яркость экрана увеличена для сканирования',
    brightnessInstruction: 'ЯРКОСТЬ ЭКРАНА УВЕЛИЧЕНА ДЛЯ СКАНИРОВАНИЯ',
    instruction: 'ПОМЕСТИТЕ КОД В РАМКУ.\nЯРКОСТЬ ЭКРАНА УВЕЛИЧЕНА ДЛЯ НАДЁЖНОСТИ.',
    secureMode: 'ЗАЩИЩЁННЫЙ РЕЖИМ КОШЕЛЬКА',
    edit: 'ИЗМЕНИТЬ',
    editLabel: 'Изменить карту',
    rotate: 'Повернуть',
    rotated: 'Повёрнуто',
    rotateLabel: 'Повернуть штрих-код',
    resetRotateLabel: 'Сбросить ориентацию штрих-кода',
    barcodeCardLabel: 'Карта со штрих-кодом {{name}}',
  },

  cardAdd: {
    headerTitle: 'Ручной ввод',
    closeLabel: 'Закрыть',
    helpLabel: 'Помощь',
    saveCard: 'Сохранить карту',
    helpModalTitle: 'Как заполнить эту форму',
    helpItemStoreName: 'Название магазина',
    helpItemStoreDesc:
      'Название магазина или программы лояльности (например, «Blue Bottle Coffee»). Используется для идентификации карты в списке.',
    helpItemCode: 'Номер / Код карты',
    helpItemCodeDesc:
      'Номер, напечатанный на карте лояльности, или отсканируйте штрих-код с помощью вкладки «Сканировать». Это значение, закодированное в штрих-коде.',
    helpItemBarcode: 'Тип штрих-кода',
    helpItemBarcodeDesc:
      'Формат кодирования вашей карты. Если не уверены, используйте Code 128 — он работает с большинством сканеров. Вы также можете отсканировать карту, и формат будет определён автоматически.',
    closeHelp: 'Закрыть помощь',
  },

  cardConfirm: {
    saveCard: 'Сохранить карту',
    noScanError: 'Отсканированный код не найден. Пожалуйста, сначала отсканируйте код.',
    rotatingWarning:
      'Этот код похож на временный токен. Он может не работать при следующей попытке использования.',
  },

  cardEdit: {
    headerTitle: 'Изменить карту',
    updateCard: 'Обновить карту',
    notFound: 'Карта не найдена',
    deleteLabel: 'Удалить эту карту',
    deleteText: 'Удалить карту',
  },

  scan: {
    headerTitle: 'Сканировать карту',
    closeLabel: 'Закрыть сканер',
    enterManuallyLabel: 'Ввести карту вручную',
    enterManuallyText: 'Ввести вручную',
    noCamera: 'На этом устройстве нет камеры',
    quickTipBold: 'Быстрый совет  ',
    quickTip: 'Убедитесь, что находитесь в хорошо освещённом месте для быстрого распознавания',
  },

  form: {
    storeName: 'НАЗВАНИЕ МАГАЗИНА',
    storeNamePlaceholder: 'например, Blue Bottle Coffee',
    storeNameLabel: 'Название магазина',
    cardCode: 'НОМЕР / КОД КАРТЫ',
    cardCodePlaceholder: 'Сканировать или ввести цифры',
    cardCodeLabel: 'Номер или код карты',
    clearCode: 'Очистить код',
    barcodeType: 'ТИП ШТРИХ-КОДА',
    color: 'ЦВЕТ',
    colorNone: 'Нет',
    cardColor: 'Цвет карты',
    defaultColor: 'Цвет по умолчанию',
    cardPreview: 'ПРЕДПРОСМОТР КАРТЫ',
    enterDetailsAbove: 'ВВЕДИТЕ ДАННЫЕ ВЫШЕ',
    favoriteLabel: 'Отметить как избранное',
    favoriteSub: 'Закрепить эту карту на панели управления',
    favoriteAccessibility: 'Отметить как избранное',
    addFavorite: 'Добавить в избранное',
    removeFavorite: 'Убрать из избранного',
    selectBarcodeType: 'Выбрать тип штрих-кода',
    validationNameRequired: 'Название карты обязательно',
    validationNameTooLong: 'Название карты должно содержать не более 50 символов',
    validationCodeRequired: 'Код карты обязателен',
  },

  empty: {
    title: 'Начните свой цифровой кошелёк',
    subtitle:
      'Более удобный способ управления важными вещами. Безопасно храните основные карты и получайте к ним доступ с лёгкостью.',
    addFirstCard: 'Добавить первую карту',
    addFirstLabel: 'Добавить первую карту лояльности',
    importExisting: 'ИМПОРТИРОВАТЬ СУЩЕСТВУЮЩИЕ ДАННЫЕ',
    importLabel: 'Импортировать существующие данные',
  },

  camera: {
    permissionTitle: 'Требуется доступ к камере',
    permissionMessage:
      'Loyus требует доступ к камере для сканирования штрих-кодов карт лояльности.',
    grantAccess: 'Разрешить доступ к камере',
    grantLabel: 'Разрешить доступ к камере для сканирования штрих-кодов',
    goToSettings: 'Перейти в настройки',
    goToSettingsLabel: 'Открыть настройки устройства для разрешения доступа к камере',
  },

  scanner: {
    alignText: 'Наведите штрих-код в рамку',
  },

  copy: {
    copyNumber: 'Копировать номер',
    copiedLabel: 'Скопировано в буфер обмена',
  },

  torch: {
    turnOn: 'Включить фонарик',
    turnOff: 'Выключить фонарик',
  },

  error: {
    title: 'Что-то пошло не так',
    tryAgain: 'Попробовать снова',
    tryAgainLabel: 'Попробовать снова',
    restart: 'Пожалуйста, перезапустите приложение для продолжения.',
    barcodeRenderFailed: 'Не удалось отобразить штрих-код',
    barcodeRenderHint: 'Попробуйте изменить код карты',
    visualNotAvailable: 'Визуальный рендеринг недоступен',
    formatLabel: 'Формат: {{format}}',
  },

  quickActions: {
    deleteTitle: 'Удалить карту',
    deleteMessage: 'Вы уверены, что хотите удалить «{{name}}»? Это действие нельзя отменить.',
    favorite: 'В избранное',
    unfavorite: 'Убрать из избранного',
    cardActionsTitle: 'Действия с картой',
  },
};

export default ru;
