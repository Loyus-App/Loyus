import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { tabStackOptions } from '@/ui/navigation/stackOptions';

export default function CardsLayout(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={tabStackOptions}>
      <Stack.Screen name="index" options={{ title: t('home.title'), headerShown: false }} />
    </Stack>
  );
}
