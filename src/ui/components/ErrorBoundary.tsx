import type { ErrorBoundaryProps } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '../primitives/Button';
import { EmptyState } from '../primitives/EmptyState';
import { icons } from '../primitives/icons';

export function ErrorBoundary({ retry }: ErrorBoundaryProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.screen}>
      <EmptyState icon={icons.warning} title={t('error.title')} body={t('error.body')}>
        <Button label={t('error.retry')} onPress={() => retry().catch(() => undefined)} />
      </EmptyState>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
}));
