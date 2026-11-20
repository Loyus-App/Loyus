import { router } from 'expo-router';
import { CancelToolbar } from '@/features/card-editor/ui/CancelToolbar';
import { CardForm } from '@/features/card-editor/ui/CardForm';
import { saveNewCard } from '@/features/card-editor/ui/saveNewCard';

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
