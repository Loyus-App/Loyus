import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { tabStackOptions } from '@/ui/navigation/stackOptions';

export default function SearchLayout(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={tabStackOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: t('search.title'),
          headerTitle: '',
          headerLargeTitle: false,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
