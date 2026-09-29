import { View } from 'react-native';
import {
  NestedReorderableList,
  type ReorderableListCellAnimations,
} from 'react-native-reorderable-list';
import { StyleSheet } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';
import type { Card } from '@/domain/card';
import { useReduceMotion } from '../../hooks/useReduceMotion';
import { Text } from '../../primitives';
import { timing } from '../../theme/motion';
import { haptics } from '../../utils/haptics';
import { ReorderRow } from './ReorderRow';

type Props = {
  readonly title: string;
  readonly cards: readonly Card[];
  readonly onMove: (from: number, to: number) => void;
};

const LIFT: ReorderableListCellAnimations = { opacity: 1 };
const STILL: ReorderableListCellAnimations = { opacity: 1, transform: [] };

function onDropped(): void {
  'worklet';
  scheduleOnRN(haptics.light);
}

function keyOf(card: Card): string {
  return card.id;
}

export function ReorderSection({ title, cards, onMove }: Props): React.JSX.Element {
  const reduceMotion = useReduceMotion();
  return (
    <View style={styles.section}>
      <Text variant="label" tone="muted" style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.group}>
        <NestedReorderableList
          data={[...cards]}
          keyExtractor={keyOf}
          renderItem={({ item, index }) => (
            <ReorderRow card={item} index={index} count={cards.length} onMove={onMove} />
          )}
          onReorder={({ from, to }) => onMove(from, to)}
          onDragEnd={onDropped}
          cellAnimations={reduceMotion ? STILL : LIFT}
          animationDuration={timing.fast.duration}
          initialNumToRender={cards.length}
          shouldUpdateActiveItem
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  section: {
    gap: theme.space(2),
  },
  title: {
    paddingHorizontal: theme.space(4),
  },
  group: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
}));
