import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ACCENT_NAMES, type AccentName, useSettingsStore } from '@/state/stores/settingsStore';
import { SettingsSubscreen } from '@/ui/components/SettingsSubscreen';
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
    <SettingsSubscreen>
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
    </SettingsSubscreen>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  swatch: (name: AccentName) => ({
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: theme.radius.pill,
    backgroundColor: accentColor(name, rt.themeName === 'dark' ? 'dark' : 'light'),
  }),
}));
