import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

export function SaveToolbar({ onPress }: { readonly onPress: () => void }): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  return (
    <Stack.Toolbar placement="right">
      <Stack.Toolbar.Button variant="done" tintColor={theme.colors.accent} onPress={onPress}>
        {t('common.save')}
      </Stack.Toolbar.Button>
    </Stack.Toolbar>
  );
}
