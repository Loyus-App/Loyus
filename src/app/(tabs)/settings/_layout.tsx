import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { tabStackOptions } from '@/ui/navigation/stackOptions';

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
    </Stack>
  );
}
