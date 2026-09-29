import { router } from 'expo-router';
import {
  type AccessibilityActionEvent,
  type AccessibilityActionInfo,
  Alert,
  Share,
} from 'react-native';
import { type Card, FORMAT_LABEL } from '@/domain/card';
import { i18n } from '@/infra/i18n';
import { useCardStore } from '@/state/stores/cardStore';
import type { SheetAction } from '@/state/stores/uiStore';
import type { CardFormValues } from '@/ui/components/form/useCardForm';
import { showActionSheet } from './actionSheet';
import { haptics } from './haptics';
import { ignore } from './ignore';

export function saveNewCard(values: CardFormValues): void {
  useCardStore.getState().addCard(values);
  haptics.success();
  router.dismissTo('/');
}

export function editCard(card: Card): void {
  router.push(`/card/edit/${card.id}`);
}

export function togglePin(card: Card): void {
  haptics.selection();
  useCardStore.getState().togglePinned(card.id);
}

export function shareCard(card: Card): void {
  Share.share({
    message: i18n.t('cardActions.shareMessage', {
      name: card.name,
      code: card.code,
      format: FORMAT_LABEL[card.format],
    }),
  }).catch(ignore);
}

export function confirmDeleteCard(card: Card, onDeleted?: () => void): void {
  Alert.alert(
    i18n.t('cardActions.deleteTitle'),
    i18n.t('cardActions.deleteMessage', { name: card.name }),
    [
      { text: i18n.t('common.cancel'), style: 'cancel' },
      {
        text: i18n.t('cardActions.delete'),
        style: 'destructive',
        onPress: () => {
          haptics.warning();
          useCardStore.getState().removeCard(card.id);
          onDeleted?.();
        },
      },
    ],
  );
}

type CardAction = SheetAction & { readonly name: 'pin' | 'edit' | 'share' | 'delete' };

function cardActionList(card: Card): CardAction[] {
  return [
    {
      name: 'pin',
      label: i18n.t(card.isPinned ? 'cardActions.unpin' : 'cardActions.pin'),
      run: () => togglePin(card),
    },
    { name: 'edit', label: i18n.t('cardActions.edit'), run: () => editCard(card) },
    { name: 'share', label: i18n.t('cardActions.share'), run: () => shareCard(card) },
    {
      name: 'delete',
      label: i18n.t('cardActions.delete'),
      run: () => confirmDeleteCard(card),
      destructive: true,
    },
  ];
}

export function showCardActions(card: Card): void {
  haptics.impact();
  showActionSheet(card.name, cardActionList(card));
}

export function cardAccessibilityActions(card: Card): {
  accessibilityActions: AccessibilityActionInfo[];
  onAccessibilityAction: (event: AccessibilityActionEvent) => void;
} {
  const actions = cardActionList(card);
  return {
    accessibilityActions: actions.map(({ name, label }) => ({ name, label })),
    onAccessibilityAction: (event) =>
      actions.find((action) => action.name === event.nativeEvent.actionName)?.run(),
  };
}
