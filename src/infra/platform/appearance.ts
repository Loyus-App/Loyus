import { Appearance } from 'react-native';
import { e2eTheme, isE2E } from '../env';

export function initAppearanceOverride(): void {
  if (!isE2E) return;

  if (e2eTheme === 'light' || e2eTheme === 'dark') {
    Appearance.setColorScheme(e2eTheme);
  }
}
