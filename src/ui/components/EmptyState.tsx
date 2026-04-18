import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

interface EmptyStateProps {
  onAddCard: () => void;
}

export function EmptyState({ onAddCard }: EmptyStateProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      {/* Card Illustration */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.card}>
          {/* Top row */}
          <View style={styles.cardTop}>
            <View style={styles.walletIconBox}>
              <Ionicons name="wallet-outline" size={22} color={theme.colors.textOnPrimary} />
            </View>
            <Ionicons name="stats-chart-outline" size={16} color="rgba(255,255,255,0.5)" />
          </View>
          {/* Card lines */}
          <View style={styles.cardLines}>
            <View style={styles.cardLine} />
            <View style={[styles.cardLine, styles.cardLineShort]} />
          </View>
        </View>
        {/* Shield badge overlapping bottom-right */}
        <View style={styles.shieldBadge}>
          <Ionicons name="shield-checkmark" size={20} color={theme.colors.primary} />
        </View>
      </View>

      {/* Text */}
      <Text style={styles.title} accessibilityRole="header">
        {t('empty.title')}
      </Text>
      <Text style={styles.subtitle}>{t('empty.subtitle')}</Text>

      {/* CTA Button */}
      <Pressable
        onPress={onAddCard}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1 }]}
        accessibilityLabel={t('empty.addFirstLabel')}
        accessibilityRole="button"
        {...tid('emptyStateCta')}
      >
        <Ionicons name="card-outline" size={20} color={theme.colors.textOnPrimary} />
        <Text style={styles.buttonText}>{t('empty.addFirstCard')}</Text>
      </Pressable>

      {/* Import link */}
      <Pressable accessibilityLabel={t('empty.importLabel')} accessibilityRole="button">
        <Text style={styles.importText}>{t('empty.importExisting')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  illustrationWrapper: {
    marginBottom: theme.spacing.xl,
    position: 'relative',
  },
  card: {
    width: 260,
    height: 160,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
    ...theme.cardShadow,
    shadowOpacity: 0.2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletIconBox: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLines: {
    gap: 8,
  },
  cardLine: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardLineShort: {
    width: '55%',
  },
  shieldBadge: {
    position: 'absolute',
    bottom: -14,
    right: -10,
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.containerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.subtleShadow,
    shadowOpacity: 0.12,
  },
  title: {
    fontFamily: theme.typography.fontFamily.extraBold,
    fontSize: theme.typography.fontSize.hero,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl + 4,
    marginBottom: theme.spacing.lg,
    ...theme.cardShadow,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textOnPrimary,
  },
  importText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 1.5,
  },
}));
