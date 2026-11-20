import Constants from 'expo-constants';

export const APP_INFO = {
  name: Constants.expoConfig?.name ?? '',
  version: Constants.expoConfig?.version ?? '',
} as const;
