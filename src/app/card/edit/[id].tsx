import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { Card, CardId } from '@/domain/card';
import { selectCardById } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { CardForm, type CardFormInitial } from '@/ui/components/CardForm';
import { CancelToolbar } from '@/ui/components/form/CancelToolbar';
import { Button, EmptyState, icons } from '@/ui/primitives';
import { confirmDeleteCard } from '@/ui/utils/cardActions';
import { haptics } from '@/ui/utils/haptics';

function initialOf(card: Card): CardFormInitial {
  return {
    name: card.name,
    code: card.code,
    format: card.format,
    color: card.color,
    brandId: card.brandId,
    owner: card.owner,
    note: card.note,
    photos: card.photos,
    isPinned: card.isPinned,
  };
}

export default function EditCardScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [card] = useState(() => selectCardById(id as CardId)(useCardStore.getState()));

  if (!card) {
    return (
      <View style={styles.center}>
        <CancelToolbar />
        <EmptyState
          icon={icons.cards}
          title={t('checkout.notFoundTitle')}
          body={t('checkout.notFoundBody')}
        >
          <Button label={t('common.back')} variant="secondary" onPress={() => router.back()} />
        </EmptyState>
      </View>
    );
  }

  return (
    <>
      <CancelToolbar />
      <CardForm
        initialValues={initialOf(card)}
        editingId={card.id}
        submitLabel={t('form.saveChanges')}
        onSubmit={(values) => {
          useCardStore.getState().updateCard(card.id, values);
          haptics.success();
          router.back();
        }}
        onDelete={() => confirmDeleteCard(card, () => router.dismissTo('/'))}
      />
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
}));
