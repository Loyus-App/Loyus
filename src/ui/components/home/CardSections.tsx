import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { type Card, FORMAT_LABEL } from '@/domain/card';
import { ListSection, Text } from '../../primitives';
import { testId } from '../../testIds';
import { breakpoints } from '../../theme/breakpoints';
import { transitions } from '../../theme/motion';
import { cardAccessibilityActions } from '../../utils/cardActions';
import { CardRow } from '../CardRow';
import { CardTile } from '../CardTile';
import type { CardViewMode } from './SortBar';

type CardHandlers = {
  readonly onOpen: (card: Card) => void;
  readonly onActions: (card: Card) => void;
};

type Props = CardHandlers & {
  readonly pinned: readonly Card[];
  readonly others: readonly Card[];
  readonly viewMode: CardViewMode;
};

type SectionProps = CardHandlers & {
  readonly title: string;
  readonly cards: readonly Card[];
  readonly firstIndex: number;
  readonly animateEntry: boolean;
  readonly testID?: string | undefined;
};

const LAYOUT = transitions.layout();
const FILLER_KEYS = ['filler-1', 'filler-2', 'filler-3'] as const;

function useIsFirstMount(): boolean {
  const isFirstMount = useRef(true);
  useEffect(() => {
    isFirstMount.current = false;
  }, []);
  return isFirstMount.current;
}

function useGridColumns(): number {
  const { width } = useWindowDimensions();
  if (width >= breakpoints.lg) return 4;
  if (width >= breakpoints.md) return 3;
  return 2;
}

function enteringFor(animateEntry: boolean, index: number) {
  return animateEntry ? transitions.enterItem(index) : transitions.crossfadeIn();
}

function HomeTile({
  card,
  onOpen,
  onActions,
}: CardHandlers & { readonly card: Card }): React.JSX.Element {
  const { t } = useTranslation();
  const format = FORMAT_LABEL[card.format];
  const label = card.owner
    ? t('home.tileLabelOwner', { name: card.name, owner: card.owner, format })
    : t('home.tileLabel', { name: card.name, format });
  return (
    <CardTile
      card={card}
      onPress={() => onOpen(card)}
      onLongPress={() => onActions(card)}
      accessibilityLabel={label}
      accessibilityHint={t('home.tileHint')}
      {...cardAccessibilityActions(card)}
      testID={testId('cardGridTile')}
    />
  );
}

function GridSection({
  title,
  cards,
  firstIndex,
  animateEntry,
  onOpen,
  onActions,
  testID,
}: SectionProps): React.JSX.Element {
  const columns = useGridColumns();
  const fillers = FILLER_KEYS.slice(0, (columns - (cards.length % columns)) % columns);
  return (
    <View style={styles.section} testID={testID}>
      <Text variant="label" tone="muted" style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Animated.View
            key={card.id}
            style={styles.cell(columns)}
            entering={enteringFor(animateEntry, firstIndex + index)}
            layout={LAYOUT}
          >
            <HomeTile card={card} onOpen={onOpen} onActions={onActions} />
          </Animated.View>
        ))}
        {fillers.map((key) => (
          <View key={key} style={styles.cell(columns)} />
        ))}
      </View>
    </View>
  );
}

function ListModeSection({
  title,
  cards,
  firstIndex,
  animateEntry,
  onOpen,
  onActions,
  testID,
}: SectionProps): React.JSX.Element {
  return (
    <ListSection title={title} testID={testID}>
      {cards.map((card, index) => (
        <Animated.View
          key={card.id}
          entering={enteringFor(animateEntry, firstIndex + index)}
          layout={LAYOUT}
        >
          <CardRow
            card={card}
            onPress={() => onOpen(card)}
            onLongPress={() => onActions(card)}
            testID={testId('cardListItem')}
          />
        </Animated.View>
      ))}
    </ListSection>
  );
}

function CardSection({
  viewMode,
  ...props
}: SectionProps & { readonly viewMode: CardViewMode }): React.JSX.Element {
  return (
    <Animated.View
      {...(props.animateEntry ? {} : { entering: transitions.crossfadeIn() })}
      layout={LAYOUT}
    >
      {viewMode === 'grid' ? <GridSection {...props} /> : <ListModeSection {...props} />}
    </Animated.View>
  );
}

export function CardSections({
  pinned,
  others,
  viewMode,
  onOpen,
  onActions,
}: Props): React.JSX.Element {
  const { t } = useTranslation();
  const animateEntry = useIsFirstMount();
  const hasPinned = pinned.length > 0;
  const shared = { viewMode, animateEntry, onOpen, onActions };
  const othersTitle = hasPinned
    ? t('home.sectionOthers', { count: others.length })
    : t('home.sectionAll', { count: others.length });

  return (
    <>
      {hasPinned ? (
        <CardSection
          key="pinned"
          title={t('home.sectionPinned')}
          cards={pinned}
          firstIndex={0}
          testID={testId('pinnedSection')}
          {...shared}
        />
      ) : null}
      {others.length > 0 ? (
        <CardSection
          key="others"
          title={othersTitle}
          cards={others}
          firstIndex={pinned.length}
          {...shared}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  section: {
    gap: theme.space(2),
  },
  title: {
    paddingHorizontal: theme.space(4),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space(3),
  },
  cell: (columns: number) => ({
    flexGrow: 1,
    flexBasis: `${Math.floor(100 / (columns + 1)) + 1}%`,
  }),
}));
