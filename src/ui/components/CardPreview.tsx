import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import type { BarcodeFormat } from '../../domain/card';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';
import { BarcodeErrorBoundary } from './BarcodeErrorBoundary';
import { BarcodeRenderer } from './BarcodeRenderer';

interface CardPreviewProps {
  name: string;
  code: string;
  format: BarcodeFormat;
}

export function CardPreview({ name, code, format }: CardPreviewProps): React.JSX.Element {
  const { t } = useTranslation();
  const hasCode = code.length > 0;

  return (
    <View {...tid('cardPreview')}>
      <Text style={styles.sectionLabel}>{t('form.cardPreview')}</Text>
      <View style={styles.card}>
        {/* Header row: icon left, labels right */}
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="pricetag-outline" size={20} color="#fff" />
          </View>
          <View style={styles.cardLabels}>
            <Text style={styles.walletLabel}>{t('form.cardPreview')}</Text>
            <Text style={styles.entryMode} numberOfLines={1}>
              {name.trim() || 'Store Name'}
            </Text>
          </View>
        </View>

        {/* Barcode area */}
        <View style={styles.barcodeArea}>
          {hasCode ? (
            <BarcodeErrorBoundary>
              <BarcodeRenderer
                code={code}
                format={format}
                width={260}
                accessibilityLabel={name || 'Card preview barcode'}
              />
            </BarcodeErrorBoundary>
          ) : (
            <Text style={styles.placeholder}>{t('form.enterDetailsAbove')}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
  },
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.cardShadow,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabels: {
    flex: 1,
  },
  walletLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textOnPrimary,
    opacity: 0.65,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  entryMode: {
    fontFamily: theme.typography.fontFamily.extraBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textOnPrimary,
    marginTop: 1,
  },
  barcodeArea: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  placeholder: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textOnPrimary,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    paddingVertical: theme.spacing.sm,
  },
}));
