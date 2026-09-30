import type { Ref } from 'react';
import { TextInput, type TextInputInstance, type TextInputProps, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { Text } from './Text';

const ThemedInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.textMuted,
  selectionColor: theme.colors.accent,
}));

type Props = Omit<TextInputProps, 'style'> & {
  readonly label: string;
  readonly hint?: string | undefined;
  readonly error?: string | null | undefined;
  readonly monospace?: boolean;
  readonly inputRef?: Ref<TextInputInstance>;
};

export function TextField({
  label,
  hint,
  error,
  monospace = false,
  inputRef,
  ...inputProps
}: Props): React.JSX.Element {
  styles.useVariants({ invalid: Boolean(error), monospace });
  const message = error ?? hint;
  return (
    <View style={styles.container}>
      <Text variant="caption" tone="muted" weight="semibold" style={styles.label}>
        {label}
      </Text>
      <ThemedInput ref={inputRef} accessibilityLabel={label} {...inputProps} style={styles.input} />
      {message ? (
        <Text variant="caption" tone={error ? 'danger' : 'muted'} style={styles.label}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.space(1.5),
  },
  label: {
    paddingHorizontal: theme.space(1),
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    paddingHorizontal: theme.space(4),
    paddingVertical: theme.space(3),
    minHeight: 48,
    variants: {
      invalid: {
        true: { borderColor: theme.colors.danger },
        false: { borderColor: theme.colors.border },
      },
      monospace: {
        true: {
          fontFamily: theme.typography.code.fontFamily,
          letterSpacing: 0.5,
          fontVariant: ['tabular-nums'],
        },
        false: {},
      },
    },
  },
}));
