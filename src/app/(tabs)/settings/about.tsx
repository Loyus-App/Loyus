import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { AppIconImage } from '@/features/settings/ui/AppIconImage';
import { APP_INFO } from '@/features/settings/ui/appInfo';
import { PRIVACY_POLICY_URL, REPOSITORY_URL } from '@/features/settings/ui/links';
import { SettingsSubscreen } from '@/features/settings/ui/SettingsSubscreen';
import { useAppIcon } from '@/features/settings/ui/useAppIcon';
import { openLink } from '@/shared/platform/openLink';
import { icons, ListRow, ListSection, Text } from '@/shared/ui/primitives';
import { PrivacyPromises } from '@/shared/ui/PrivacyPromises';
import { testId, tid } from '@/shared/ui/testIds';

const ICON_SIZE = 64;

export default function AboutScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const appIcon = useAppIcon();

  return (
    <SettingsSubscreen testID={testId('aboutScreen')}>
      <View style={styles.hero}>
        <View style={styles.icon}>
          <AppIconImage name={appIcon} size={ICON_SIZE} />
        </View>
        <Text variant="headline" accessibilityRole="header">
          {APP_INFO.name}
        </Text>
        <Text {...tid('aboutVersion')} variant="caption" tone="muted">
          {t('settings.versionLabel', { version: APP_INFO.version })}
        </Text>
      </View>

      <ListSection title={t('settings.privacy')} footer={t('settings.privacyFooter')}>
        <PrivacyPromises layout="section" />
        <ListRow
          {...tid('privacyPolicyRow')}
          title={t('settings.privacyPolicy')}
          accessory="chevron"
          onPress={() => openLink(PRIVACY_POLICY_URL)}
        />
      </ListSection>

      <ListSection>
        <ListRow
          icon={icons.code}
          tint="gray"
          title={t('settings.sourceCode')}
          accessory="chevron"
          onPress={() => openLink(REPOSITORY_URL)}
        />
      </ListSection>
    </SettingsSubscreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  hero: {
    alignItems: 'center',
    gap: theme.space(1),
    paddingTop: theme.space(2),
  },
  icon: {
    marginBottom: theme.space(2),
  },
}));
