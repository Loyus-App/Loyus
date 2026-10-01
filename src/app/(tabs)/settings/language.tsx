import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '@/domain/language';
import { i18n, resolveLanguage } from '@/infra/i18n';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { SettingsSubscreen } from '@/ui/components/SettingsSubscreen';
import { LANGUAGES, nativeLanguageName } from '@/ui/constants/languages';
import { ListRow, ListSection } from '@/ui/primitives';
import { ignore } from '@/ui/utils/ignore';

function chooseLanguage(code: LanguageCode): void {
  useSettingsStore.getState().setLanguage(code);
  i18n.changeLanguage(resolveLanguage(code)).catch(ignore);
  router.back();
}

export default function LanguageScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);

  return (
    <SettingsSubscreen>
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
    </SettingsSubscreen>
  );
}
