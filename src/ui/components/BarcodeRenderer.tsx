import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import type { SymbolLayout } from '@/domain/barcodeLayout';
import { tid } from '../testIds';
import type { EncodedSymbol } from './barcodeSymbol';

type Props = {
  readonly symbol: EncodedSymbol;
  readonly layout: SymbolLayout;
  readonly accessibilityLabel?: string | undefined;
};

const Ink = withUnistyles(Path, (theme) => ({ fill: theme.barcode.ink }));

export function BarcodeRenderer({ symbol, layout, accessibilityLabel }: Props): React.JSX.Element {
  return (
    <View
      style={styles.wrapper}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      {...tid('barcodeDisplay')}
    >
      <Svg
        width={layout.width}
        height={layout.height}
        viewBox={`0 0 ${symbol.modules} ${symbol.rows}`}
        preserveAspectRatio="none"
      >
        <Ink d={symbol.path} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
