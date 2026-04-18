import { Pressable, ScrollView, Text } from 'react-native';
import { BarcodeFormat } from '../../domain/card';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';
import { FORMAT_DISPLAY_NAME } from './FormatBadge';

interface FormatPickerProps {
  value: BarcodeFormat;
  onChange: (format: BarcodeFormat) => void;
}

const ALL_FORMATS = Object.values(BarcodeFormat) as BarcodeFormat[];

export function FormatPicker({ value, onChange }: FormatPickerProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      {...tid('formatPicker')}
    >
      {ALL_FORMATS.map((format) => {
        const selected = format === value;
        return (
          <Pressable
            key={format}
            onPress={() => onChange(format)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityLabel={FORMAT_DISPLAY_NAME[format]}
            accessibilityState={{ selected }}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {FORMAT_DISPLAY_NAME[format]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
}));
