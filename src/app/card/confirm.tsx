import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type BarcodeFormat, isBarcodeFormat } from '@/domain/card';
import { isE2E } from '@/infra/env';
import { useCaptureStore } from '@/state/stores/captureStore';
import { CardForm, type CardFormValues } from '@/ui/components/CardForm';
import { CancelToolbar } from '@/ui/components/form/CancelToolbar';
import { Button, EmptyState, icons } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { saveNewCard } from '@/ui/utils/cardActions';

type Scan = { readonly code: string; readonly format: BarcodeFormat };

function e2eScan(code: string | undefined, format: string | undefined): Scan | null {
  if (!(isE2E && code && isBarcodeFormat(format))) return null;
  return { code, format };
}

function saveScannedCard(values: CardFormValues): void {
  useCaptureStore.getState().clearScan();
  saveNewCard(values);
}

export default function ConfirmScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ code?: string; format?: string }>();
  const scannedCode = useCaptureStore((state) => state.scannedCode);
  const scannedFormat = useCaptureStore((state) => state.scannedFormat);
  const scan: Scan | null =
    scannedCode && scannedFormat
      ? { code: scannedCode, format: scannedFormat }
      : e2eScan(params.code, params.format);

  return (
    <View style={styles.screen} {...tid('confirmScreen')}>
      <CancelToolbar />
      {scan ? (
        <CardForm
          initialValues={scan}
          submitLabel={t('form.save')}
          autoFocus
          warnRotating
          onSubmit={saveScannedCard}
        />
      ) : (
        <View style={styles.center}>
          <EmptyState
            icon={icons.barcode}
            title={t('form.noScanTitle')}
            body={t('form.noScanBody')}
          >
            <Button label={t('common.back')} variant="secondary" onPress={() => router.back()} />
          </EmptyState>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
}));
