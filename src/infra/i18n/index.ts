import './types';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import pt from './locales/pt';
import ru from './locales/ru';

export type LanguageCode = 'auto' | 'en' | 'fr' | 'es' | 'pt' | 'ru' | 'de';

const LANG_MAP: Record<string, Exclude<LanguageCode, 'auto'>> = {
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  ru: 'ru',
  de: 'de',
};

export function resolveLanguage(savedLanguage: LanguageCode): Exclude<LanguageCode, 'auto'> {
  if (savedLanguage !== 'auto') return savedLanguage;
  const deviceLang = getLocales()[0]?.languageCode ?? 'en';
  return LANG_MAP[deviceLang] ?? 'en';
}

export function initI18n(savedLanguage: LanguageCode): void {
  i18next.use(initReactI18next).init({
    lng: resolveLanguage(savedLanguage),
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
      ru: { translation: ru },
      de: { translation: de },
    },
    interpolation: { escapeValue: false },
    // Resources provided directly — no async backend, so init is synchronous.
    // This prevents a flash of missing key strings on first render in React Native.
  });
}

export { default as i18n } from 'i18next';
