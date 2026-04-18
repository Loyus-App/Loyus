import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

interface ColorPickerProps {
  value: string | undefined;
  onChange: (color: string | undefined) => void;
}

const PRESET_COLORS = [
  { hex: '#FF3B30', name: 'Red' },
  { hex: '#FF9500', name: 'Orange' },
  { hex: '#34C759', name: 'Green' },
  { hex: '#2E5CB8', name: 'Blue' },
  { hex: '#5856D6', name: 'Purple' },
  { hex: '#AF52DE', name: 'Violet' },
] as const;

export function ColorPicker({ value, onChange }: ColorPickerProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.container} {...tid('colorPicker')}>
      <Pressable
        onPress={() => onChange(undefined)}
        style={[styles.chip, styles.noneChip, value === undefined && styles.chipSelected]}
        accessibilityRole="button"
        accessibilityLabel={t('form.colorNone')}
        accessibilityState={{ selected: value === undefined }}
      >
        {/* biome-ignore lint/style/noJsxLiterals: decorative symbol */}
        <Text style={styles.noneText}>--</Text>
      </Pressable>
      {PRESET_COLORS.map((color) => {
        const selected = value === color.hex;
        return (
          <Pressable
            key={color.hex}
            onPress={() => onChange(color.hex)}
            style={[styles.chip, { backgroundColor: color.hex }, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityLabel={color.name}
            accessibilityState={{ selected }}
          >
            {selected && <Text style={styles.checkmark}>{'\\u2713'}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  chip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneChip: {
    backgroundColor: theme.colors.containerLow,
  },
  chipSelected: {
    opacity: 0.75,
    transform: [{ scale: 1.15 }],
  },
  noneText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
}));
