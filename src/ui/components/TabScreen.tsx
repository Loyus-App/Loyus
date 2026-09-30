import type { ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { GradientLayer } from '../primitives/GradientLayer';
import { Text } from '../primitives/Text';

type Props = {
  readonly title: string;
  readonly action?: ReactNode;
  readonly children: ReactNode;
  readonly pinnedTitle?: boolean | undefined;
  readonly testID?: string | undefined;
};

const EDGE_FADE_RANGE = [0, 24];

const Sky = withUnistyles(GradientLayer, (theme) => ({ image: theme.gradients.sky }));

const SkyEdge = withUnistyles(GradientLayer, (theme) => ({ image: theme.gradients.skyEdge }));

export function TabScreen({
  title,
  action,
  children,
  pinnedTitle = false,
  testID,
}: Props): React.JSX.Element {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const edgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.get(), EDGE_FADE_RANGE, [0, 1], Extrapolation.CLAMP),
  }));

  const header = (
    <View style={styles.header}>
      <Text variant="display" accessibilityRole="header" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {action}
    </View>
  );

  return (
    <View style={styles.root}>
      <Sky />
      {pinnedTitle ? <View style={styles.pinnedHeader}>{header}</View> : null}
      <Animated.ScrollView
        ref={scrollRef}
        testID={testID}
        // iOS 27 draws the native search field under the pinned title, so UIKit insets the content below it.
        contentInsetAdjustmentBehavior={pinnedTitle ? 'automatic' : 'never'}
        contentContainerStyle={[styles.content, pinnedTitle && styles.pinnedContent]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
      >
        {pinnedTitle ? null : header}
        {children}
      </Animated.ScrollView>
      {pinnedTitle ? null : (
        <Animated.View pointerEvents="none" style={[styles.statusEdge, edgeStyle]}>
          <SkyEdge />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.space(6),
    paddingHorizontal: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space(3),
    minHeight: theme.size.touch,
    paddingTop: theme.space(2),
    marginBottom: -theme.space(3),
  },
  pinnedHeader: {
    paddingHorizontal: theme.space(4),
    paddingBottom: theme.space(4),
  },
  pinnedContent: {
    paddingTop: theme.space(2),
  },
  title: {
    flex: 1,
  },
  statusEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: rt.insets.top + theme.space(4),
  },
}));
