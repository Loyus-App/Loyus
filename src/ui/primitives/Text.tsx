import { Text as NativeText, type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type TextVariant =
  | 'display'
  | 'title'
  | 'headline'
  | 'body'
  | 'callout'
  | 'caption'
  | 'label'
  | 'code';
export type TextTone =
  | 'primary'
  | 'muted'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'onAccent'
  | 'onDanger'
  | 'onInverse';

type Props = TextProps & {
  readonly variant?: TextVariant;
  readonly tone?: TextTone;
  readonly weight?: 'regular' | 'semibold' | 'bold';
  readonly tabular?: boolean;
};

export function Text({
  variant = 'body',
  tone = 'primary',
  weight,
  tabular = false,
  style,
  ...rest
}: Props): React.JSX.Element {
  styles.useVariants({ variant, tone, tabular, weight });
  return <NativeText {...rest} style={[styles.text, style]} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      variant: {
        display: theme.typography.display,
        title: theme.typography.title,
        headline: theme.typography.headline,
        body: theme.typography.body,
        callout: theme.typography.callout,
        caption: theme.typography.caption,
        label: { ...theme.typography.label, textTransform: 'uppercase' },
        code: theme.typography.code,
      },
      tone: {
        primary: { color: theme.colors.text },
        muted: { color: theme.colors.textMuted },
        accent: { color: theme.colors.accent },
        danger: { color: theme.colors.danger },
        warning: { color: theme.colors.warning },
        onAccent: { color: theme.colors.onAccent },
        onDanger: { color: theme.colors.onDanger },
        onInverse: { color: theme.colors.onInverse },
      },
      weight: {
        regular: { fontWeight: '400' },
        semibold: { fontWeight: '600' },
        bold: { fontWeight: '700' },
      },
      tabular: {
        true: { fontVariant: ['tabular-nums'] },
        false: {},
      },
    },
  },
}));
