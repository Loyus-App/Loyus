import '../src/ui/theme/unistyles';

import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { i18n, initI18n } from '../src/infra/i18n';
import { initAppearanceOverride } from '../src/infra/platform/appearance';
import { useSettingsStore } from '../src/state/stores/settingsStore';
import { ErrorBoundary } from '../src/ui/components/ErrorBoundary';
import { restoreTheme } from '../src/ui/components/ThemeSwitcher';
import { useUnistyles } from '../src/ui/theme/unistyles';

export { ErrorBoundary } from '../src/ui/components/ErrorBoundary';

// biome-ignore lint/style/useNamingConvention: Expo Router requires this exact export name
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();
initAppearanceOverride();
restoreTheme();
initI18n(useSettingsStore.getState().language);

function CloseButton(): React.JSX.Element {
  const { theme } = useUnistyles();
  return (
    <Pressable onPress={() => router.back()} hitSlop={8}>
      <Ionicons name="close" size={24} color={theme.colors.text} />
    </Pressable>
  );
}

export default function RootLayout(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="card/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="card/add"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="card/edit/[id]"
          options={{
            title: i18n.t('cardEdit.headerTitle'),
            presentation: 'modal',
            headerLeft: () => <CloseButton />,
          }}
        />
        <Stack.Screen
          name="card/scan"
          options={{ title: i18n.t('scan.headerTitle'), headerShown: false }}
        />
        <Stack.Screen name="card/confirm" options={{ title: i18n.t('cardConfirm.saveCard') }} />
      </Stack>
      <StatusBar style="auto" />
    </ErrorBoundary>
  );
}
