import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import type { BarcodeFormat, CardId } from '../../../src/domain/card';
import { selectCardById } from '../../../src/state/selectors/cardSelectors';
import { useCardStore } from '../../../src/state/stores/cardStore';
import { CardForm } from '../../../src/ui/components/CardForm';
import { CardPreview } from '../../../src/ui/components/CardPreview';
import { ScreenShell } from '../../../src/ui/components/ScreenShell';
import { useHaptic } from '../../../src/ui/hooks/useHaptic';
import { tid } from '../../../src/ui/testIds';
import { StyleSheet } from '../../../src/ui/theme/unistyles';
import { confirmDelete } from '../../../src/ui/utils/quickActions';

export default function EditCardScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { lightImpact, mediumImpact } = useHaptic();
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = useCardStore(selectCardById(id as CardId));
  const [previewValues, setPreviewValues] = useState<{
    name: string;
    code: string;
    format: BarcodeFormat;
  } | null>(null);

  if (!card) {
    return (
      <ScreenShell style={styles.center}>
        <Text style={styles.notFound}>{t('cardEdit.notFound')}</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{t('common.goBack')}</Text>
        </Pressable>
      </ScreenShell>
    );
  }

  const preview = previewValues ?? { name: card.name, code: card.code, format: card.format };

  return (
    <ScreenShell>
      <View style={styles.container}>
        <CardForm
          initialValues={{
            name: card.name,
            code: card.code,
            format: card.format,
            ...(card.color === undefined ? {} : { color: card.color }),
            isFavorite: card.isFavorite,
          }}
          onSubmit={(values) => {
            useCardStore.getState().updateCard(id as CardId, {
              name: values.name,
              code: values.code,
              format: values.format,
              ...(values.color === undefined ? {} : { color: values.color }),
            });
            if (values.isFavorite !== card.isFavorite) {
              useCardStore.getState().toggleFavorite(id as CardId);
            }
            lightImpact();
            router.back();
          }}
          onValuesChange={setPreviewValues}
          submitLabel={t('cardEdit.updateCard')}
        />
        <CardPreview name={preview.name} code={preview.code} format={preview.format} />
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            confirmDelete(card.name, () => {
              mediumImpact();
              useCardStore.getState().removeCard(id as CardId);
              router.navigate('/(tabs)');
            });
          }}
          accessibilityLabel={t('cardEdit.deleteLabel')}
          accessibilityRole="button"
          {...tid('deleteCardButton')}
        >
          <Text style={styles.deleteText}>{t('cardEdit.deleteText')}</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
  backButton: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  deleteText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
  },
}));
