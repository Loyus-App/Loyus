import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { Icon, icons, PressableScale, Text } from '@/shared/ui/primitives';

export function ReorderButton(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <PressableScale
      onPress={() => router.push('/reorder')}
      accessibilityRole="button"
      accessibilityLabel={t('reorder.title')}
      containerStyle={styles.shrink}
      style={styles.button}
    >
      <Icon name={icons.reorder} size={14} tone="accent" />
      <Text
        variant="callout"
        weight="semibold"
        tone="accent"
        numberOfLines={1}
        style={styles.shrink}
      >
        {t('home.reorder')}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  shrink: {
    flexShrink: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(1.5),
    minHeight: theme.size.touch,
    paddingRight: theme.space(2),
  },
}));
