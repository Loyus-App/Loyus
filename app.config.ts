import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Loyus',
  slug: 'loyus',
  version: '0.1.0',
  scheme: 'loyus',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    checkAutomatically: 'NEVER' as const,
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.loyus.app',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      // A transitive dependency references CoreLocation APIs but Loyus never invokes them.
      // Apple requires a purpose string whenever an API is referenced, even if unused.
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
  // FOUND-09: Android Data Safety declaration is a Play Console form (Phase 6).
  // Declaration: "No data collected, no data shared."
  // Enforced by architecture: no analytics SDKs, no network on critical path.
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.loyus.app',
  },
  plugins: [
    'expo-router',
    [
      'react-native-vision-camera',
      {
        cameraPermissionText:
          'Loyus needs camera access to scan loyalty card barcodes.',
        enableCodeScanner: true,
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 29,
          compileSdkVersion: 36,
          targetSdkVersion: 35,
        },
      },
    ],
    'react-native-edge-to-edge',
    // PERS-04: iOS MMKV in Documents/mmkv/ — backup-eligible by default, no config needed
    // PERS-05: Android MMKV backup rules (API 29-30 + API 31+)
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
