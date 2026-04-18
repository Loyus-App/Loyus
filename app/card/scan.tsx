import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InteractionManager, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { BarcodeFormat } from '../../src/domain/card';
import { CODE_TYPE_TO_FORMAT, SCAN_CODE_TYPES } from '../../src/infra/camera/formatMap';
import { useCaptureStore } from '../../src/state/stores/captureStore';
import { CameraPermissionGate } from '../../src/ui/components/CameraPermissionGate';
import { ScannerOverlay } from '../../src/ui/components/ScannerOverlay';
import { TorchToggle } from '../../src/ui/components/TorchToggle';
import { useCodeScanHandler } from '../../src/ui/hooks/useCodeScanHandler';
import { useTorch } from '../../src/ui/hooks/useTorch';
import { tid } from '../../src/ui/testIds';
import { StyleSheet } from '../../src/ui/theme/unistyles';

export default function ScanScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const device = useCameraDevice('back');
  const { torchEnabled, toggleTorch, hasTorch } = useTorch(device);
  const isScanning = useCaptureStore((s) => s.isScanning);

  useEffect(() => {
    useCaptureStore.getState().setIsScanning(true);
    return () => {
      useCaptureStore.getState().setIsScanning(false);
    };
  }, []);

  const onConfirm = useCallback(
    async (code: string, codeType: string) => {
      useCaptureStore.getState().setIsScanning(false);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const format =
        CODE_TYPE_TO_FORMAT[codeType as keyof typeof CODE_TYPE_TO_FORMAT] ?? BarcodeFormat.QR_CODE;
      useCaptureStore.getState().setScannedResult(code, format);
      InteractionManager.runAfterInteractions(() => {
        router.push('/card/confirm');
      });
    },
    [router],
  );

  const handleScanned = useCodeScanHandler(onConfirm);

  const codeScanner = useCodeScanner({
    codeTypes: SCAN_CODE_TYPES,
    onCodeScanned: handleScanned,
  });

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerBtn}
            onPress={() => router.back()}
            accessibilityLabel={t('scan.closeLabel')}
            accessibilityRole="button"
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>{t('scan.headerTitle')}</Text>
          <View style={styles.headerBtn} />
        </View>
        <View style={styles.fallback}>
          <Ionicons name="camera-outline" size={48} color="#666666" />
          <Text style={styles.fallbackText}>{t('scan.noCamera')}</Text>
        </View>
        <View style={styles.bottomBar}>
          <Pressable
            style={styles.manualButton}
            onPress={() => {
              router.back();
              router.push('/card/add');
            }}
            accessibilityLabel={t('scan.enterManuallyLabel')}
            accessibilityRole="button"
          >
            <Ionicons name="card-outline" size={18} color="#FFFFFF" />
            <Text style={styles.manualButtonText}>{t('scan.enterManuallyText')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <CameraPermissionGate>
      <SafeAreaView style={styles.container} accessible={false} {...tid('scanScreen')}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={isScanning}
          codeScanner={codeScanner}
          torch={torchEnabled ? 'on' : 'off'}
        />

        <ScannerOverlay />

        {/* Header overlay */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerBtn}
            onPress={() => router.back()}
            accessibilityLabel={t('scan.closeLabel')}
            accessibilityRole="button"
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>{t('scan.headerTitle')}</Text>
          <TorchToggle enabled={torchEnabled} onToggle={toggleTorch} visible={hasTorch} inline />
          {!hasTorch && <View style={styles.headerBtn} />}
        </View>

        {/* Bottom bar */}
        <View style={styles.bottomBar}>
          {/* Enter Manually button */}
          <Pressable
            style={styles.manualButton}
            onPress={() => {
              router.back();
              router.push('/card/add');
            }}
            accessibilityLabel={t('scan.enterManuallyLabel')}
            accessibilityRole="button"
          >
            <Ionicons name="card-outline" size={18} color="#FFFFFF" />
            <Text style={styles.manualButtonText}>{t('scan.enterManuallyText')}</Text>
          </Pressable>

          {/* Quick Tip */}
          <View style={styles.quickTip}>
            <View style={styles.quickTipIcon}>
              <Ionicons name="information-circle" size={18} color="#1b6c3b" />
            </View>
            <Text style={styles.quickTipText}>
              <Text style={styles.quickTipBold}>{t('scan.quickTipBold')}</Text>
              {t('scan.quickTip')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </CameraPermissionGate>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    zIndex: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: '#FFFFFF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    zIndex: 10,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.xl,
  },
  manualButtonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: '#FFFFFF',
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.xl,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    width: '100%',
  },
  quickTipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e6f4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTipBold: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
  },
  quickTipText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  fallbackText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: '#999999',
  },
}));
