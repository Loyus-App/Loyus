import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function CancelToolbar(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack.Toolbar placement="left">
      <Stack.Toolbar.Button onPress={() => router.back()}>
        {t('common.cancel')}
      </Stack.Toolbar.Button>
    </Stack.Toolbar>
  );
}
