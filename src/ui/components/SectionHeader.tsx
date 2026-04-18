import { Text } from 'react-native';
import { StyleSheet } from '../theme/unistyles';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps): React.JSX.Element {
  return (
    <Text style={styles.header} accessibilityRole="header">
      {title}
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 1.5,
    backgroundColor: theme.colors.bg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md + 4,
    paddingTop: theme.spacing.lg,
  },
}));
