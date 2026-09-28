import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Loyus',
  slug: 'loyus',
  version: '0.1.0',
  scheme: 'loyus',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  updates: {
    checkAutomatically: 'NEVER' as const,
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.loyus.app',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSCameraUsageDescription: 'Loyus needs camera access to scan loyalty card barcodes.',
      // Apple requires this because a transitive dep references CoreLocation, though unused.
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
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
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
        backgroundColor: '#FFFFFF',
      },
    ],
    'expo-localization',
    'expo-sharing',
    'expo-status-bar',
    'expo-web-browser',
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 29,
        },
      },
    ],
    // Android only: iOS MMKV lives in Documents/, which is backed up by default.
    './plugins/withBackupRules',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Inter-Regular.ttf',
          './assets/fonts/Inter-Medium.ttf',
          './assets/fonts/Inter-SemiBold.ttf',
          './assets/fonts/Inter-Bold.ttf',
          './assets/fonts/Manrope-Regular.ttf',
          './assets/fonts/Manrope-Medium.ttf',
          './assets/fonts/Manrope-SemiBold.ttf',
          './assets/fonts/Manrope-Bold.ttf',
          './assets/fonts/Manrope-ExtraBold.ttf',
        ],
      },
    ],
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
