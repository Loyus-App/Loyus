import {
  type ImagePickerOptions,
  type ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { Alert, Linking } from 'react-native';
import { i18n } from '@/infra/i18n';
import { ignore } from './ignore';

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
        Linking.openSettings().catch(ignore);
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

export async function choosePhoto(
  options: ImagePickerOptions = PICKER_OPTIONS,
): Promise<string | null> {
  return firstUri(await launchImageLibraryAsync(options));
}

export function showPhotoFailed(): void {
  Alert.alert(i18n.t('photos.failedTitle'), i18n.t('photos.failedBody'));
}
