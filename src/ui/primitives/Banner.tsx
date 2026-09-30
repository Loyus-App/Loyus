import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { withAlpha } from '../theme/color';
import { transitions } from '../theme/motion';
import { Icon } from './Icon';
import { icons } from './icons';
import { Text } from './Text';

type Props = {
  readonly message: string;
  readonly tone?: 'info' | 'warning';
  readonly testID?: string | undefined;
};

export function Banner({ message, tone = 'info', testID }: Props): React.JSX.Element {
  styles.useVariants({ tone });
  return (
    <Animated.View
      testID={testID}
      style={styles.banner}
      accessibilityRole="alert"
      entering={transitions.crossfadeIn()}
    >
      <Icon
        name={tone === 'warning' ? icons.warning : icons.info}
        tone={tone === 'warning' ? 'warning' : 'accent'}
      />
      <Text variant="callout" style={styles.message}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    paddingVertical: theme.space(3),
    paddingHorizontal: theme.space(4),
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    variants: {
      tone: {
        info: { backgroundColor: withAlpha(theme.colors.accent, 0.12) },
        warning: { backgroundColor: withAlpha(theme.colors.warning, 0.14) },
      },
    },
  },
  message: {
    flex: 1,
  },
}));
