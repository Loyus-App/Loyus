import { ActionSheetIOS, Alert, Platform } from 'react-native';
import type { Card } from '../../domain/card';
import { i18n } from '../../infra/i18n';

/**
 * Show a native confirmation dialog before deleting a card.
 * Uses Alert.alert which renders natively on both iOS and Android.
 */
export function confirmDelete(cardName: string, onConfirm: () => void): void {
  Alert.alert(
    i18n.t('quickActions.deleteTitle'),
    i18n.t('quickActions.deleteMessage', { name: cardName }),
    [
      { text: i18n.t('common.cancel'), style: 'cancel' },
      { text: i18n.t('common.delete'), style: 'destructive', onPress: onConfirm },
    ],
  );
}

/**
 * Show platform-appropriate quick actions for a card (long-press menu).
 * iOS: native ActionSheetIOS. Android: Alert with buttons.
 */
export function showQuickActions(
  card: Card,
  actions: {
    onFavorite: () => void;
    onEdit: () => void;
    onDelete: () => void;
  },
): void {
  const favoriteLabel = card.isFavorite
    ? i18n.t('quickActions.unfavorite')
    : i18n.t('quickActions.favorite');

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          favoriteLabel,
          i18n.t('common.edit'),
          i18n.t('common.delete'),
          i18n.t('common.cancel'),
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
      },
      (index) => {
        if (index === 0) actions.onFavorite();
        if (index === 1) actions.onEdit();
        if (index === 2) actions.onDelete();
      },
    );
  } else {
    Alert.alert(i18n.t('quickActions.cardActionsTitle'), undefined, [
      { text: favoriteLabel, onPress: actions.onFavorite },
      { text: i18n.t('common.edit'), onPress: actions.onEdit },
      { text: i18n.t('common.delete'), style: 'destructive', onPress: actions.onDelete },
      { text: i18n.t('common.cancel'), style: 'cancel' },
    ]);
  }
}
