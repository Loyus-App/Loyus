export const isE2E = process.env.EXPO_PUBLIC_E2E === 'true';

export const e2eTheme = process.env.EXPO_PUBLIC_E2E_THEME as 'light' | 'dark' | undefined;

export const e2eOffline = process.env.EXPO_PUBLIC_E2E_OFFLINE === 'true';
