import { Image } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type AppIconName, IOS_CORNER_RATIO } from '@/entities/settings/domain/appIcon';
import { APP_ICON_THUMBNAILS } from './appIconImages';

type Props = {
  readonly name: AppIconName;
  readonly size: number;
};

export function AppIconImage({ name, size }: Props): React.JSX.Element {
  return <Image source={APP_ICON_THUMBNAILS[name]} style={styles.icon(size)} accessible={false} />;
}

const styles = StyleSheet.create((theme) => ({
  icon: (size: number) => ({
    width: size,
    height: size,
    borderRadius: Math.round(size * IOS_CORNER_RATIO),
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  }),
}));
