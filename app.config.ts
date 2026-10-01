import type { ExpoConfig, ConfigContext } from 'expo/config';
import { ALTERNATE_APP_ICONS, type AppIconName, DEFAULT_APP_ICON, nativeIconName } from './src/domain/appIcon.ts';

const APP_ICONS_DIR = './assets/images/app-icons';

const iosIconFiles = (name: AppIconName) => ({
  light: `${APP_ICONS_DIR}/${name}/ios-light.png`,
  dark: `${APP_ICONS_DIR}/${name}/ios-dark.png`,
  tinted: `${APP_ICONS_DIR}/${name}/ios-tinted.png`,
});

const defaultIosIcon = iosIconFiles(DEFAULT_APP_ICON);

const androidAdaptiveIcon = {
  foregroundImage: `${APP_ICONS_DIR}/${DEFAULT_APP_ICON}/android-foreground.png`,
  backgroundImage: `${APP_ICONS_DIR}/${DEFAULT_APP_ICON}/android-background.png`,
  monochromeImage: `${APP_ICONS_DIR}/android-monochrome.png`,
};

const alternateAppIcons = ALTERNATE_APP_ICONS.map((name) => ({
  name: nativeIconName(name),
  ios: iosIconFiles(name),
}));

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Loyus',
  slug: 'loyus',
  version: '0.1.0',
  scheme: 'loyus',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  icon: defaultIosIcon.light,
  updates: {
    checkAutomatically: 'NEVER' as const,
  },
  ios: {
    icon: defaultIosIcon,
    supportsTablet: false,
    bundleIdentifier: 'com.loyus.app',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSCameraUsageDescription:
        'Loyus uses the camera to scan loyalty card barcodes and, if you want, to photograph your cards.',
      NSLocationWhenInUseUsageDescription:
        'Loyus does not access your location. This description is required by iOS because a bundled library references the location API, even though Loyus never requests it.',
    },
    privacyManifests: {
      NSPrivacyCollectedDataTypes: [],
      NSPrivacyTracking: false,
      NSPrivacyTrackingDomains: [],
      NSPrivacyAccessedAPITypes: [
        {
          NSPrivacyAccessedAPIType:
            'NSPrivacyAccessedAPICategoryUserDefaults',
          NSPrivacyAccessedAPITypeReasons: ['CA92.1'],
        },
        {
          NSPrivacyAccessedAPIType:
            'NSPrivacyAccessedAPICategoryFileTimestamp',
          NSPrivacyAccessedAPITypeReasons: ['C617.1'],
        },
        {
          NSPrivacyAccessedAPIType:
            'NSPrivacyAccessedAPICategorySystemBootTime',
          NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
        },
        {
          NSPrivacyAccessedAPIType:
            'NSPrivacyAccessedAPICategoryDiskSpace',
          NSPrivacyAccessedAPITypeReasons: ['E174.1'],
        },
      ],
    },
  },
  android: {
    adaptiveIcon: androidAdaptiveIcon,
    package: 'com.loyus.app',
    permissions: ['android.permission.CAMERA'],
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#F2F3F5',
        dark: { backgroundColor: '#0B0F14' },
      },
    ],
    'expo-localization',
    'expo-status-bar',
    'expo-web-browser',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Loyus opens your photos only to read a barcode or add a picture of a card you choose.',
        cameraPermission:
          'Loyus uses the camera to scan loyalty card barcodes and, if you want, to photograph your cards.',
        microphonePermission: false,
      },
    ],
    [
      'expo-widgets',
      {
        bundleIdentifier: 'com.loyus.app.widget',
        groupIdentifier: 'group.com.loyus.app.shared',
        widgets: [
          {
            name: 'LoyusCards',
            displayName: 'Cards',
            description: 'Your pinned cards, one tap from the till.',
            ios: {
              supportedFamilies: [
                'systemSmall',
                'systemMedium',
                'accessoryRectangular',
                'accessoryCircular',
              ],
              initialLayout: 'src/widgets/CardsWidget.ios.tsx',
            },
            android: null,
          },
        ],
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 29,
        },
      },
    ],
    ['./plugins/withAlternateAppIconsIos', alternateAppIcons],
    './plugins/withBackupRules',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: '60b43fe4-af48-48e5-ab72-f8d7bc8bdd66',
    },
  },
});
