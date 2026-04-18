import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

interface WarningBannerProps {
  message: string;
  visible: boolean;
}

export function WarningBanner({ message, visible }: WarningBannerProps): React.JSX.Element | null {
  if (!visible) return null;

  return (
    <View
      style={styles.container}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      {...tid('rotatingCodeWarning')}
    >
      <Ionicons name="warning-outline" size={20} color="#856404" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
  },
  text: {
    flex: 1,
    color: '#856404',
    fontSize: 14,
    lineHeight: 20,
  },
}));
