import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CardForm } from '@/ui/components/CardForm';
import { CancelToolbar } from '@/ui/components/form/CancelToolbar';
import { saveNewCard } from '@/ui/utils/cardActions';

export default function AddCardScreen(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <CancelToolbar />
      <CardForm
        submitLabel={t('form.save')}
        autoFocus
        onSubmit={saveNewCard}
        onScanInstead={() => router.replace('/card/scan')}
      />
    </>
  );
}
