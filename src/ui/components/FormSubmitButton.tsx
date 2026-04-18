import { Pressable, Text } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

export interface FormSubmitButtonProps {
  label: string;
  solidButton?: boolean;
  onPress: () => void;
}

export function FormSubmitButton({
  label,
  solidButton = false,
  onPress,
}: FormSubmitButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
      {...tid('saveCardButton')}
      style={({ pressed }) => [
        styles.button,
        solidButton && styles.buttonSolid,
        { opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <Text style={styles.buttonText}>
        {label} {'\u2192'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primaryContainer,
  },
  buttonSolid: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textOnPrimary,
  },
}));
