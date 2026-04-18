import 'i18next';
import type en from './locales/en';

// Recursively convert all leaf string literal types to `string`.
// Used so translation files can provide different strings than the English source.
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

/** Type for non-English locale files — same shape as en.ts but any string values. */
export type Translation = DeepStringify<typeof en>;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
