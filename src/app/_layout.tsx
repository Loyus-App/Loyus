import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { ActionSheetHost } from '@/ui/components/ActionSheetHost';
import { modalOptions } from '@/ui/navigation/stackOptions';
import { ignore } from '@/ui/utils/ignore';

export { ErrorBoundary } from '@/ui/components/ErrorBoundary';

// biome-ignore lint/style/useNamingConvention: Expo Router requires this exact export name
export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(ignore);

export default function RootLayout(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme, rt } = useUnistyles();
  const isDark = rt.themeName === 'dark';
  const base = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.accent,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  const formOptions = {
    ...modalOptions,
    headerTransparent: false,
    headerStyle: { backgroundColor: theme.colors.background },
  };

  useEffect(() => {
    UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background);
  }, [theme.colors.background]);

  useEffect(() => {
    SplashScreen.hideAsync().catch(ignore);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="card/[id]" options={{ ...modalOptions, title: '' }} />
          <Stack.Screen name="card/photos/[id]" options={{ ...modalOptions, title: '' }} />
          <Stack.Screen
            name="card/scan"
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen
            name="sort"
            options={{
              presentation: 'formSheet',
              headerShown: false,
              sheetAllowedDetents: 'fitToContents',
              sheetGrabberVisible: true,
            }}
          />
          <Stack.Screen
            name="card/brands"
            options={{
              presentation: 'formSheet',
              headerShown: false,
              sheetAllowedDetents: [0.75, 1],
              sheetGrabberVisible: true,
            }}
          />
          <Stack.Screen name="card/add" options={{ ...formOptions, title: t('form.titleNew') }} />
          <Stack.Screen
            name="card/confirm"
            options={{ ...formOptions, title: t('form.titleScanned') }}
          />
          <Stack.Screen
            name="card/edit/[id]"
            options={{ ...formOptions, title: t('form.titleEdit') }}
          />
          <Stack.Screen
            name="reorder"
            options={{ ...formOptions, title: t('reorder.title'), gestureEnabled: false }}
          />
        </Stack>
        {Platform.OS === 'ios' ? null : <ActionSheetHost />}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
