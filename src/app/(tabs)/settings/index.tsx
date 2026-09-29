import Constants from 'expo-constants';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { TabScreen } from '@/ui/components/TabScreen';
import { nativeLanguageName } from '@/ui/constants/languages';
import { PRIVACY_POLICY_URL, REPOSITORY_URL } from '@/ui/constants/links';
import { icons, ListRow, ListSection, SegmentedControl, Switch } from '@/ui/primitives';
import { testId, tid } from '@/ui/testIds';
import {
  ACCENT_LABELS,
  setThemePreference,
  THEME_PREFERENCES,
  type ThemePreference,
} from '@/ui/theme';
import { exportBackup, restoreBackup } from '@/ui/utils/backup';

const APP_VERSION = Constants.expoConfig?.version;

const THEME_LABELS = {
  system: 'settings.themeSystem',
  light: 'settings.themeLight',
  dark: 'settings.themeDark',
} as const satisfies Record<ThemePreference, string>;

const THEME_TEST_IDS = {
  system: 'themeSystem',
  light: 'themeLight',
  dark: 'themeDark',
} as const satisfies Record<ThemePreference, string>;

type BackupTask = 'export' | 'restore';

const BACKUP_TASKS: Record<BackupTask, () => Promise<void>> = {
  export: exportBackup,
  restore: restoreBackup,
};

function openLink(url: string): void {
  WebBrowser.openBrowserAsync(url).catch(() => undefined);
}

export default function SettingsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <TabScreen title={t('settings.title')} testID={testId('settingsScreen')}>
      <AppearanceSection />
      <LanguageSection />
      <CheckoutSection />
      <DataSection />
      <PrivacySection />
      <AboutSection />
    </TabScreen>
  );
}

function AppearanceSection(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  const options = THEME_PREFERENCES.map((preference) => ({
    value: preference,
    label: t(THEME_LABELS[preference]),
    testID: testId(THEME_TEST_IDS[preference]),
  }));

  return (
    <ListSection title={t('settings.appearance')}>
      <View style={styles.segmentRow}>
        <SegmentedControl
          options={options}
          value={theme}
          onChange={setThemePreference}
          accessibilityLabel={t('settings.appearance')}
        />
      </View>
      <AccentRow />
    </ListSection>
  );
}

function AccentRow(): React.JSX.Element {
  const { t } = useTranslation();
  const accent = useSettingsStore((state) => state.accent);

  return (
    <ListRow
      icon={icons.palette}
      tint="accent"
      title={t('settings.accent')}
      value={t(ACCENT_LABELS[accent])}
      accessory="chevron"
      onPress={() => router.push('/settings/accent')}
      testID={testId('accentRow')}
    />
  );
}

function LanguageSection(): React.JSX.Element {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const languageName =
    language === 'auto' ? t('settings.languageAuto') : nativeLanguageName(language);

  return (
    <ListSection title={t('settings.language')}>
      <ListRow
        {...tid('languageRow')}
        icon={icons.language}
        tint="blue"
        title={t('settings.language')}
        value={languageName}
        accessory="chevron"
        onPress={() => router.push('/settings/language')}
      />
    </ListSection>
  );
}

function CheckoutSection(): React.JSX.Element {
  const { t } = useTranslation();
  const maxBrightness = useSettingsStore((state) => state.maxBrightness);
  const setMaxBrightness = useSettingsStore((state) => state.setMaxBrightness);

  return (
    <ListSection title={t('settings.checkout')} footer={t('settings.maxBrightnessFooter')}>
      <ListRow
        icon={icons.brightness}
        tint="orange"
        title={t('settings.maxBrightness')}
        accessory={
          <Switch
            testID={testId('maxBrightnessSwitch')}
            value={maxBrightness}
            onValueChange={setMaxBrightness}
            accessibilityLabel={t('settings.maxBrightness')}
          />
        }
      />
    </ListSection>
  );
}

function DataSection(): React.JSX.Element {
  const { t } = useTranslation();
  const [pending, setPending] = useState<BackupTask | null>(null);

  const run = (task: BackupTask) => {
    setPending(task);
    BACKUP_TASKS[task]()
      .catch(() => undefined)
      .finally(() => setPending(null));
  };

  return (
    <ListSection title={t('settings.data')} footer={t('settings.dataFooter')}>
      <ListRow
        {...tid('exportCardsRow')}
        icon={icons.export}
        tint="green"
        title={t('settings.exportBackup')}
        accessory="chevron"
        loading={pending === 'export'}
        disabled={pending === 'restore'}
        onPress={() => run('export')}
      />
      <ListRow
        {...tid('restoreBackupRow')}
        icon={icons.import}
        tint="indigo"
        title={t('settings.restoreBackup')}
        accessory="chevron"
        loading={pending === 'restore'}
        disabled={pending === 'export'}
        onPress={() => run('restore')}
      />
    </ListSection>
  );
}

function PrivacySection(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <ListSection title={t('settings.privacy')} footer={t('settings.privacyFooter')}>
      <ListRow icon={icons.person} tint="gray" title={t('settings.privacyNoAccount')} />
      <ListRow icon={icons.hand} tint="gray" title={t('settings.privacyNoTracking')} />
      <ListRow icon={icons.offline} tint="gray" title={t('settings.privacyOffline')} />
      <ListRow
        {...tid('privacyPolicyRow')}
        icon={icons.doc}
        tint="gray"
        title={t('settings.privacyPolicy')}
        accessory="chevron"
        onPress={() => openLink(PRIVACY_POLICY_URL)}
      />
    </ListSection>
  );
}

function AboutSection(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <ListSection title={t('settings.about')}>
      <ListRow
        {...tid('aboutVersion')}
        icon={icons.info}
        tint="gray"
        title={t('settings.version')}
        value={APP_VERSION}
      />
      <ListRow
        icon={icons.code}
        tint="gray"
        title={t('settings.sourceCode')}
        accessory="chevron"
        onPress={() => openLink(REPOSITORY_URL)}
      />
    </ListSection>
  );
}

const styles = StyleSheet.create((theme) => ({
  segmentRow: {
    padding: theme.space(3),
  },
}));
