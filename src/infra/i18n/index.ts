import './types';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  type AppLanguage,
  DEFAULT_LANGUAGE,
  isAppLanguage,
  type LanguageCode,
} from '../../domain/language';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import pt from './locales/pt';
import ru from './locales/ru';

const RESOURCES = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  pt: { translation: pt },
  ru: { translation: ru },
  de: { translation: de },
} satisfies Record<AppLanguage, unknown>;

export function resolveLanguage(savedLanguage: LanguageCode): AppLanguage {
  if (savedLanguage !== 'auto') return savedLanguage;
  const deviceLang = getLocales()[0]?.languageCode;
  return isAppLanguage(deviceLang) ? deviceLang : DEFAULT_LANGUAGE;
}

export function initI18n(savedLanguage: LanguageCode): void {
  i18next.use(initReactI18next).init({
    lng: resolveLanguage(savedLanguage),
    fallbackLng: DEFAULT_LANGUAGE,
    resources: RESOURCES,
    interpolation: { escapeValue: false },
  });
}

export { default as i18n } from 'i18next';
