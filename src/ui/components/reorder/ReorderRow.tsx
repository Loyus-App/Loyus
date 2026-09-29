import { useTranslation } from 'react-i18next';
import {
  type AccessibilityActionEvent,
  type AccessibilityActionInfo,
  AccessibilityInfo,
  Pressable,
  View,
} from 'react-native';
import { useIsActive, useReorderableDrag } from 'react-native-reorderable-list';
import { StyleSheet } from 'react-native-unistyles';
import { type Card, cardSubtitle } from '@/domain/card';
import { Icon, icons, Text } from '../../primitives';
import { haptics } from '../../utils/haptics';
import { CardThumb } from '../CardThumb';

type Props = {
  readonly card: Card;
  readonly index: number;
  readonly count: number;
  readonly onMove: (from: number, to: number) => void;
};

const HOLD_ROW_MS = 300;
const HOLD_HANDLE_MS = 120;

function useMoveActions(
  index: number,
  count: number,
  onMove: Props['onMove'],
): {
  accessibilityActions: AccessibilityActionInfo[];
  onAccessibilityAction: (event: AccessibilityActionEvent) => void;
} {
  const { t } = useTranslation();
  const accessibilityActions = [
    ...(index > 0 ? [{ name: 'moveUp', label: t('reorder.moveUp') }] : []),
    ...(index < count - 1 ? [{ name: 'moveDown', label: t('reorder.moveDown') }] : []),
  ];
  const onAccessibilityAction = (event: AccessibilityActionEvent): void => {
    const to = event.nativeEvent.actionName === 'moveUp' ? index - 1 : index + 1;
    if (to < 0 || to >= count) return;
    onMove(index, to);
    AccessibilityInfo.announceForAccessibility(t('reorder.position', { position: to + 1, count }));
  };
  return { accessibilityActions, onAccessibilityAction };
}

export function ReorderRow({ card, index, count, onMove }: Props): React.JSX.Element {
  const drag = useReorderableDrag();
  const isActive = useIsActive();
  const moveActions = useMoveActions(index, count, onMove);
  const subtitle = cardSubtitle(card);
  styles.useVariants({ active: isActive });

  const startDrag = (): void => {
    haptics.selection();
    drag();
  };

  return (
    <Pressable
      onLongPress={startDrag}
      delayLongPress={HOLD_ROW_MS}
      accessibilityLabel={`${card.name}, ${subtitle}`}
      {...moveActions}
      style={styles.row}
    >
      {index > 0 && !isActive ? <View style={styles.separator} /> : null}
      <CardThumb card={card} />
      <View style={styles.texts}>
        <Text numberOfLines={2}>{card.name}</Text>
        <Text variant="caption" tone="muted" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Pressable
        onLongPress={startDrag}
        delayLongPress={HOLD_HANDLE_MS}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        style={styles.handle}
      >
        <Icon name={icons.reorder} size={20} tone="muted" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    minHeight: theme.size.touch,
    paddingLeft: theme.space(4),
    paddingRight: theme.space(1),
    paddingVertical: theme.space(2),
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    variants: {
      active: {
        true: {
          backgroundColor: theme.colors.surfaceRaised,
          boxShadow: `0 6px 20px ${theme.colors.shadow}`,
        },
        false: {},
      },
    },
  },
  separator: {
    position: 'absolute',
    top: 0,
    left: theme.space(4),
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },
  texts: {
    flex: 1,
    gap: theme.space(0.5),
  },
  handle: {
    width: theme.size.touch,
    height: theme.size.touch,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
