import { useWindowDimensions, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { Card } from '@/domain/card';
import { Text } from '../primitives';
import { BarcodePanel, type PanelArea, useBarcodeLayout } from './BarcodePanel';
import { CardThumb } from './CardThumb';

const MAX_WIDTH = 420;
const SIDE_MARGIN = 32;
const PANEL_RATIO = 0.72;
const HEADER_HEIGHT = 56;
const THUMB_WIDTH = 40;

export function usePeekWidth(): number {
  const { width } = useWindowDimensions();
  return Math.min(width - SIDE_MARGIN, MAX_WIDTH);
}

export function CardPeek({ card }: { readonly card: Card }): React.JSX.Element {
  const width = usePeekWidth();
  const area: PanelArea = { width, height: Math.round(width * PANEL_RATIO) };
  const barcode = useBarcodeLayout(card, false, area);

  return (
    <View style={styles.peek}>
      <View style={styles.header}>
        <CardThumb card={card} width={THUMB_WIDTH} />
        <Text variant="body" weight="semibold" numberOfLines={1} style={styles.name}>
          {card.name}
        </Text>
      </View>
      <BarcodePanel card={card} rotated={false} area={area} barcode={barcode} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  peek: {
    backgroundColor: theme.colors.background,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    paddingHorizontal: theme.space(4),
  },
  name: {
    flex: 1,
  },
}));
