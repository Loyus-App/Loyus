import 'i18next';
import type en from './locales/en';

// en.ts is `as const`: widen its leaf literals so other locales can supply their own text.
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translation = DeepStringify<typeof en>;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
