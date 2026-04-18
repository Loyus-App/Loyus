import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

export interface CodeInputTrailingProps {
  showInputIcons: boolean;
  hasCode: boolean;
  onClear: () => void;
}

export function CodeInputTrailing({
  showInputIcons,
  hasCode,
  onClear,
}: CodeInputTrailingProps): React.JSX.Element | null {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  if (showInputIcons) {
    return (
      <View style={styles.inputIconRight}>
        <Ionicons name="qr-code-outline" size={20} color={theme.colors.textTertiary} />
      </View>
    );
  }
  if (!hasCode) return null;
  return (
    <Pressable
      onPress={onClear}
      style={styles.clearButton}
      accessibilityLabel={t('form.clearCode')}
      {...tid('clearCodeButton')}
    >
      <Ionicons name="close-circle" size={18} color={theme.colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  inputIconRight: {
    position: 'absolute',
    right: 14,
    zIndex: 1,
    justifyContent: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: theme.spacing.md,
  },
}));
