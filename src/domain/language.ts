export const APP_LANGUAGES = ['en', 'fr', 'es', 'pt', 'ru', 'de'] as const;

export type AppLanguage = (typeof APP_LANGUAGES)[number];

export type LanguageCode = 'auto' | AppLanguage;

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return APP_LANGUAGES.some((language) => language === value);
}

export function isLanguageCode(value: unknown): value is LanguageCode {
  return value === 'auto' || isAppLanguage(value);
}
