import { View } from 'react-native';

// Never rendered: the tab press is intercepted to push /card/scan; Expo Router needs the file.
export default function ScanTabPlaceholder(): React.JSX.Element {
  return <View />;
}
