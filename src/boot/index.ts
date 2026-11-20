import './unistyles';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { initI18n } from '@/shared/i18n';
import { initAppearanceOverride } from '@/shared/platform/appearance';

initAppearanceOverride();
initI18n(useSettingsStore.getState().language);
