import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import {
  setThemePreference,
  THEME_PREFERENCES,
  type ThemePreference,
} from '@/entities/settings/ui/preference';
import { type BackupStatus, backupStatus } from '@/features/backup/domain/backup';
import { exportBackup, restoreBackup } from '@/features/backup/ui/backupActions';
import { canChangeAppIcon } from '@/features/settings/ui/appIconActions';
import { AppIconImage } from '@/features/settings/ui/AppIconImage';
import { APP_ICON_LABELS } from '@/features/settings/ui/appIconImages';
import { APP_INFO } from '@/features/settings/ui/appInfo';
import { formatDayMonth } from '@/features/settings/ui/dates';
import { nativeLanguageName } from '@/features/settings/ui/languages';
import { ISSUES_URL } from '@/features/settings/ui/links';
import { SettingsIdentityCard } from '@/features/settings/ui/SettingsIdentityCard';
import { useAppIcon } from '@/features/settings/ui/useAppIcon';
import { useToday } from '@/features/settings/ui/useToday';
import { ignore } from '@/shared/lib/ignore';
import { openLink } from '@/shared/platform/openLink';
import { ACCENT_LABELS } from '@/shared/theme';
import {
  icons,
  ListRow,
  ListSection,
  SegmentedControl,
  Switch,
  Text,
} from '@/shared/ui/primitives';
import { TabScreen } from '@/shared/ui/TabScreen';
import { testId, tid } from '@/shared/ui/testIds';

const APP_ICON_SIZE = 30;

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

type Translate = ReturnType<typeof useTranslation>['t'];

function describeBackup(status: BackupStatus, t: Translate, locale: string): string {
  switch (status.kind) {
    case 'never':
      return t('settings.noBackupYet');
    case 'today':
      return t('settings.lastBackupToday');
    case 'earlier':
      return t('settings.lastBackup', {
        date: formatDayMonth(status.at, locale, !status.sameYear),
      });
  }
}

export default function SettingsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <TabScreen title={t('settings.title')} testID={testId('settingsScreen')}>
      <SettingsIdentityCard testID={testId('identityCard')} />
      <BackupSection />
      <CheckoutSection />
      <AppearanceSection />
      <MoreSection />
      <Text {...tid('settingsVersion')} variant="caption" tone="muted" style={styles.version}>
        {t('settings.versionFooter', { name: APP_INFO.name, version: APP_INFO.version })}
      </Text>
    </TabScreen>
  );
}

function BackupSection(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const lastBackupAt = useSettingsStore((state) => state.lastBackupAt);
  const today = useToday();
  const status = backupStatus(lastBackupAt, Math.max(today, lastBackupAt ?? today));
  const [pending, setPending] = useState<BackupTask | null>(null);

  const run = (task: BackupTask) => {
    setPending(task);
    BACKUP_TASKS[task]()
      .catch(ignore)
      .finally(() => setPending(null));
  };

  return (
    <ListSection title={t('settings.backup')} footer={t('settings.backupFooter')}>
      <ListRow
        {...tid('exportCardsRow')}
        icon={icons.export}
        tint="green"
        title={t('settings.exportBackup')}
        subtitle={describeBackup(status, t, i18n.language)}
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

function AppearanceSection(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  const options = THEME_PREFERENCES.map((preference) => ({
    value: preference,
    label: t(THEME_LABELS[preference]),
    testID: testId(THEME_TEST_IDS[preference]),
  }));

  return (
    <ListSection title={t('settings.appearanceAndLanguage')}>
      <View style={styles.segmentRow}>
        <SegmentedControl
          options={options}
          value={theme}
          onChange={setThemePreference}
          accessibilityLabel={t('settings.theme')}
        />
      </View>
      <AccentRow />
      {canChangeAppIcon ? <AppIconRow /> : null}
      <LanguageRow />
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

function AppIconRow(): React.JSX.Element {
  const { t } = useTranslation();
  const appIcon = useAppIcon();

  return (
    <ListRow
      leading={<AppIconImage name={appIcon} size={APP_ICON_SIZE} />}
      title={t('settings.appIcon')}
      value={t(APP_ICON_LABELS[appIcon])}
      accessory="chevron"
      onPress={() => router.push('/settings/app-icon')}
      testID={testId('appIconRow')}
    />
  );
}

function LanguageRow(): React.JSX.Element {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const languageName =
    language === 'auto' ? t('settings.languageAuto') : nativeLanguageName(language);

  return (
    <ListRow
      {...tid('languageRow')}
      icon={icons.language}
      tint="blue"
      title={t('settings.language')}
      value={languageName}
      accessory="chevron"
      onPress={() => router.push('/settings/language')}
    />
  );
}

function MoreSection(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <ListSection>
      <ListRow
        {...tid('helpRow')}
        icon={icons.feedback}
        tint="gray"
        title={t('settings.help')}
        accessory="chevron"
        onPress={() => openLink(ISSUES_URL)}
      />
      <ListRow
        {...tid('aboutRow')}
        icon={icons.info}
        tint="gray"
        title={t('settings.aboutAndPrivacy')}
        accessory="chevron"
        onPress={() => router.push('/settings/about')}
      />
    </ListSection>
  );
}

const styles = StyleSheet.create((theme) => ({
  segmentRow: {
    padding: theme.space(3),
  },
  version: {
    textAlign: 'center',
  },
}));
