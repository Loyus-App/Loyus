import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { APP_INFO } from '../constants/app';
import { useAppIcon } from '../hooks/useAppIcon';
import { Text } from '../primitives';
import { AppIconImage } from './AppIconImage';
import { PrivacyPromises } from './PrivacyPromises';

const ICON_SIZE = 60;

export function SettingsIdentityCard({
  testID,
}: {
  readonly testID?: string | undefined;
}): React.JSX.Element {
  const { t } = useTranslation();
  const appIcon = useAppIcon();

  return (
    <View style={styles.card} testID={testID}>
      <View style={styles.identity}>
        <AppIconImage name={appIcon} size={ICON_SIZE} />
        <View style={styles.texts}>
          <Text variant="headline" accessibilityRole="header">
            {APP_INFO.name}
          </Text>
          <Text variant="callout" tone="muted" weight="regular">
            {t('settings.identityTagline')}
          </Text>
        </View>
      </View>
      <PrivacyPromises layout="inline" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    gap: theme.space(3.5),
    padding: theme.space(4),
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.surface,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3.5),
  },
  texts: {
    flex: 1,
    gap: theme.space(0.5),
  },
}));
