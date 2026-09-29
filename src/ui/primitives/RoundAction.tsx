import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { haptics } from '../utils/haptics';
import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';
import { Text } from './Text';

type Props = {
  readonly icon: IconName;
  readonly label: string;
  readonly onPress: () => void;
  readonly active?: boolean;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly testID?: string | undefined;
};

export function RoundAction({
  icon,
  label,
  onPress,
  active = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: Props): React.JSX.Element {
  styles.useVariants({ active });
  return (
    <PressableScale
      testID={testID}
      onPress={() => {
        haptics.selection();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected: active }}
      style={styles.action}
      scaleTo={0.94}
    >
      <View style={styles.circle}>
        <Icon name={icon} size={22} tone={active ? 'onAccent' : 'primary'} />
      </View>
      <Text variant="caption" tone="muted" numberOfLines={1} maxFontSizeMultiplier={1.4}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  action: {
    alignItems: 'center',
    gap: theme.space(2),
    minWidth: 76,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      active: {
        true: { backgroundColor: theme.colors.accent },
        false: { backgroundColor: theme.colors.surfaceMuted },
      },
    },
  },
}));
