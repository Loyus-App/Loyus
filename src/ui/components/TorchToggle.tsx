import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

interface TorchToggleProps {
  enabled: boolean;
  onToggle: () => void;
  visible: boolean;
  /** When true, renders as an inline button (for use inside a header row) */
  inline?: boolean;
}

/**
 * Torch on/off button. Returns null when device has no torch.
 * Default: absolutely positioned in the scan view.
 * inline=true: renders as a 40×40 circle for use inside a header row.
 */
export function TorchToggle({
  enabled,
  onToggle,
  visible,
  inline = false,
}: TorchToggleProps): React.JSX.Element | null {
  const { t } = useTranslation();
  if (!visible) return null;

  return (
    <Pressable
      style={inline ? styles.inlineButton : styles.button}
      onPress={onToggle}
      accessibilityLabel={enabled ? t('torch.turnOff') : t('torch.turnOn')}
      accessibilityRole="button"
      {...tid('torchToggle')}
    >
      <Ionicons name={enabled ? 'flash' : 'flash-off'} size={20} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create(() => ({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
