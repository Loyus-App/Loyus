import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

interface CameraPermissionGateProps {
  children: React.ReactNode;
}

/**
 * Wraps camera content with a permission check.
 * - Permission granted: renders children
 * - Permission not requested: shows rationale + "Grant Camera Access" button
 * - Permission denied: shows rationale + "Go to Settings" button
 */
export function CameraPermissionGate({ children }: CameraPermissionGateProps): React.JSX.Element {
  const { t } = useTranslation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [wasRequested, setWasRequested] = useState(false);

  const handleRequest = useCallback(async () => {
    await requestPermission();
    setWasRequested(true);
  }, [requestPermission]);

  const handleOpenSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  if (hasPermission) {
    return <>{children}</>;
  }

  // Permission denied after explicit request -> show "Go to Settings"
  const showSettingsButton = wasRequested && !hasPermission;

  return (
    <View style={styles.container} {...tid('permissionRationale')}>
      <Ionicons name="camera-outline" size={64} color={styles.icon.color as string} />
      <Text style={styles.title}>{t('camera.permissionTitle')}</Text>
      <Text style={styles.message}>{t('camera.permissionMessage')}</Text>

      {showSettingsButton ? (
        <Pressable
          style={styles.button}
          onPress={handleOpenSettings}
          accessibilityLabel={t('camera.goToSettingsLabel')}
          accessibilityRole="button"
          {...tid('openSettingsButton')}
        >
          <Text style={styles.buttonText}>{t('camera.goToSettings')}</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.button}
          onPress={handleRequest}
          accessibilityLabel={t('camera.grantLabel')}
          accessibilityRole="button"
          {...tid('permissionRequestButton')}
        >
          <Text style={styles.buttonText}>{t('camera.grantAccess')}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
    paddingHorizontal: theme.spacing.xl,
  },
  icon: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: '#FFFFFF',
  },
}));
