import './theme/unistyles';
import { initI18n } from '@/infra/i18n';
import { initAppearanceOverride } from '@/infra/platform/appearance';
import { useSettingsStore } from '@/state/stores/settingsStore';

initAppearanceOverride();
initI18n(useSettingsStore.getState().language);
