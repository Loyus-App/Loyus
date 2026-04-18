/** Master E2E toggle -- true only in E2E dev-client builds */
export const isE2E = process.env.EXPO_PUBLIC_E2E === 'true';

/** Force color scheme in E2E: 'light' | 'dark' | undefined */
export const e2eTheme = process.env.EXPO_PUBLIC_E2E_THEME as 'light' | 'dark' | undefined;

/** Force offline NetInfo in E2E */
export const e2eOffline = process.env.EXPO_PUBLIC_E2E_OFFLINE === 'true';
