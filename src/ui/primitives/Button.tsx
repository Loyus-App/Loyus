import { ActivityIndicator } from 'react-native';
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles';
import { subtleGradient } from '../theme/color';
import { haptics } from '../utils/haptics';
import { GradientLayer } from './GradientLayer';
import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';
import { Text, type TextTone } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly size?: 'md' | 'lg';
  readonly icon?: IconName;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly testID?: string | undefined;
};

const CONTENT_TONE: Record<ButtonVariant, TextTone> = {
  primary: 'onAccent',
  secondary: 'primary',
  ghost: 'accent',
  danger: 'onDanger',
};

const Spinner = withUnistyles(ActivityIndicator, (theme) => ({ color: theme.colors.textMuted }));

function fillOf(variant: ButtonVariant, accent: string, danger: string): string | null {
  if (variant === 'primary') return accent;
  if (variant === 'danger') return danger;
  return null;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: Props): React.JSX.Element {
  const { theme } = useUnistyles();
  const isDisabled = disabled || loading;
  const fill = fillOf(variant, theme.colors.accent, theme.colors.danger);
  styles.useVariants({ variant, size, disabled: isDisabled });
  const tone = CONTENT_TONE[variant];

  return (
    <PressableScale
      testID={testID}
      onPress={() => {
        haptics.light();
        onPress();
      }}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={styles.button}
    >
      {fill && <GradientLayer image={subtleGradient(fill)} />}
      {loading ? <Spinner size="small" /> : icon && <Icon name={icon} size={18} tone={tone} />}
      <Text variant="callout" weight="semibold" tone={tone}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(2),
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    overflow: 'hidden',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.accent },
        secondary: { backgroundColor: theme.colors.surfaceMuted },
        ghost: { backgroundColor: 'transparent' },
        danger: { backgroundColor: theme.colors.danger },
      },
      size: {
        md: { minHeight: theme.size.touch, paddingHorizontal: theme.space(4) },
        lg: { minHeight: 52, paddingHorizontal: theme.space(6) },
      },
      disabled: {
        true: { opacity: 0.45 },
        false: {},
      },
    },
  },
}));
