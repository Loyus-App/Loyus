import { ActionSheetIOS, Platform } from 'react-native';
import { i18n } from '@/infra/i18n';
import { type SheetAction, useUiStore } from '@/state/stores/uiStore';

export function showActionSheet(title: string, actions: readonly SheetAction[]): void {
  if (Platform.OS !== 'ios') {
    useUiStore.getState().showActionSheet({ title, actions });
    return;
  }
  const destructive = actions.findIndex((action) => action.destructive);
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title,
      options: [...actions.map((action) => action.label), i18n.t('common.cancel')],
      ...(destructive >= 0 ? { destructiveButtonIndex: destructive } : {}),
      cancelButtonIndex: actions.length,
    },
    (index) => actions[index]?.run(),
  );
}
