import { router } from 'expo-router';
import { CardForm } from '@/ui/components/CardForm';
import { CancelToolbar } from '@/ui/components/form/CancelToolbar';
import { saveNewCard } from '@/ui/utils/cardActions';

export default function AddCardScreen(): React.JSX.Element {
  return (
    <>
      <CancelToolbar />
      <CardForm
        autoFocus
        onSubmit={saveNewCard}
        onScanInstead={() => router.replace('/card/scan')}
      />
    </>
  );
}
