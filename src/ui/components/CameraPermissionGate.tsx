import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { Button, icons } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { ScannerMessage } from './ScannerOverlay';

type Props = {
  readonly children: ReactNode;
};

export function CameraPermissionGate({ children }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const { hasPermission, canRequestPermission, requestPermission } = useCameraPermission();

  if (hasPermission) return <>{children}</>;

  return (
    <ScannerMessage
      icon={icons.camera}
      title={t('camera.title')}
      body={t('camera.body')}
      detail={canRequestPermission ? undefined : t('camera.deniedBody')}
      {...tid('permissionRationale')}
    >
      {canRequestPermission ? (
        <Button
          label={t('camera.allow')}
          size="lg"
          onPress={() => {
            requestPermission().catch(() => undefined);
          }}
          {...tid('permissionRequestButton')}
        />
      ) : (
        <Button
          label={t('camera.openSettings')}
          size="lg"
          onPress={() => {
            Linking.openSettings().catch(() => undefined);
          }}
          {...tid('openSettingsButton')}
        />
      )}
    </ScannerMessage>
  );
}
