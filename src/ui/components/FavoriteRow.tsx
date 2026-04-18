import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Switch, Text, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

export interface FavoriteRowProps {
  isFavorite: boolean;
  onToggle: (value: boolean) => void;
}

export function FavoriteRow({ isFavorite, onToggle }: FavoriteRowProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  return (
    <View style={styles.row}>
      <Ionicons
        name={isFavorite ? 'star' : 'star-outline'}
        size={22}
        color={isFavorite ? theme.colors.primary : theme.colors.textTertiary}
      />
      <View style={styles.text}>
        <Text style={styles.label}>{t('form.favoriteLabel')}</Text>
        <Text style={styles.subtitle}>{t('form.favoriteSub')}</Text>
      </View>
      <Switch
        value={isFavorite}
        onValueChange={onToggle}
        trackColor={{ true: theme.colors.primary, false: theme.colors.containerHigh }}
        thumbColor={theme.colors.containerLowest}
        accessibilityLabel={t('form.favoriteAccessibility')}
        {...tid('markFavoriteToggle')}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.md,
    ...theme.subtleShadow,
  },
  text: {
    flex: 1,
  },
  label: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
}));
