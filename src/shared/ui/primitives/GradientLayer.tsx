import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  readonly image: string;
};

export function GradientLayer({ image }: Props): React.JSX.Element {
  return <View pointerEvents="none" style={styles.layer(image)} />;
}

const styles = StyleSheet.create({
  layer: (image: string) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundImage: image,
  }),
});
