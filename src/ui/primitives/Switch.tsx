import { Switch as NativeSwitch } from 'react-native';
import { withUnistyles } from 'react-native-unistyles';
import { haptics } from '../utils/haptics';

const ThemedSwitch = withUnistyles(NativeSwitch, (theme) => ({
  trackColor: { true: theme.colors.accent, false: theme.colors.border },
  // biome-ignore lint/style/useNamingConvention: React Native prop name
  ios_backgroundColor: theme.colors.border,
}));

type Props = {
  readonly value: boolean;
  readonly onValueChange: (value: boolean) => void;
  readonly accessibilityLabel: string;
  readonly testID?: string | undefined;
};

export function Switch({
  value,
  onValueChange,
  accessibilityLabel,
  testID,
}: Props): React.JSX.Element {
  return (
    <ThemedSwitch
      testID={testID}
      value={value}
      onValueChange={(next) => {
        haptics.selection();
        onValueChange(next);
      }}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
