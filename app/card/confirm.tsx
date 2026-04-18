import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import type { BarcodeFormat } from '../../src/domain/card';
import { isLikelyRotatingCode } from '../../src/domain/rotatingCode';
import { isE2E } from '../../src/infra/env';
import { useCaptureStore } from '../../src/state/stores/captureStore';
import { useCardStore } from '../../src/state/stores/cardStore';
import { CardForm } from '../../src/ui/components/CardForm';
import { ScreenShell } from '../../src/ui/components/ScreenShell';
import { WarningBanner } from '../../src/ui/components/WarningBanner';
import { useHaptic } from '../../src/ui/hooks/useHaptic';
import { tid } from '../../src/ui/testIds';
import { StyleSheet } from '../../src/ui/theme/unistyles';

export default function ConfirmScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { lightImpact } = useHaptic();
  const params = useLocalSearchParams<{ code?: string; format?: string }>();
  const [ready, setReady] = useState(false);

  // E2E prefill: populate captureStore from deep-link params when store is empty
  useEffect(() => {
    if (isE2E && params.code && params.format) {
      const { scannedCode } = useCaptureStore.getState();
      if (!scannedCode) {
        useCaptureStore.getState().setScannedResult(params.code, params.format as BarcodeFormat);
      }
    }
    setReady(true);
  }, [params.code, params.format]);

  const scannedCode = useCaptureStore((s) => s.scannedCode);
  const scannedFormat = useCaptureStore((s) => s.scannedFormat);

  if (!ready)
    return (
      <ScreenShell>
        <View />
      </ScreenShell>
    );

  // No scan data: redirect back (user navigated directly)
  if (!(scannedCode && scannedFormat)) {
    return (
      <ScreenShell>
        <View style={styles.center}>
          <Text style={styles.errorText}>{t('cardConfirm.noScanError')}</Text>
        </View>
      </ScreenShell>
    );
  }

  const isRotating = isLikelyRotatingCode(scannedCode);

  function handleSave(values: {
    name: string;
    code: string;
    format: BarcodeFormat;
    color?: string;
  }) {
    useCardStore.getState().addCard(values);
    lightImpact();
    useCaptureStore.getState().clearScan();
    router.replace('/(tabs)');
  }

  return (
    <ScreenShell {...(isE2E ? { testID: 'confirm-screen' } : {})}>
      <View style={styles.content} {...tid('confirmScreen')}>
        <WarningBanner visible={isRotating} message={t('cardConfirm.rotatingWarning')} />
        <CardForm
          initialValues={{
            name: '',
            code: scannedCode,
            format: scannedFormat,
          }}
          onSubmit={handleSave}
          submitLabel={t('cardConfirm.saveCard')}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    textAlign: 'center',
  },
}));
