import type { ReactNode } from 'react';
import {
  type AccessibilityActionEvent,
  type AccessibilityActionInfo,
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { haptics } from '../utils/haptics';
import { Icon, type IconName } from './Icon';
import type { BadgeTint } from './IconBadge';
import { IconBadge } from './IconBadge';
import { icons } from './icons';
import { Text } from './Text';

const Spinner = withUnistyles(ActivityIndicator, (theme) => ({ color: theme.colors.textMuted }));

type Props = {
  readonly title: string;
  readonly subtitle?: string | undefined;
  readonly value?: string | undefined;
  readonly icon?: IconName;
  readonly tint?: BadgeTint;
  readonly leading?: ReactNode;
  readonly accessory?: 'chevron' | 'check' | ReactNode | undefined;
  readonly destructive?: boolean;
  readonly onPress?: () => void;
  readonly onLongPress?: () => void;
  readonly selected?: boolean | undefined;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string | undefined;
  readonly accessibilityHint?: string | undefined;
  readonly accessibilityActions?: AccessibilityActionInfo[] | undefined;
  readonly onAccessibilityAction?: ((event: AccessibilityActionEvent) => void) | undefined;
  readonly testID?: string | undefined;
};

function Accessory({
  accessory,
  selected,
  loading,
}: Pick<Props, 'accessory' | 'selected' | 'loading'>): ReactNode {
  if (loading) return <Spinner size="small" />;
  if (accessory === 'chevron') return <Icon name={icons.chevron} size={14} tone="muted" />;
  if (accessory === 'check')
    return selected ? <Icon name={icons.check} size={16} tone="accent" /> : null;
  return accessory;
}

type ContentProps = Pick<
  Props,
  | 'title'
  | 'subtitle'
  | 'value'
  | 'icon'
  | 'tint'
  | 'leading'
  | 'accessory'
  | 'destructive'
  | 'selected'
> & { readonly loading: boolean };

function RowContent({
  title,
  subtitle,
  value,
  icon,
  tint = 'accent',
  leading,
  accessory,
  destructive = false,
  selected,
  loading,
}: ContentProps): React.JSX.Element {
  return (
    <>
      {leading ?? (icon && <IconBadge icon={icon} tint={destructive ? 'red' : tint} />)}
      <View style={styles.texts}>
        <Text tone={destructive ? 'danger' : 'primary'} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" tone="muted" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text tone="muted" numberOfLines={1} style={styles.value}>
          {value}
        </Text>
      ) : null}
      <Accessory accessory={accessory} selected={selected} loading={loading} />
    </>
  );
}

export function ListRow({
  onPress,
  onLongPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityActions,
  onAccessibilityAction,
  testID,
  ...content
}: Props): React.JSX.Element {
  const body = <RowContent {...content} loading={loading} />;

  if (!(onPress || onLongPress)) {
    return (
      <View testID={testID} style={styles.row}>
        {body}
      </View>
    );
  }

  const isDisabled = loading || disabled;
  const label =
    accessibilityLabel ??
    [content.title, content.subtitle, content.value].filter(Boolean).join(', ');

  return (
    <Pressable
      testID={testID}
      onPress={() => {
        haptics.selection();
        onPress?.();
      }}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
      disabled={isDisabled}
      accessibilityState={{ selected: content.selected, busy: loading, disabled: isDisabled }}
      style={({ pressed }) => [styles.row, pressed && styles.pressed, disabled && styles.disabled]}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    minHeight: 48,
    paddingHorizontal: theme.space(4),
    paddingVertical: theme.space(3),
  },
  pressed: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  disabled: {
    opacity: 0.45,
  },
  texts: {
    flex: 1,
    gap: theme.space(0.5),
  },
  value: {
    flexShrink: 1,
    maxWidth: '50%',
  },
}));
