import { useTranslation } from 'react-i18next';
import { haptics } from '@/shared/platform/haptics';
import { icons } from '@/shared/ui/primitives';
import { tid } from '@/shared/ui/testIds';
import { ScannerControl } from './ScannerOverlay';

type Props = {
  readonly enabled: boolean;
  readonly onToggle: () => void;
  readonly visible: boolean;
};

export function TorchToggle({ enabled, onToggle, visible }: Props): React.JSX.Element | null {
  const { t } = useTranslation();
  if (!visible) return null;
  return (
    <ScannerControl
      icon={enabled ? icons.torch : icons.torchOff}
      label={t(enabled ? 'scan.torchOff' : 'scan.torchOn')}
      active={enabled}
      onPress={() => {
        haptics.selection();
        onToggle();
      }}
      {...tid('torchToggle')}
    />
  );
}
