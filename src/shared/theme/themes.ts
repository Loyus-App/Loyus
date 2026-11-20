import { skyEdgeGradient, skyGradient } from './color';
import { palette, radius, size, space, typography } from './tokens';

export type AppTheme = {
  readonly colors: {
    readonly background: string;
    readonly surface: string;
    readonly surfaceMuted: string;
    readonly surfaceRaised: string;
    readonly shadow: string;
    readonly scrim: string;
    readonly border: string;
    readonly text: string;
    readonly textMuted: string;
    readonly accent: string;
    readonly onAccent: string;
    readonly danger: string;
    readonly onDanger: string;
    readonly warning: string;
    readonly inverse: string;
    readonly onInverse: string;
  };
  readonly gradients: {
    readonly sky: string;
    readonly skyEdge: string;
  };
  readonly barcode: {
    readonly paper: string;
    readonly ink: string;
    readonly inkMuted: string;
  };
  readonly brandPlate: {
    readonly light: string;
    readonly dark: string;
  };
  readonly scanner: {
    readonly background: string;
    readonly text: string;
    readonly textMuted: string;
    readonly control: string;
    readonly frame: string;
  };
  readonly badge: {
    readonly style: 'solid' | 'tinted';
    readonly accent: string;
    readonly blue: string;
    readonly indigo: string;
    readonly orange: string;
    readonly red: string;
    readonly green: string;
    readonly gray: string;
    readonly glyph: string;
  };
  readonly radius: typeof radius;
  readonly size: typeof size;
  readonly typography: typeof typography;
  readonly space: typeof space;
};

const shared = {
  barcode: {
    paper: palette.white,
    ink: palette.black,
    inkMuted: palette.slate600,
  },
  brandPlate: {
    light: palette.white,
    dark: palette.ink900,
  },
  scanner: {
    background: palette.black,
    text: palette.white,
    textMuted: 'rgba(255, 255, 255, 0.72)',
    control: 'rgba(0, 0, 0, 0.55)',
    frame: palette.white,
  },
  radius,
  size,
  typography,
  space,
} as const;

export const lightTheme = {
  colors: {
    background: palette.gray50,
    surface: palette.white,
    surfaceMuted: palette.gray100,
    surfaceRaised: palette.white,
    shadow: 'rgba(17, 20, 24, 0.08)',
    scrim: 'rgba(17, 20, 24, 0.32)',
    border: palette.gray200,
    text: palette.ink900,
    textMuted: palette.slate600,
    accent: palette.teal700,
    onAccent: palette.white,
    danger: palette.red600,
    onDanger: palette.white,
    warning: palette.amber600,
    inverse: palette.ink900,
    onInverse: palette.white,
  },
  gradients: {
    sky: skyGradient(palette.gray50, palette.teal300, 'light'),
    skyEdge: skyEdgeGradient(palette.gray50, palette.teal300, 'light'),
  },
  badge: {
    style: 'solid',
    accent: palette.teal700,
    blue: palette.blue500,
    indigo: palette.indigo500,
    orange: palette.orange500,
    red: palette.red500,
    green: palette.green600,
    gray: palette.slate400,
    glyph: palette.white,
  },
  ...shared,
} as const satisfies AppTheme;

export const darkTheme = {
  colors: {
    background: palette.night950,
    surface: palette.night900,
    surfaceMuted: palette.night800,
    surfaceRaised: palette.night600,
    shadow: 'rgba(0, 0, 0, 0.4)',
    scrim: 'rgba(0, 0, 0, 0.56)',
    border: palette.night700,
    text: palette.fog100,
    textMuted: palette.fog300,
    accent: palette.teal300,
    onAccent: palette.teal950,
    danger: palette.red400,
    onDanger: palette.night950,
    warning: palette.amber400,
    inverse: palette.fog100,
    onInverse: palette.night950,
  },
  gradients: {
    sky: skyGradient(palette.night950, palette.teal300, 'dark'),
    skyEdge: skyEdgeGradient(palette.night950, palette.teal300, 'dark'),
  },
  badge: {
    style: 'tinted',
    accent: palette.teal300,
    blue: palette.blue400,
    indigo: palette.indigo400,
    orange: palette.orange400,
    red: palette.red400,
    green: palette.green400,
    gray: palette.fog300,
    glyph: palette.white,
  },
  ...shared,
} as const satisfies AppTheme;
