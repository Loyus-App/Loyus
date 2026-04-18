import { View } from 'react-native';

/**
 * Placeholder screen for the Scan tab.
 * The actual scan functionality is handled by intercepting the tab press
 * and navigating to /card/scan instead. This file exists because
 * Expo Router requires a file for each tab screen name.
 */
export default function ScanTabPlaceholder(): React.JSX.Element {
  return <View />;
}
