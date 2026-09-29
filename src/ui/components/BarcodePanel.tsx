import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { layoutSymbol, type SymbolLayout } from '@/domain/barcodeLayout';
import { type BarcodeFormat, FORMAT_LABEL, formatCodeForDisplay } from '@/domain/card';
import { Text } from '../primitives/Text';
import { tid } from '../testIds';
import { transitions } from '../theme/motion';
import { BarcodeErrorBoundary } from './BarcodeErrorBoundary';
import { BarcodeRenderer } from './BarcodeRenderer';
import { type EncodedSymbol, encodeSymbol } from './barcodeSymbol';
import { TextFallback } from './TextFallback';

export type PanelArea = {
  readonly width: number;
  readonly height: number;
};

type PanelCard = {
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
};

export type PanelBarcode = {
  readonly symbol: EncodedSymbol;
  readonly layout: SymbolLayout;
  readonly length: number;
};

type Props = {
  readonly card: PanelCard;
  readonly rotated: boolean;
  readonly area: PanelArea;
  readonly barcode: PanelBarcode | null;
};

const MAX_ROTATED_LENGTH = 580;
const DIGITS_MAX_SCALE = 1.4;
const FORMAT_MAX_SCALE = 1.3;

export function useBarcodeLayout(
  card: PanelCard,
  rotated: boolean,
  area: PanelArea | null,
): PanelBarcode | null {
  const { theme, rt } = useUnistyles();
  const symbol = useMemo(() => encodeSymbol(card.code, card.format), [card.code, card.format]);
  if (!(symbol && area)) return null;

  const length = rotated ? Math.min(area.height, MAX_ROTATED_LENGTH) : area.width;
  const depth = rotated ? area.width : area.height;
  const margin = theme.space(6);
  const digits =
    theme.typography.code.lineHeight * DIGITS_MAX_SCALE +
    theme.space(0.5) +
    theme.typography.caption.lineHeight * FORMAT_MAX_SCALE;
  const across =
    symbol.kind === 'matrix'
      ? depth - digits - margin
      : depth - 2 * margin - theme.space(3) - digits;
  const layout = layoutSymbol(
    { kind: symbol.kind, format: card.format, modules: symbol.modules },
    { along: length, across, margin, pixelRatio: rt.pixelRatio },
  );
  return { symbol, layout, length };
}

function Digits({ code, format }: Omit<PanelCard, 'name'>): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.labels}>
      <Text
        variant="code"
        selectable
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        maxFontSizeMultiplier={DIGITS_MAX_SCALE}
        style={styles.digits}
        accessibilityLabel={t('checkout.numberLabel', { code })}
        {...tid('cardNumber')}
      >
        {formatCodeForDisplay(code, format)}
      </Text>
      <Text
        variant="caption"
        numberOfLines={1}
        maxFontSizeMultiplier={FORMAT_MAX_SCALE}
        style={styles.format}
      >
        {FORMAT_LABEL[format]}
      </Text>
    </View>
  );
}

export function BarcodePanel({ card, rotated, area, barcode }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const length = barcode?.length ?? area.width;
  const quietSide = barcode?.symbol.kind === 'matrix' ? barcode.layout.quietZone : 0;

  return (
    <Animated.View
      key={rotated ? 'rotated' : 'upright'}
      entering={transitions.crossfadeIn()}
      style={rotated ? styles.frame(area.width, length) : styles.uprightFrame}
    >
      <View
        style={[styles.panel(quietSide), rotated && styles.rotatedPanel(length, area.width)]}
        {...tid('barcodeCard')}
      >
        {barcode ? (
          <>
            <BarcodeErrorBoundary key={`${card.format}:${card.code}`}>
              <BarcodeRenderer
                symbol={barcode.symbol}
                layout={barcode.layout}
                accessibilityLabel={t('checkout.barcodeLabel', { name: card.name })}
              />
            </BarcodeErrorBoundary>
            <Digits code={card.code} format={card.format} />
          </>
        ) : (
          <TextFallback code={card.code} format={card.format} />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  uprightFrame: {
    alignSelf: 'stretch',
  },
  frame: (width: number, height: number) => ({
    width,
    height,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  panel: (quietSide: number) => ({
    alignItems: 'center',
    justifyContent: 'center',
    gap: Math.max(theme.space(3), quietSide),
    paddingHorizontal: theme.space(6),
    paddingTop: Math.max(theme.space(6), quietSide),
    paddingBottom: theme.space(6),
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    backgroundColor: theme.barcode.paper,
    boxShadow: `0 2px 12px ${theme.colors.shadow}`,
  }),
  rotatedPanel: (length: number, depth: number) => ({
    width: length,
    height: depth,
    transform: [{ rotate: '90deg' }],
  }),
  labels: {
    alignSelf: 'stretch',
    gap: theme.space(0.5),
  },
  digits: {
    color: theme.barcode.ink,
    textAlign: 'center',
  },
  format: {
    color: theme.barcode.inkMuted,
    textAlign: 'center',
  },
}));
