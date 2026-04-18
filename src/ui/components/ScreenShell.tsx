import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from '../theme/unistyles';

interface ScreenShellProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function ScreenShell({ children, style, testID }: ScreenShellProps): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container, style]} testID={testID}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
}));
