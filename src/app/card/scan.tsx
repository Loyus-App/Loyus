import type { ImagePickerOptions } from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Camera, type CameraDevice, useCameraDevice } from 'react-native-vision-camera';
import type { BarcodeFormat } from '@/domain/card';
import { type ImageBarcode, isImageScanAvailable, scanImage } from '@/infra/camera/imageScan';
import { i18n } from '@/infra/i18n';
import { useCaptureStore } from '@/state/stores/captureStore';
import { CameraPermissionGate } from '@/ui/components/CameraPermissionGate';
import { ScannerControl, ScannerMessage, ScannerOverlay } from '@/ui/components/ScannerOverlay';
import { TorchToggle } from '@/ui/components/TorchToggle';
import { useCodeScanHandler } from '@/ui/hooks/useCodeScanHandler';
import { useScanOutput } from '@/ui/hooks/useScanOutput';
import { useTorch } from '@/ui/hooks/useTorch';
import { Button, icons } from '@/ui/primitives';
import { testId, tid } from '@/ui/testIds';
import { haptics } from '@/ui/utils/haptics';
import { choosePhoto } from '@/ui/utils/photoPicker';

const SCAN_PICKER_OPTIONS: ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: false };

async function readBarcode(uri: string): Promise<ImageBarcode | null> {
  try {
    const [first] = await scanImage(uri);
    return first ?? null;
  } catch {
    return null;
  }
}

async function importFromPhoto(setBusy: (busy: boolean) => void): Promise<boolean> {
  const uri = await choosePhoto(SCAN_PICKER_OPTIONS);
  if (!uri) return false;
  setBusy(true);
  const barcode = await readBarcode(uri);
  setBusy(false);
  if (!barcode) {
    haptics.warning();
    Alert.alert(i18n.t('scan.noBarcodeTitle'), i18n.t('scan.noBarcodeBody'));
    return false;
  }
  useCaptureStore.getState().setScannedResult(barcode.value, barcode.format);
  haptics.success();
  router.replace('/card/confirm');
  return true;
}

function usePhotoImport(): { readonly busy: boolean; readonly start: () => void } {
  const [busy, setBusy] = useState(false);
  const running = useRef(false);

  const start = useCallback(() => {
    if (running.current) return;
    running.current = true;
    const resume = useCaptureStore.getState().isScanning;
    useCaptureStore.getState().setIsScanning(false);
    importFromPhoto(setBusy)
      .catch(() => false)
      .then((imported) => {
        running.current = false;
        setBusy(false);
        if (!imported && resume) useCaptureStore.getState().setIsScanning(true);
      });
  }, []);

  return { busy, start };
}

export default function ScanScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const device = useCameraDevice('back');
  const photo = usePhotoImport();

  return (
    <View style={styles.screen} accessible={false} {...tid('scanScreen')}>
      <StatusBar style="light" />
      {device ? (
        <CameraPermissionGate>
          <LiveScanner device={device} />
        </CameraPermissionGate>
      ) : (
        <ScannerMessage
          icon={icons.cameraOff}
          title={t('scan.noCameraTitle')}
          body={t('scan.noCameraBody')}
        >
          {isImageScanAvailable ? (
            <Button
              label={t('scan.choosePhoto')}
              size="lg"
              icon={icons.photo}
              loading={photo.busy}
              accessibilityHint={t('scan.fromPhotoHint')}
              onPress={photo.start}
              testID={testId('scanFromPhotoButton')}
            />
          ) : null}
        </ScannerMessage>
      )}
      <View style={styles.topBar}>
        <ScannerControl icon={icons.close} label={t('scan.close')} onPress={() => router.back()} />
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.bottomSide}>
          {isImageScanAvailable ? (
            <ScannerControl
              icon={icons.photo}
              label={t('scan.fromPhoto')}
              accessibilityHint={t('scan.fromPhotoHint')}
              loading={photo.busy}
              onPress={photo.start}
              testID={testId('scanFromPhotoButton')}
            />
          ) : null}
        </View>
        <ScannerControl
          icon={icons.keyboard}
          label={t('scan.manual')}
          showLabel
          onPress={() => router.replace('/card/add')}
          {...tid('manualEntryButton')}
        />
        <View style={styles.bottomSide} />
      </View>
    </View>
  );
}

function LiveScanner({ device }: { readonly device: CameraDevice }): React.JSX.Element {
  const { torchEnabled, toggleTorch, hasTorch } = useTorch(device);
  const isScanning = useCaptureStore((state) => state.isScanning);
  const confirmed = useRef(false);

  useEffect(() => {
    useCaptureStore.getState().setIsScanning(true);
    return () => {
      useCaptureStore.getState().setIsScanning(false);
    };
  }, []);

  const onConfirm = useCallback((code: string, format: BarcodeFormat) => {
    if (confirmed.current) return;
    confirmed.current = true;
    const capture = useCaptureStore.getState();
    capture.setIsScanning(false);
    capture.setScannedResult(code, format);
    haptics.success();
    requestIdleCallback(() => {
      router.replace('/card/confirm');
    });
  }, []);

  const handleScanned = useCodeScanHandler(onConfirm);
  const scanOutput = useScanOutput(handleScanned);
  const outputs = useMemo(() => [scanOutput], [scanOutput]);

  return (
    <>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isScanning}
        outputs={outputs}
        torchMode={torchEnabled ? 'on' : 'off'}
      />
      <ScannerOverlay />
      <View style={[styles.topBar, styles.topBarEnd]}>
        <TorchToggle enabled={torchEnabled} onToggle={toggleTorch} visible={hasTorch} />
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.scanner.background,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingTop: rt.insets.top + theme.space(2),
    paddingHorizontal: theme.space(4),
    pointerEvents: 'box-none',
  },
  topBarEnd: {
    justifyContent: 'flex-end',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    paddingBottom: rt.insets.bottom + theme.space(6),
    paddingHorizontal: theme.space(4),
    pointerEvents: 'box-none',
  },
  bottomSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
}));
