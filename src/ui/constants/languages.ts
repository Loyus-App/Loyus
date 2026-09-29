import type { LanguageCode } from '@/infra/i18n';

export type AppLanguage = Exclude<LanguageCode, 'auto'>;

export const LANGUAGES: readonly { readonly code: AppLanguage; readonly nativeName: string }[] = [
  { code: 'en', nativeName: 'English' },
  { code: 'fr', nativeName: 'Français' },
  { code: 'es', nativeName: 'Español' },
  { code: 'pt', nativeName: 'Português' },
  { code: 'ru', nativeName: 'Русский' },
  { code: 'de', nativeName: 'Deutsch' },
];

export function nativeLanguageName(code: AppLanguage): string {
  return LANGUAGES.find((language) => language.code === code)?.nativeName ?? code;
}
