import {
  getAppIconName,
  setAlternateAppIcon,
  supportsAlternateIcons,
} from 'expo-alternate-app-icons';
import { Platform } from 'react-native';
import {
  type AppIconName,
  appIconFromNative,
  DEFAULT_APP_ICON,
  nativeIconName,
} from '@/entities/settings/domain/appIcon';

export const canChangeAppIcon: boolean = Platform.OS === 'ios' && supportsAlternateIcons;

export function readAppIcon(): AppIconName {
  return appIconFromNative(getAppIconName());
}

export async function writeAppIcon(name: AppIconName): Promise<void> {
  await setAlternateAppIcon(name === DEFAULT_APP_ICON ? null : nativeIconName(name));
}
