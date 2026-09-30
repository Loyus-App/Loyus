import { getLocales } from 'expo-localization';

export function deviceRegion(): string | undefined {
  return getLocales()[0]?.regionCode ?? undefined;
}
