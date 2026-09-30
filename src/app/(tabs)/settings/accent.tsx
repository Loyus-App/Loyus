import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ACCENT_NAMES, type AccentName, useSettingsStore } from '@/state/stores/settingsStore';
import { ListRow, ListSection } from '@/ui/primitives';
import { ACCENT_LABELS, accentColor, setAccentPreference } from '@/ui/theme';

const SWATCH_SIZE = 30;

function chooseAccent(accent: AccentName): void {
  if (accent === useSettingsStore.getState().accent) return;
  setAccentPreference(accent);
}

export default function AccentScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const accent = useSettingsStore((state) => state.accent);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <ListSection footer={t('settings.accentFooter')}>
        {ACCENT_NAMES.map((name) => (
          <ListRow
            key={name}
            leading={<View style={styles.swatch(name)} />}
            title={t(ACCENT_LABELS[name])}
            accessory="check"
            selected={accent === name}
            onPress={() => chooseAccent(name)}
          />
        ))}
      </ListSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(6),
    gap: theme.space(6),
  },
  swatch: (name: AccentName) => ({
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: theme.radius.pill,
    backgroundColor: accentColor(name, rt.themeName === 'dark' ? 'dark' : 'light'),
  }),
}));
