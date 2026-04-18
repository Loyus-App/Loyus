import { View } from 'react-native';
import { StyleSheet } from '../theme/unistyles';

interface ColorChipProps {
  color: string;
  label: string;
}

export function ColorChip({ color, label }: ColorChipProps): React.JSX.Element {
  return (
    <View
      style={styles.chip(color)}
      accessible={true}
      accessibilityLabel={label}
      accessibilityRole="image"
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  chip: (color: string) => ({
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: color,
    borderWidth: 1,
    borderColor: theme.colors.border,
  }),
}));
