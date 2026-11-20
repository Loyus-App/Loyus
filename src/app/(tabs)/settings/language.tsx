import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { LANGUAGES, nativeLanguageName } from '@/features/settings/ui/languages';
import { SettingsSubscreen } from '@/features/settings/ui/SettingsSubscreen';
import { i18n, resolveLanguage } from '@/shared/i18n';
import type { LanguageCode } from '@/shared/i18n/language';
import { ignore } from '@/shared/lib/ignore';
import { ListRow, ListSection } from '@/shared/ui/primitives';

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
