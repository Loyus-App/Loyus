import { Appearance } from 'react-native';
import { e2eTheme, isE2E } from '../env';

/**
 * In E2E mode, force the color scheme to the value of EXPO_PUBLIC_E2E_THEME.
 * This must run before any component reads useColorScheme().
 *
 * Values: 'light' | 'dark' | undefined (= follow system)
 */
export function initAppearanceOverride(): void {
  if (!isE2E) return;

  if (e2eTheme === 'light' || e2eTheme === 'dark') {
    Appearance.setColorScheme(e2eTheme);
  }
}
