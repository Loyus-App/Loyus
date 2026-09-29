import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { StyleSheet } from 'react-native-unistyles';
import { haptics } from '../utils/haptics';
import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';

type Props = {
  readonly icon: IconName;
  readonly accessibilityLabel: string;
  readonly onPress: () => void;
  readonly selected?: boolean;
  readonly variant?: 'raised' | 'plain' | 'glass';
  readonly testID?: string | undefined;
};

const liquidGlass = isLiquidGlassAvailable();

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  selected = false,
  variant = 'raised',
  testID,
}: Props): React.JSX.Element {
  const resolved = variant === 'glass' && !liquidGlass ? 'raised' : variant;
  styles.useVariants({ variant: resolved, selected });

  const button = (
    <PressableScale
      testID={testID}
      onPress={() => {
        haptics.selection();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
      hitSlop={4}
      scaleTo={resolved === 'glass' ? 1 : 0.92}
      style={styles.button}
    >
      <Icon
        name={icon}
        size={resolved === 'plain' ? 18 : 20}
        tone={selected ? 'accent' : 'primary'}
      />
    </PressableScale>
  );

  if (resolved !== 'glass') return button;
  return (
    <GlassView glassEffectStyle="regular" isInteractive style={styles.glass}>
      {button}
    </GlassView>
  );
}

const styles = StyleSheet.create((theme) => ({
  glass: {
    borderRadius: theme.radius.pill,
  },
  button: {
    width: theme.size.touch,
    height: theme.size.touch,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        raised: {
          backgroundColor: theme.colors.surfaceRaised,
          boxShadow: `0 1px 4px ${theme.colors.shadow}`,
        },
        plain: {
          backgroundColor: 'transparent',
        },
        glass: {
          backgroundColor: 'transparent',
        },
      },
      selected: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: 'plain',
        selected: true,
        styles: { backgroundColor: theme.colors.surfaceRaised },
      },
    ],
  },
}));
