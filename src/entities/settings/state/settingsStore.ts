import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { isSortMode, type SortMode } from '@/entities/card/domain/sort';
import { isLanguageCode, type LanguageCode } from '@/shared/i18n/language';
import type { MigrationRegistry } from '@/shared/lib/migration';
import { runMigrations } from '@/shared/lib/migration';
import { mmkvStateStorage } from '@/shared/storage/mmkv';
import { type AccentName, DEFAULT_ACCENT, isAccentName } from '@/shared/theme/accents';
import { type AppIconName, DEFAULT_APP_ICON, isAppIconName } from '../domain/appIcon';

const SETTINGS_STORE_VERSION = 5;

const settingsMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
  2: (state: unknown) => ({ ...(state as object), cardViewMode: 'grid' }),
  3: (state: unknown) => ({ ...(state as object), language: 'auto' }),
  4: (state: unknown) => ({ ...(state as object), sortMode: 'mostUsed', maxBrightness: true }),
  5: (state: unknown) => ({ ...(state as object), accent: DEFAULT_ACCENT }),
};

export type ThemePreference = 'light' | 'dark' | 'system';

export type CardViewMode = 'grid' | 'list';

const THEMES: readonly ThemePreference[] = ['light', 'dark', 'system'];
const VIEW_MODES: readonly CardViewMode[] = ['grid', 'list'];

const isOneOf =
  <T>(values: readonly T[]) =>
  (value: unknown): value is T =>
    values.some((known) => known === value);

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

const isTimestampOrNull = (value: unknown): value is number | null =>
  value === null || (typeof value === 'number' && Number.isFinite(value));

type SettingsData = Pick<
  SettingsState,
  | 'theme'
  | 'cardViewMode'
  | 'language'
  | 'sortMode'
  | 'maxBrightness'
  | 'accent'
  | 'lastBackupAt'
  | 'appIcon'
>;

const SETTINGS_GUARDS: { readonly [K in keyof SettingsData]: (value: unknown) => boolean } = {
  theme: isOneOf(THEMES),
  cardViewMode: isOneOf(VIEW_MODES),
  language: isLanguageCode,
  sortMode: isSortMode,
  maxBrightness: isBoolean,
  accent: isAccentName,
  lastBackupAt: isTimestampOrNull,
  appIcon: isAppIconName,
};

const SETTINGS_KEYS = Object.keys(SETTINGS_GUARDS) as (keyof SettingsData)[];

function validSettings(persisted: unknown): Partial<SettingsData> {
  if (persisted === null || typeof persisted !== 'object') return {};
  const fields = persisted as Readonly<Record<string, unknown>>;
  return Object.fromEntries(
    Object.entries(SETTINGS_GUARDS)
      .filter(([key, valid]) => valid(fields[key]))
      .map(([key]) => [key, fields[key]]),
  ) as Partial<SettingsData>;
}

interface SettingsState {
  theme: ThemePreference;
  cardViewMode: CardViewMode;
  language: LanguageCode;
  sortMode: SortMode;
  maxBrightness: boolean;
  accent: AccentName;
  lastBackupAt: number | null;
  appIcon: AppIconName;
  setTheme: (theme: ThemePreference) => void;
  setCardViewMode: (mode: CardViewMode) => void;
  setLanguage: (lang: LanguageCode) => void;
  setSortMode: (mode: SortMode) => void;
  setMaxBrightness: (enabled: boolean) => void;
  setAccent: (accent: AccentName) => void;
  setLastBackupAt: (at: number) => void;
  setAppIcon: (icon: AppIconName) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      cardViewMode: 'grid',
      language: 'auto',
      sortMode: 'mostUsed',
      maxBrightness: true,
      accent: DEFAULT_ACCENT,
      lastBackupAt: null,
      appIcon: DEFAULT_APP_ICON,
      setTheme: (theme) => set({ theme }),
      setCardViewMode: (mode) => set({ cardViewMode: mode }),
      setLanguage: (language) => set({ language }),
      setSortMode: (sortMode) => set({ sortMode }),
      setMaxBrightness: (maxBrightness) => set({ maxBrightness }),
      setAccent: (accent) => set({ accent }),
      setLastBackupAt: (lastBackupAt) => set({ lastBackupAt }),
      setAppIcon: (appIcon) => set({ appIcon }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => mmkvStateStorage),
      version: SETTINGS_STORE_VERSION,
      migrate: (persisted, version) =>
        runMigrations(
          persisted,
          version,
          SETTINGS_STORE_VERSION,
          settingsMigrations,
        ) as SettingsState,
      merge: (persisted, current) => ({ ...current, ...validSettings(persisted) }),
      partialize: (state): SettingsData =>
        Object.fromEntries(SETTINGS_KEYS.map((key) => [key, state[key]])) as SettingsData,
    },
  ),
);
