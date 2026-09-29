import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles';
import { Icon, type IconName, PressableScale, Text } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { withAlpha } from '@/ui/theme';
import { CARD_ASPECT_RATIO } from './CardTile';

const MutedIcon = withUnistyles(Icon, (theme) => ({ color: theme.scanner.textMuted }));
const Spinner = withUnistyles(ActivityIndicator, (theme) => ({ color: theme.scanner.text }));

export function ScannerOverlay(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.overlay} {...tid('scannerOverlay')}>
      <View style={styles.frame} />
      <Text variant="callout" weight="semibold" style={styles.hint}>
        {t('scan.hint')}
      </Text>
    </View>
  );
}

type ControlProps = {
  readonly icon: IconName;
  readonly label: string;
  readonly onPress: () => void;
  readonly showLabel?: boolean;
  readonly active?: boolean;
  readonly loading?: boolean;
  readonly accessibilityHint?: string | undefined;
  readonly testID?: string | undefined;
};

export function ScannerControl({
  icon,
  label,
  onPress,
  showLabel = false,
  active = false,
  loading = false,
  accessibilityHint,
  testID,
}: ControlProps): React.JSX.Element {
  const { theme } = useUnistyles();
  styles.useVariants({ shape: showLabel ? 'pill' : 'round', active });
  return (
    <PressableScale
      testID={testID}
      onPress={onPress}
      disabled={loading}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ busy: loading, disabled: loading }}
      style={styles.control}
    >
      {loading ? (
        <Spinner size="small" />
      ) : (
        <Icon
          name={icon}
          size={showLabel ? 18 : 20}
          color={active ? theme.scanner.background : theme.scanner.text}
        />
      )}
      {showLabel ? (
        <Text variant="callout" weight="semibold" style={styles.controlLabel}>
          {label}
        </Text>
      ) : null}
    </PressableScale>
  );
}

type MessageProps = {
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
  readonly detail?: string | undefined;
  readonly children?: ReactNode;
  readonly testID?: string | undefined;
};

export function ScannerMessage({
  icon,
  title,
  body,
  detail,
  children,
  testID,
}: MessageProps): React.JSX.Element {
  return (
    <View style={styles.message} testID={testID}>
      <MutedIcon name={icon} size={44} />
      <Text variant="headline" style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Text style={styles.body}>{body}</Text>
      {detail ? <Text style={styles.body}>{detail}</Text> : null}
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(5),
    pointerEvents: 'none',
  },
  frame: {
    width: '80%',
    maxWidth: 420,
    aspectRatio: CARD_ASPECT_RATIO,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: theme.scanner.frame,
    boxShadow: `0 0 0 ${Math.max(rt.screen.width, rt.screen.height)}px ${withAlpha(theme.scanner.background, 0.5)}`,
  },
  hint: {
    color: theme.scanner.text,
    textAlign: 'center',
    paddingHorizontal: theme.space(8),
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(2),
    minHeight: theme.size.touch,
    minWidth: 44,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: withAlpha(theme.scanner.frame, 0.24),
    variants: {
      shape: {
        round: { width: theme.size.touch, height: theme.size.touch },
        pill: { minHeight: 48, paddingHorizontal: theme.space(5) },
      },
      active: {
        true: { backgroundColor: theme.scanner.text },
        false: { backgroundColor: theme.scanner.control },
      },
    },
  },
  controlLabel: {
    color: theme.scanner.text,
  },
  message: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(3),
    paddingTop: rt.insets.top + theme.space(16),
    paddingBottom: rt.insets.bottom + theme.space(24),
    paddingHorizontal: theme.space(8),
    backgroundColor: theme.scanner.background,
  },
  title: {
    color: theme.scanner.text,
    textAlign: 'center',
  },
  body: {
    color: theme.scanner.textMuted,
    textAlign: 'center',
  },
  actions: {
    alignSelf: 'stretch',
    marginTop: theme.space(3),
  },
}));
