import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { MigrationRegistry } from '../../domain/migration';
import { runMigrations } from '../../domain/migration';
import type { LanguageCode } from '../../infra/i18n';
import { mmkvStateStorage } from '../../infra/persistence/mmkv';

const SETTINGS_STORE_VERSION = 3;

const settingsMigrations: MigrationRegistry = {
  1: (state: unknown) => state,
  2: (state: unknown) => ({ ...(state as object), cardViewMode: 'grid' }),
  3: (state: unknown) => ({ ...(state as object), language: 'auto' }),
};

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  cardViewMode: 'grid' | 'list';
  language: LanguageCode;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCardViewMode: (mode: 'grid' | 'list') => void;
  setLanguage: (lang: LanguageCode) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      cardViewMode: 'grid',
      language: 'auto' as LanguageCode,
      setTheme: (theme) => set({ theme }),
      setCardViewMode: (mode) => set({ cardViewMode: mode }),
      setLanguage: (language) => set({ language }),
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
      }),
    },
  ),
);
