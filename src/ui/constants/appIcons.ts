import type { ImageSourcePropType } from 'react-native';
import type { AppIconName } from '@/domain/appIcon';

export const APP_ICON_LABELS = {
  night: 'settings.appIconNight',
  ocean: 'settings.appIconOcean',
  amethyst: 'settings.appIconAmethyst',
  rose: 'settings.appIconRose',
  sunset: 'settings.appIconSunset',
  mint: 'settings.appIconMint',
  gold: 'settings.appIconGold',
  aurora: 'settings.appIconAurora',
  graphite: 'settings.appIconGraphite',
  daylight: 'settings.appIconDaylight',
} as const satisfies Record<AppIconName, string>;

export const APP_ICON_THUMBNAILS: Readonly<Record<AppIconName, ImageSourcePropType>> = {
  night: require('../../../assets/images/app-icons/thumbnails/night.png'),
  ocean: require('../../../assets/images/app-icons/thumbnails/ocean.png'),
  amethyst: require('../../../assets/images/app-icons/thumbnails/amethyst.png'),
  rose: require('../../../assets/images/app-icons/thumbnails/rose.png'),
  sunset: require('../../../assets/images/app-icons/thumbnails/sunset.png'),
  mint: require('../../../assets/images/app-icons/thumbnails/mint.png'),
  gold: require('../../../assets/images/app-icons/thumbnails/gold.png'),
  aurora: require('../../../assets/images/app-icons/thumbnails/aurora.png'),
  graphite: require('../../../assets/images/app-icons/thumbnails/graphite.png'),
  daylight: require('../../../assets/images/app-icons/thumbnails/daylight.png'),
};
