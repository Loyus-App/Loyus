import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { AppIconImage } from '@/ui/components/AppIconImage';
import { PrivacyPromises } from '@/ui/components/PrivacyPromises';
import { SettingsSubscreen } from '@/ui/components/SettingsSubscreen';
import { APP_INFO } from '@/ui/constants/app';
import { PRIVACY_POLICY_URL, REPOSITORY_URL } from '@/ui/constants/links';
import { useAppIcon } from '@/ui/hooks/useAppIcon';
import { icons, ListRow, ListSection, Text } from '@/ui/primitives';
import { testId, tid } from '@/ui/testIds';
import { openLink } from '@/ui/utils/openLink';

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
