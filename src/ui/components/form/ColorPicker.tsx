import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { GradientLayer, Icon, icons, PressableScale, Text } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { CARD_COLORS, subtleGradient, textOnCard } from '@/ui/theme';
import { haptics } from '@/ui/utils/haptics';

type Props = {
  readonly autoColor: string;
  readonly value: string | undefined;
  readonly onChange: (color: string | undefined) => void;
};

type SwatchProps = {
  readonly fill: string;
  readonly label: string;
  readonly selected: boolean;
  readonly automatic?: boolean;
  readonly onPress: () => void;
};

function Swatch({
  fill,
  label,
  selected,
  automatic = false,
  onPress,
}: SwatchProps): React.JSX.Element {
  styles.useVariants({ selected });
  return (
    <PressableScale
      onPress={() => {
        if (selected) return;
        haptics.selection();
        onPress();
      }}
      scaleTo={0.9}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected, checked: selected }}
      style={styles.ring}
    >
      <View style={styles.swatch(fill)}>
        <GradientLayer image={subtleGradient(fill)} />
        {automatic ? <Icon name={icons.auto} size={16} color={textOnCard(fill)} /> : null}
      </View>
    </PressableScale>
  );
}

export function ColorPicker({ autoColor, value, onChange }: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.container} {...tid('colorPicker')}>
      <Text variant="caption" tone="muted" weight="semibold" style={styles.label}>
        {t('form.color')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={styles.row}
        accessibilityRole="radiogroup"
        accessibilityLabel={t('form.color')}
      >
        <Swatch
          fill={autoColor}
          label={t('form.colorAuto')}
          selected={value === undefined}
          automatic
          onPress={() => onChange(undefined)}
        />
        {CARD_COLORS.map((color, index) => (
          <Swatch
            key={color}
            fill={color}
            label={t('form.colorLabel', { index: index + 1 })}
            selected={value === color}
            onPress={() => onChange(color)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const SWATCH = 34;
const TARGET = 44;

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.space(1.5),
  },
  label: {
    paddingHorizontal: theme.space(1),
  },
  scroller: {
    marginHorizontal: -theme.space(4),
  },
  row: {
    gap: theme.space(2),
    paddingHorizontal: theme.space(4),
  },
  ring: {
    width: TARGET,
    height: TARGET,
    borderRadius: TARGET / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      selected: {
        true: { borderColor: theme.colors.text },
        false: { borderColor: 'transparent' },
      },
    },
  },
  swatch: (fill: string) => ({
    width: SWATCH,
    height: SWATCH,
    borderRadius: SWATCH / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fill,
  }),
}));
