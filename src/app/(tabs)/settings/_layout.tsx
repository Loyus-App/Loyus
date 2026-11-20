import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { tabStackOptions } from '@/shared/ui/stackOptions';

export default function SettingsLayout(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={tabStackOptions}>
      <Stack.Screen name="index" options={{ title: t('settings.title'), headerShown: false }} />
      <Stack.Screen
        name="language"
        options={{ title: t('settings.language'), headerLargeTitle: false }}
      />
      <Stack.Screen
        name="accent"
        options={{ title: t('settings.accent'), headerLargeTitle: false }}
      />
      <Stack.Screen
        name="app-icon"
        options={{ title: t('settings.appIcon'), headerLargeTitle: false }}
      />
      <Stack.Screen
        name="about"
        options={{ title: t('settings.about'), headerLargeTitle: false }}
      />
    </Stack>
  );
}
