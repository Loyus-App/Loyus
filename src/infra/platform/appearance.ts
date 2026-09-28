import { Appearance } from 'react-native';
import { e2eTheme, isE2E } from '../env';

/** Must run before any component reads useColorScheme(). */
export function initAppearanceOverride(): void {
  if (!isE2E) return;

  if (e2eTheme === 'light' || e2eTheme === 'dark') {
    Appearance.setColorScheme(e2eTheme);
  }
}
