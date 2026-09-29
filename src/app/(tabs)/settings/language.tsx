import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { i18n, type LanguageCode, resolveLanguage } from '@/infra/i18n';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { LANGUAGES, nativeLanguageName } from '@/ui/constants/languages';
import { ListRow, ListSection } from '@/ui/primitives';

function chooseLanguage(code: LanguageCode): void {
  useSettingsStore.getState().setLanguage(code);
  i18n.changeLanguage(resolveLanguage(code)).catch(() => undefined);
  router.back();
}

export default function LanguageScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <ListSection>
        <ListRow
          title={t('settings.languageAuto')}
          subtitle={nativeLanguageName(resolveLanguage('auto'))}
          accessory="check"
          selected={language === 'auto'}
          onPress={() => chooseLanguage('auto')}
        />
        {LANGUAGES.map(({ code, nativeName }) => (
          <ListRow
            key={code}
            title={nativeName}
            accessory="check"
            selected={language === code}
            onPress={() => chooseLanguage(code)}
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
}));
