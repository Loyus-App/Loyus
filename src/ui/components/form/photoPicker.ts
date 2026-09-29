import {
  type ImagePickerOptions,
  type ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { ActionSheetIOS, Alert, Linking, Platform } from 'react-native';
import { i18n } from '@/infra/i18n';
import { type SheetAction, useUiStore } from '@/state/stores/uiStore';

const PICKER_OPTIONS: ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: false,
  quality: 0.7,
};

function firstUri(result: ImagePickerResult): string | null {
  return result.canceled ? null : (result.assets[0]?.uri ?? null);
}

function explainCameraDenied(): void {
  Alert.alert(i18n.t('photos.cameraDeniedTitle'), i18n.t('photos.cameraDeniedBody'), [
    { text: i18n.t('common.cancel'), style: 'cancel' },
    {
      text: i18n.t('camera.openSettings'),
      onPress: () => {
        Linking.openSettings().catch(() => undefined);
      },
    },
  ]);
}

export async function takePhoto(): Promise<string | null> {
  const permission = await requestCameraPermissionsAsync();
  if (!permission.granted) {
    explainCameraDenied();
    return null;
  }
  return firstUri(await launchCameraAsync(PICKER_OPTIONS));
}

export async function choosePhoto(): Promise<string | null> {
  return firstUri(await launchImageLibraryAsync(PICKER_OPTIONS));
}

export function showPhotoFailed(): void {
  Alert.alert(i18n.t('photos.failedTitle'), i18n.t('photos.failedBody'));
}

export function showPhotoSheet(title: string, actions: readonly SheetAction[]): void {
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
