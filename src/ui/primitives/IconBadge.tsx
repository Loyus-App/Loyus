import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { subtleGradient, washGradient } from '../theme/color';
import type { AppTheme } from '../theme/themes';
import { GradientLayer } from './GradientLayer';
import { Icon, type IconName } from './Icon';

export type BadgeTint = Exclude<keyof AppTheme['badge'], 'glyph' | 'style'>;

type Props = {
  readonly icon: IconName;
  readonly tint: BadgeTint;
  readonly size?: number;
};

export function IconBadge({ icon, tint, size = 30 }: Props): React.JSX.Element {
  const { theme } = useUnistyles();
  const color = theme.badge[tint];
  const isSolid = theme.badge.style === 'solid';

  return (
    <View style={styles.badge(size, isSolid ? color : undefined)}>
      <GradientLayer image={isSolid ? subtleGradient(color) : washGradient(color, 0.28, 0.16)} />
      <Icon
        name={icon}
        size={Math.round(size * 0.54)}
        color={isSolid ? theme.badge.glyph : color}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  badge: (size: number, fallback?: string) => ({
    width: size,
    height: size,
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fallback,
  }),
}));
