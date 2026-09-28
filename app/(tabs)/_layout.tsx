import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import type { ColorValue } from 'react-native';
import { useUnistyles } from '../../src/ui/theme/unistyles';

// Tint colors are theme token strings; RN types them as the wider ColorValue.
function iconColor(color: ColorValue): string | undefined {
  return typeof color === 'string' ? color : undefined;
}

export default function TabLayout(): React.JSX.Element {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.containerLowest,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Manrope-SemiBold',
          fontSize: 10,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'card' : 'card-outline'}
              size={size}
              color={iconColor(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={iconColor(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/card/scan');
          },
        }}
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'scan' : 'scan-outline'}
              size={size}
              color={iconColor(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={iconColor(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
