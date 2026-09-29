import { type AndroidSymbol, type SFSymbol, SymbolView } from 'expo-symbols';
import { useUnistyles } from 'react-native-unistyles';
import type { TextTone } from './Text';

export type IconName = { readonly ios: SFSymbol; readonly android: AndroidSymbol };

type Props = {
  readonly name: IconName;
  readonly size?: number;
  readonly tone?: TextTone;
  readonly color?: string;
};

const TONE_COLOR = {
  primary: 'text',
  muted: 'textMuted',
  accent: 'accent',
  danger: 'danger',
  warning: 'warning',
  onAccent: 'onAccent',
  onDanger: 'onDanger',
  onInverse: 'onInverse',
} as const;

export function Icon({ name, size = 20, tone = 'primary', color }: Props): React.JSX.Element {
  const { theme } = useUnistyles();
  return (
    <SymbolView
      name={name}
      size={size}
      tintColor={color ?? theme.colors[TONE_COLOR[tone]]}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
