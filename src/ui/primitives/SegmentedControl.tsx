import { useEffect } from 'react';
import { type LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { spring, timing } from '../theme/motion';
import { haptics } from '../utils/haptics';
import { Text } from './Text';

export type SegmentOption<T extends string> = {
  readonly value: T;
  readonly label: string;
  readonly testID?: string | undefined;
};

type Props<T extends string> = {
  readonly options: readonly SegmentOption<T>[];
  readonly value: T | null;
  readonly onChange: (value: T) => void;
  readonly accessibilityLabel: string;
};

const INSET = 3;

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: Props<T>): React.JSX.Element {
  const selectedIndex = options.findIndex((option) => option.value === value);
  const segmentWidth = useSharedValue(0);
  const offset = useSharedValue(Math.max(selectedIndex, 0));
  const visibility = useSharedValue(selectedIndex >= 0 ? 1 : 0);

  useEffect(() => {
    if (selectedIndex >= 0) offset.set(withSpring(selectedIndex, spring.smooth));
    visibility.set(withTiming(selectedIndex >= 0 ? 1 : 0, timing.fast));
  }, [offset, selectedIndex, visibility]);

  const indicatorStyle = useAnimatedStyle(() => ({
    width: segmentWidth.get(),
    opacity: visibility.get(),
    transform: [{ translateX: offset.get() * segmentWidth.get() }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    segmentWidth.set((event.nativeEvent.layout.width - INSET * 2) / options.length);
  };

  return (
    <View
      style={styles.track}
      onLayout={handleLayout}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            testID={option.testID}
            style={styles.segment}
            onPress={() => {
              if (isSelected) return;
              haptics.selection();
              onChange(option.value);
            }}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: isSelected, selected: isSelected }}
          >
            <Text
              variant="callout"
              weight={isSelected ? 'semibold' : 'regular'}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  track: {
    flexDirection: 'row',
    padding: INSET,
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.surfaceMuted,
  },
  indicator: {
    position: 'absolute',
    top: INSET,
    bottom: INSET,
    left: INSET,
    borderRadius: theme.radius.md - INSET,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.surfaceRaised,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    boxShadow: `0 1px 3px ${theme.colors.shadow}`,
  },
  segment: {
    flex: 1,
    minHeight: theme.size.touch,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space(2),
  },
}));
