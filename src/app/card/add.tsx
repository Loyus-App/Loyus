import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCardStore } from '@/state/stores/cardStore';
import { CardForm, type CardFormValues } from '@/ui/components/CardForm';
import { CancelToolbar } from '@/ui/components/form/CancelToolbar';
import { haptics } from '@/ui/utils/haptics';

function saveCard(values: CardFormValues): void {
  useCardStore.getState().addCard(values);
  haptics.success();
  router.dismissTo('/');
}

export default function AddCardScreen(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <CancelToolbar />
      <CardForm
        submitLabel={t('form.save')}
        autoFocus
        onSubmit={saveCard}
        onScanInstead={() => router.replace('/card/scan')}
      />
    </>
  );
}
