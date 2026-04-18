import { Pressable, Text, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { useSettingsStore } from '../../state/stores/settingsStore';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';

const THEME_OPTIONS = ['light', 'dark', 'system'] as const;
type ThemeOption = (typeof THEME_OPTIONS)[number];

const LABELS: Record<ThemeOption, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const TEST_ID_KEYS = {
  light: 'themeLight',
  dark: 'themeDark',
  system: 'themeSystem',
} as const;

function applyTheme(option: ThemeOption): void {
  if (option === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(option);
  }
}

export function ThemeSwitcher(): React.JSX.Element {
  const currentTheme = useSettingsStore((s) => s.theme);

  const handlePress = (option: ThemeOption): void => {
    useSettingsStore.getState().setTheme(option);
    applyTheme(option);
  };

  return (
    <View style={styles.container}>
      {THEME_OPTIONS.map((option) => {
        const isActive = currentTheme === option;
        return (
          <Pressable
            key={option}
            style={[styles.segment, isActive ? styles.segmentActive : undefined]}
            onPress={() => handlePress(option)}
            accessibilityRole="button"
            accessibilityLabel={`${LABELS[option]} theme`}
            accessibilityState={{ selected: isActive }}
            {...tid(TEST_ID_KEYS[option])}
          >
            <Text style={[styles.segmentText, isActive ? styles.segmentTextActive : undefined]}>
              {LABELS[option]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Apply persisted theme on app launch. Call once in root layout. */
export function restoreTheme(): void {
  const theme = useSettingsStore.getState().theme;
  applyTheme(theme);
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.containerLow,
    padding: 3,
  },
  segment: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
  },
  segmentActive: {
    backgroundColor: theme.colors.primary,
  },
  segmentText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  segmentTextActive: {
    color: theme.colors.textOnPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
}));
