import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from '../theme/unistyles';

interface SettingsRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
  right?: ReactNode;
  accessibilityLabel?: string;
  testID?: string;
}

export function SettingsRow({
  icon,
  label,
  onPress,
  right,
  accessibilityLabel,
  testID,
}: SettingsRowProps): React.JSX.Element {
  const content = (
    <>
      <View style={styles.left}>
        <Ionicons name={icon} size={20} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.right}>
        {right}
        {onPress ? <Ionicons name="chevron-forward" size={16} style={styles.chevron} /> : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="button"
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.row} accessibilityLabel={accessibilityLabel ?? label} testID={testID}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.containerLowest,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    ...theme.subtleShadow,
  },
  rowPressed: {
    backgroundColor: theme.colors.containerHigh,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + 4,
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  icon: {
    color: theme.colors.primary,
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  chevron: {
    color: theme.colors.textTertiary,
  },
}));
