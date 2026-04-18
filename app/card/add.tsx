import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';
import { BarcodeFormat } from '../../src/domain/card';
import { useCardStore } from '../../src/state/stores/cardStore';
import { CardForm } from '../../src/ui/components/CardForm';
import { CardPreview } from '../../src/ui/components/CardPreview';
import { ScreenShell } from '../../src/ui/components/ScreenShell';
import { useHaptic } from '../../src/ui/hooks/useHaptic';
import { StyleSheet, useUnistyles } from '../../src/ui/theme/unistyles';

export default function AddCardScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { lightImpact } = useHaptic();
  const helpItems = [
    {
      icon: 'storefront-outline',
      title: t('cardAdd.helpItemStoreName'),
      desc: t('cardAdd.helpItemStoreDesc'),
    },
    {
      icon: 'barcode-outline',
      title: t('cardAdd.helpItemCode'),
      desc: t('cardAdd.helpItemCodeDesc'),
    },
    {
      icon: 'qr-code-outline',
      title: t('cardAdd.helpItemBarcode'),
      desc: t('cardAdd.helpItemBarcodeDesc'),
    },
  ];
  const [helpVisible, setHelpVisible] = useState(false);
  const [previewValues, setPreviewValues] = useState({
    name: '',
    code: '',
    format: BarcodeFormat.CODE128 as BarcodeFormat,
  });

  function handleSubmit(values: {
    name: string;
    code: string;
    format: BarcodeFormat;
    color?: string;
    isFavorite?: boolean;
  }) {
    const store = useCardStore.getState();
    const cardId = store.addCard(values);
    if (values.isFavorite) {
      store.toggleFavorite(cardId);
    }
    lightImpact();
    router.back();
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenShell>
        {/* Custom header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.headerClose}
            hitSlop={8}
            accessibilityLabel={t('cardAdd.closeLabel')}
            accessibilityRole="button"
          >
            <Ionicons name="close" size={22} color={theme.colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>{t('cardAdd.headerTitle')}</Text>
          <Pressable
            style={styles.headerHelp}
            onPress={() => setHelpVisible(true)}
            accessibilityLabel={t('cardAdd.helpLabel')}
            accessibilityRole="button"
          >
            <View style={styles.helpCircle}>
              {/* biome-ignore lint/style/noJsxLiterals: decorative symbol */}
              <Text style={styles.helpText}>?</Text>
            </View>
          </Pressable>
        </View>

        <CardForm
          onSubmit={handleSubmit}
          submitLabel={t('cardAdd.saveCard')}
          onValuesChange={setPreviewValues}
          hideColorPicker
          showInputIcons
          solidButton
          renderBelowFields={
            <CardPreview
              name={previewValues.name}
              code={previewValues.code}
              format={previewValues.format}
            />
          }
        />
      </ScreenShell>

      {/* Help modal */}
      <Modal
        visible={helpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setHelpVisible(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t('cardAdd.helpModalTitle')}</Text>
            {helpItems.map((item) => (
              <View key={item.title} style={styles.helpRow}>
                <View style={styles.helpIconBox}>
                  <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.helpContent}>
                  <Text style={styles.helpItemTitle}>{item.title}</Text>
                  <Text style={styles.helpItemDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
            <Pressable
              style={styles.modalClose}
              onPress={() => setHelpVisible(false)}
              accessibilityLabel={t('cardAdd.closeHelp')}
              accessibilityRole="button"
            >
              <Text style={styles.modalCloseText}>{t('common.gotIt')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  headerClose: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  headerHelp: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textOnPrimary,
  },
  // Help modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.md,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.containerHigh,
    alignSelf: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  helpRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  helpIconBox: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  helpContent: {
    flex: 1,
  },
  helpItemTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginBottom: 3,
  },
  helpItemDesc: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  modalClose: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  modalCloseText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textOnPrimary,
  },
}));
