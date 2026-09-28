import type { ComponentProps, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from '../theme/unistyles';

interface ScreenShellProps {
  children: ReactNode;
  style?: ComponentProps<typeof SafeAreaView>['style'];
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
