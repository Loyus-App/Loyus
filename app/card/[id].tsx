import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Brightness from 'expo-brightness';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CardId } from '../../src/domain/card';
import { selectCardById } from '../../src/state/selectors/cardSelectors';
import { useCardStore } from '../../src/state/stores/cardStore';
import { BarcodeErrorBoundary } from '../../src/ui/components/BarcodeErrorBoundary';
import { BarcodeRenderer } from '../../src/ui/components/BarcodeRenderer';
import { CopyButton } from '../../src/ui/components/CopyButton';
import { useHaptic } from '../../src/ui/hooks/useHaptic';
import { tid } from '../../src/ui/testIds';
import { StyleSheet, useUnistyles } from '../../src/ui/theme/unistyles';

function formatCardCode(code: string): string {
  return `CARD ${code.replace(/(.{4})/g, '$1 ').trim()}`;
}

export default function CardDetailScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = useCardStore(selectCardById(id as CardId));
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const { lightImpact } = useHaptic();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const originalBrightness = useRef<number | null>(null);

  const isRotated = card?.barcodeRotated ?? false;
  const panelWidth = screenWidth - 48;

  // When rotated: the panel is rotated 90°, so layout width becomes visual height
  // We want the rotated barcode to fill available vertical space
  const rotatedPanelWidth = Math.min(screenHeight * 0.7, 580);
  const barcodeWidth = isRotated ? rotatedPanelWidth - 32 : panelWidth - 48;

  const handleRotate = useCallback(() => {
    if (!id) return;
    useCardStore.getState().toggleBarcodeRotation(id as CardId);
    lightImpact();
  }, [id, lightImpact]);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        useCardStore.getState().recordOpen(id as CardId);
      }

      Brightness.getBrightnessAsync()
        .then((b) => {
          originalBrightness.current = b;
          return Brightness.setBrightnessAsync(1.0);
        })
        .catch(() => undefined);

      return () => {
        if (originalBrightness.current !== null) {
          Brightness.setBrightnessAsync(originalBrightness.current).catch(() => undefined);
          originalBrightness.current = null;
        }
      };
    }, [id]),
  );

  if (!card) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="dark" />
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFound}>{t('cardDetail.notFound')}</Text>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel={t('common.goBack')}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>{t('common.goBack')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header row: close — name — edit */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityLabel={t('cardDetail.closeLabel')}
          accessibilityRole="button"
          {...tid('closeDetailButton')}
        >
          <View style={styles.iconButton}>
            <Ionicons name="close" size={22} color={theme.colors.text} />
          </View>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerName} numberOfLines={1} {...tid('cardDetailName')}>
            {card.name}
          </Text>
          <Text style={styles.headerCode} numberOfLines={1}>
            {formatCardCode(card.code)}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push(`/card/edit/${card.id}` as never)}
          hitSlop={8}
          accessibilityLabel={t('cardDetail.editLabel')}
          accessibilityRole="button"
          {...tid('editCardButton')}
        >
          <View style={styles.iconButton}>
            <Ionicons name="create-outline" size={20} color={theme.colors.text} />
          </View>
        </Pressable>
      </View>

      {/* Barcode section — fills available space */}
      <View style={styles.barcodeSection}>
        <View
          style={[
            styles.cardPanel,
            { width: panelWidth },
            isRotated && {
              width: rotatedPanelWidth,
              height: panelWidth,
              transform: [{ rotate: '90deg' }],
            },
          ]}
          accessible={true}
          accessibilityLabel={t('cardDetail.barcodeCardLabel', { name: card.name })}
          {...tid('barcodeCard')}
        >
          <BarcodeErrorBoundary>
            <BarcodeRenderer
              code={card.code}
              format={card.format}
              width={barcodeWidth}
              accessibilityLabel={`Barcode for ${card.name}`}
            />
          </BarcodeErrorBoundary>
        </View>
      </View>

      {/* Bottom controls — pinned to bottom */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.bottomActions}>
          <Pressable
            onPress={handleRotate}
            style={({ pressed }) => [
              styles.rotateButton,
              isRotated && styles.rotateButtonActive,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityLabel={
              isRotated ? t('cardDetail.resetRotateLabel') : t('cardDetail.rotateLabel')
            }
            accessibilityRole="button"
          >
            <Ionicons
              name="phone-landscape-outline"
              size={18}
              color={isRotated ? theme.colors.textOnPrimary : theme.colors.textSecondary}
            />
            <Text style={[styles.rotateButtonText, isRotated && styles.rotateButtonTextActive]}>
              {isRotated ? t('cardDetail.rotated') : t('cardDetail.rotate')}
            </Text>
          </Pressable>
          <CopyButton text={card.code} />
        </View>
        <Text style={styles.instruction}>{t('cardDetail.brightnessInstruction')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: theme.spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    textAlign: 'center',
  },
  headerCode: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.subtleShadow,
  },
  barcodeSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  cardPanel: {
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.cardShadow,
  },
  bottomBar: {
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rotateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.containerLow,
  },
  rotateButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  rotateButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  rotateButtonTextActive: {
    color: theme.colors.textOnPrimary,
  },
  instruction: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  notFound: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 64,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  backButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.textOnPrimary,
  },
}));
