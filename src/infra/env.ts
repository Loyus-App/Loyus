export const isE2E = process.env.EXPO_PUBLIC_E2E === 'true';

export const e2eTheme = process.env.EXPO_PUBLIC_E2E_THEME as 'light' | 'dark' | undefined;
