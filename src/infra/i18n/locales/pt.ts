import type { Translation } from '../types';

const pt: Translation = {
  common: {
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    save: 'Salvar',
    close: 'Fechar',
    goBack: 'Voltar',
    gotIt: 'Entendi',
    copied: 'Copiado!',
    viewAll: 'Ver tudo',
  },

  home: {
    title: 'Loyus',
    searchPlaceholder: 'Encontrar um cartão...',
    searchLabel: 'Pesquisar cartões',
    sectionFavorites: 'FAVORITOS',
    viewAllFavorites: 'Ver todos os favoritos',
    sectionAllCards: 'TODOS OS CARTÕES',
    cardLevelGold: 'NÍVEL OURO',
    cardLevelMember: 'MEMBRO',
    addCardLabel: 'Adicionar cartão',
    switchList: 'Alternar para visualização em lista',
    switchGrid: 'Alternar para visualização em grade',
  },

  search: {
    placeholder: 'Encontrar um cartão...',
    cancelText: 'Cancelar',
    sectionRecent: 'RECENTE',
    clearRecents: 'Limpar',
    sectionBrowse: 'EXPLORAR',
    categoryAll: 'Todos os cartões',
    categoryFavorites: 'Favoritos',
    categoryRecent: 'Usados recentemente',
    noCardsInCategory: 'Nenhum cartão nesta categoria',
    noResultsTitle: 'Nenhum resultado para "{{query}}"',
    noResultsSub: 'Tente um nome diferente ou verifique a ortografia',
    searchFor: 'Pesquisar {{term}}',
  },

  settings: {
    title: 'Configurações',
    subtitle: 'Gerencie seus dados, aparência e preferências de privacidade com total controle.',
    sectionVisual: 'AMBIENTE VISUAL',
    appearanceTitle: 'Aparência',
    themeSystem: 'Modo padrão do sistema',
    themeLight: 'Modo claro',
    themeDark: 'Modo escuro',
    pillLight: 'Claro',
    pillDark: 'Escuro',
    sectionLanguage: 'IDIOMA',
    languageTitle: 'Idioma',
    languageAuto: 'Padrão do sistema',
    languageCurrent: 'Português',
    sectionSync: 'SINCRONIZAÇÃO',
    cloudSyncTitle: 'Sincronização na nuvem',
    cloudSyncDesc:
      'Sincronize os dados da sua carteira em todos os seus dispositivos autorizados com criptografia de ponta a ponta.',
    cloudSyncBadge: 'ATIVO',
    configureIcloud: 'Configurar iCloud',
    privacyTitle: 'Privacidade em primeiro lugar',
    privacyDesc:
      'Seus dados nunca saem do seu dispositivo sem criptografia. Não rastreamos seus hábitos financeiros.',
    privacyLink: 'Política de privacidade',
    sectionData: 'PORTABILIDADE DE DADOS',
    exportTitle: 'Exportar backup',
    exportDesc: 'Gerar um arquivo .json seguro da sua carteira',
    exportLabel: 'Exportar todos os cartões como JSON',
    importTitle: 'Importar dados',
    importDesc: 'Restaurar sua carteira a partir de um backup anterior',
    importLabel: 'Importar dados',
    footerTerms: 'TERMOS DE SERVIÇO',
    footerPrivacy: 'POLÍTICA DE PRIVACIDADE',
    footerSecurity: 'SEGURANÇA',
    version: 'Loyus v{{version}} • Criado para privacidade',
    exportFailedTitle: 'Falha na exportação',
    errorUnexpected: 'Ocorreu um erro inesperado.',
  },

  cardDetail: {
    notFound: 'Cartão não encontrado',
    closeLabel: 'Fechar visualização do código de barras',
    brightnessLabel: 'Brilho da tela aumentado para leitura',
    brightnessInstruction: 'BRILHO DA TELA AUMENTADO PARA LEITURA',
    instruction:
      'POSICIONE O CÓDIGO NO QUADRO.\nBRILHO DA TELA AUMENTADO PARA MAIOR CONFIABILIDADE.',
    secureMode: 'MODO SEGURO DA CARTEIRA',
    edit: 'EDITAR',
    editLabel: 'Editar cartão',
    rotate: 'Girar',
    rotated: 'Girado',
    rotateLabel: 'Girar código de barras',
    resetRotateLabel: 'Redefinir orientação do código de barras',
    barcodeCardLabel: 'Cartão de código de barras de {{name}}',
  },

  cardAdd: {
    headerTitle: 'Entrada manual',
    closeLabel: 'Fechar',
    helpLabel: 'Ajuda',
    saveCard: 'Salvar cartão',
    helpModalTitle: 'Como preencher este formulário',
    helpItemStoreName: 'Nome da loja',
    helpItemStoreDesc:
      'O nome da loja ou programa de fidelidade (ex. "Blue Bottle Coffee"). Usado para identificar seu cartão na lista.',
    helpItemCode: 'Número / Código do cartão',
    helpItemCodeDesc:
      'O número impresso no seu cartão de fidelidade, ou escaneie seu código de barras usando a guia Escanear. Este é o valor codificado no código de barras.',
    helpItemBarcode: 'Tipo de código de barras',
    helpItemBarcodeDesc:
      'O formato de codificação do seu cartão. Em caso de dúvida, use o Code 128 — funciona com a maioria dos leitores. Você também pode escanear o cartão e o formato será detectado automaticamente.',
    closeHelp: 'Fechar ajuda',
  },

  cardConfirm: {
    saveCard: 'Salvar cartão',
    noScanError: 'Nenhum código escaneado encontrado. Por favor, escaneie um código primeiro.',
    rotatingWarning:
      'Este código parece ser um token temporário. Ele pode não funcionar quando você tentar usá-lo mais tarde.',
  },

  cardEdit: {
    headerTitle: 'Editar cartão',
    updateCard: 'Atualizar cartão',
    notFound: 'Cartão não encontrado',
    deleteLabel: 'Excluir este cartão',
    deleteText: 'Excluir cartão',
  },

  scan: {
    headerTitle: 'Escanear cartão',
    closeLabel: 'Fechar scanner',
    enterManuallyLabel: 'Inserir cartão manualmente',
    enterManuallyText: 'Inserir manualmente',
    noCamera: 'Nenhuma câmera disponível neste dispositivo',
    quickTipBold: 'Dica rápida  ',
    quickTip: 'Certifique-se de estar em uma área bem iluminada para a detecção mais rápida',
  },

  form: {
    storeName: 'NOME DA LOJA',
    storeNamePlaceholder: 'ex. Blue Bottle Coffee',
    storeNameLabel: 'Nome da loja',
    cardCode: 'NÚMERO / CÓDIGO DO CARTÃO',
    cardCodePlaceholder: 'Escanear ou digitar os dígitos',
    cardCodeLabel: 'Número ou código do cartão',
    clearCode: 'Limpar código',
    barcodeType: 'TIPO DE CÓDIGO DE BARRAS',
    color: 'COR',
    colorNone: 'Nenhuma',
    cardColor: 'Cor do cartão',
    defaultColor: 'Cor padrão',
    cardPreview: 'PRÉ-VISUALIZAÇÃO DO CARTÃO',
    enterDetailsAbove: 'INSIRA OS DETALHES ACIMA',
    favoriteLabel: 'Marcar como favorito',
    favoriteSub: 'Fixar este cartão no seu painel',
    favoriteAccessibility: 'Marcar como favorito',
    addFavorite: 'Adicionar aos favoritos',
    removeFavorite: 'Remover dos favoritos',
    selectBarcodeType: 'Selecionar tipo de código de barras',
    validationNameRequired: 'O nome do cartão é obrigatório',
    validationNameTooLong: 'O nome do cartão deve ter 50 caracteres ou menos',
    validationCodeRequired: 'O código do cartão é obrigatório',
  },

  empty: {
    title: 'Comece sua carteira digital',
    subtitle:
      'Uma forma mais organizada de gerenciar seus essenciais. Armazene seus cartões principais com segurança e acesse-os com facilidade.',
    addFirstCard: 'Adicionar seu primeiro cartão',
    addFirstLabel: 'Adicionar seu primeiro cartão de fidelidade',
    importExisting: 'IMPORTAR DADOS EXISTENTES',
    importLabel: 'Importar dados existentes',
  },

  camera: {
    permissionTitle: 'Acesso à câmera necessário',
    permissionMessage:
      'O Loyus precisa de acesso à câmera para escanear códigos de barras de cartões de fidelidade.',
    grantAccess: 'Conceder acesso à câmera',
    grantLabel: 'Conceder acesso à câmera para escanear códigos de barras',
    goToSettings: 'Ir para configurações',
    goToSettingsLabel: 'Abrir as configurações do dispositivo para conceder acesso à câmera',
  },

  scanner: {
    alignText: 'Alinhe o código de barras no quadro',
  },

  copy: {
    copyNumber: 'Copiar número',
    copiedLabel: 'Copiado para a área de transferência',
  },

  torch: {
    turnOn: 'Ligar lanterna',
    turnOff: 'Desligar lanterna',
  },

  error: {
    title: 'Algo deu errado',
    tryAgain: 'Tentar novamente',
    tryAgainLabel: 'Tentar novamente',
    restart: 'Por favor, reinicie o aplicativo para continuar.',
    barcodeRenderFailed: 'Não foi possível exibir o código de barras',
    barcodeRenderHint: 'Tente editar o código do cartão',
    visualNotAvailable: 'Renderização visual indisponível',
    formatLabel: 'Formato: {{format}}',
  },

  quickActions: {
    deleteTitle: 'Excluir cartão',
    deleteMessage: 'Tem certeza de que deseja excluir "{{name}}"? Esta ação não pode ser desfeita.',
    favorite: 'Favorito',
    unfavorite: 'Remover dos favoritos',
    cardActionsTitle: 'Ações do cartão',
  },
};

export default pt;
