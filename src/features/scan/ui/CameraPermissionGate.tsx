import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { ignore } from '@/shared/lib/ignore';
import { Button, icons } from '@/shared/ui/primitives';
import { tid } from '@/shared/ui/testIds';
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
            requestPermission().catch(ignore);
          }}
          {...tid('permissionRequestButton')}
        />
      ) : (
        <Button
          label={t('camera.openSettings')}
          size="lg"
          onPress={() => {
            Linking.openSettings().catch(ignore);
          }}
          {...tid('openSettingsButton')}
        />
      )}
    </ScannerMessage>
  );
}
