import { NativeTabs } from 'expo-router/native-tabs';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { useSystemShortcuts } from '@/ui/hooks/useSystemShortcuts';

// biome-ignore lint/style/useNamingConvention: Expo Router requires this exact export name
export const unstable_settings = {
  anchor: '(cards)',
};

export default function TabsLayout(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  useSystemShortcuts();

  return (
    <NativeTabs tintColor={theme.colors.accent}>
      <NativeTabs.Trigger name="(cards)" accessibilityLabel={t('tabs.cards')} testID="tab-cards">
        <NativeTabs.Trigger.Icon sf="creditcard.fill" md="credit_card" />
        <NativeTabs.Trigger.Label>{t('tabs.cards')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="settings"
        accessibilityLabel={t('tabs.settings')}
        testID="tab-settings"
      >
        <NativeTabs.Trigger.Icon sf="gearshape.fill" md="settings" />
        <NativeTabs.Trigger.Label>{t('tabs.settings')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="search"
        accessibilityLabel={t('tabs.search')}
        role="search"
        testID="tab-search"
      >
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label>{t('tabs.search')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
