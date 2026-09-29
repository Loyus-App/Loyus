import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { MigrationRegistry } from '../../domain/migration';
import { runMigrations } from '../../domain/migration';
import type { SortMode } from '../../domain/sort';
import type { LanguageCode } from '../../infra/i18n';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';

const SETTINGS_STORE_VERSION = 5;

export const ACCENT_NAMES = ['teal', 'blue', 'indigo', 'orange', 'pink', 'green'] as const;

export type AccentName = (typeof ACCENT_NAMES)[number];

export const DEFAULT_ACCENT: AccentName = 'teal';

export function isAccentName(value: unknown): value is AccentName {
  return ACCENT_NAMES.some((name) => name === value);
}

const settingsMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
  2: (state: unknown) => ({ ...(state as object), cardViewMode: 'grid' }),
  3: (state: unknown) => ({ ...(state as object), language: 'auto' }),
  4: (state: unknown) => ({ ...(state as object), sortMode: 'mostUsed', maxBrightness: true }),
  5: (state: unknown) => ({ ...(state as object), accent: DEFAULT_ACCENT }),
};

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  cardViewMode: 'grid' | 'list';
  language: LanguageCode;
  sortMode: SortMode;
  maxBrightness: boolean;
  accent: AccentName;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCardViewMode: (mode: 'grid' | 'list') => void;
  setLanguage: (lang: LanguageCode) => void;
  setSortMode: (mode: SortMode) => void;
  setMaxBrightness: (enabled: boolean) => void;
  setAccent: (accent: AccentName) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      cardViewMode: 'grid',
      language: 'auto' as LanguageCode,
      sortMode: 'mostUsed' as SortMode,
      maxBrightness: true,
      accent: DEFAULT_ACCENT,
      setTheme: (theme) => set({ theme }),
      setCardViewMode: (mode) => set({ cardViewMode: mode }),
      setLanguage: (language) => set({ language }),
      setSortMode: (sortMode) => set({ sortMode }),
      setMaxBrightness: (maxBrightness) => set({ maxBrightness }),
      setAccent: (accent) => set({ accent }),
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
      partialize: (state) => ({
        theme: state.theme,
        cardViewMode: state.cardViewMode,
        language: state.language,
        sortMode: state.sortMode,
        maxBrightness: state.maxBrightness,
        accent: state.accent,
      }),
    },
  ),
);
