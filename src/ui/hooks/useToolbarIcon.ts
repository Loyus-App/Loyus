import { type SFSymbol, unstable_getMaterialSymbolSourceAsync } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { type ImageSourcePropType, Platform } from 'react-native';
import { ignore } from '@/ui/utils/ignore';
import type { IconName } from '../primitives';

export type ToolbarIcon = SFSymbol | ImageSourcePropType;

const TOOLBAR_ICON_SIZE = 24;

export function useToolbarIcon(icon: IconName, color: string): ToolbarIcon | undefined {
  const [source, setSource] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') return;
    let isActive = true;
    unstable_getMaterialSymbolSourceAsync(icon.android, TOOLBAR_ICON_SIZE, color)
      .then((result) => {
        if (isActive) setSource(result);
      })
      .catch(ignore);
    return () => {
      isActive = false;
    };
  }, [icon.android, color]);

  if (Platform.OS === 'ios') return icon.ios;
  return source ?? undefined;
}
