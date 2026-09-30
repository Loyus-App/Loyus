import { APP_LANGUAGES, type AppLanguage } from '@/domain/language';

const NATIVE_NAMES = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  ru: 'Русский',
  de: 'Deutsch',
} as const satisfies Record<AppLanguage, string>;

export const LANGUAGES: readonly { readonly code: AppLanguage; readonly nativeName: string }[] =
  APP_LANGUAGES.map((code) => ({ code, nativeName: NATIVE_NAMES[code] }));

export function nativeLanguageName(code: AppLanguage): string {
  return NATIVE_NAMES[code];
}
