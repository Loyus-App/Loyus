import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { type Card, FORMAT_LABEL } from '@/domain/card';
import type { CardViewMode } from '@/state/stores/settingsStore';
import { ListSection, Text } from '../../primitives';
import { testId } from '../../testIds';
import { breakpoints } from '../../theme/breakpoints';
import { transitions } from '../../theme/motion';
import { cardAccessibilityActions } from '../../utils/cardActions';
import { CardLink } from '../CardLink';
import { CardRow } from '../CardRow';
import { CardTile } from '../CardTile';
import { useSectionTitles } from './sectionTitles';

type Props = {
  readonly pinned: readonly Card[];
  readonly others: readonly Card[];
  readonly viewMode: CardViewMode;
};

type SectionProps = {
  readonly title: string;
  readonly cards: readonly Card[];
  readonly firstIndex: number;
  readonly animateEntry: boolean;
  readonly testID?: string | undefined;
};

const LAYOUT = transitions.layout();
const FILLER_KEYS = ['filler-1', 'filler-2', 'filler-3'] as const;

function useIsFirstMount(): boolean {
  const [isFirstMount, setIsFirstMount] = useState(true);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsFirstMount(false));
    return () => cancelAnimationFrame(frame);
  }, []);
  return isFirstMount;
}

function useGridColumns(): number {
  const { width } = useWindowDimensions();
  if (width >= breakpoints.lg) return 4;
  if (width >= breakpoints.md) return 3;
  return 2;
}

function useContentWidth(): number {
  const { width } = useWindowDimensions();
  const { theme } = useUnistyles();
  return width - theme.space(4) * 2;
}

function useCellWidth(columns: number): number {
  const { theme } = useUnistyles();
  return (useContentWidth() - theme.space(3) * (columns - 1)) / columns;
}

function enteringFor(animateEntry: boolean, index: number) {
  return animateEntry ? transitions.enterItem(index) : transitions.crossfadeIn();
}

function HomeTile({
  card,
  width,
}: {
  readonly card: Card;
  readonly width: number;
}): React.JSX.Element {
  const { t } = useTranslation();
  const format = FORMAT_LABEL[card.format];
  const label = card.owner
    ? t('home.tileLabelOwner', { name: card.name, owner: card.owner, format })
    : t('home.tileLabel', { name: card.name, format });
  return (
    <CardLink card={card} width={width}>
      {({ onPress, onLongPress }) => (
        <CardTile
          card={card}
          onPress={onPress}
          onLongPress={onLongPress}
          accessibilityLabel={label}
          accessibilityHint={t('home.tileHint')}
          {...cardAccessibilityActions(card)}
          testID={testId('cardGridTile')}
        />
      )}
    </CardLink>
  );
}

function GridSection({
  title,
  cards,
  firstIndex,
  animateEntry,
  testID,
}: SectionProps): React.JSX.Element {
  const columns = useGridColumns();
  const cellWidth = useCellWidth(columns);
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
            <HomeTile card={card} width={cellWidth} />
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
  testID,
}: SectionProps): React.JSX.Element {
  const rowWidth = useContentWidth();
  return (
    <ListSection title={title} testID={testID}>
      {cards.map((card, index) => (
        <Animated.View
          key={card.id}
          entering={enteringFor(animateEntry, firstIndex + index)}
          layout={LAYOUT}
        >
          <CardLink card={card} width={rowWidth}>
            {(handlers) => <CardRow card={card} {...handlers} testID={testId('cardListItem')} />}
          </CardLink>
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

export function CardSections({ pinned, others, viewMode }: Props): React.JSX.Element {
  const animateEntry = useIsFirstMount();
  const hasPinned = pinned.length > 0;
  const shared = { viewMode, animateEntry };
  const titles = useSectionTitles(hasPinned, others.length);

  return (
    <>
      {hasPinned ? (
        <CardSection
          key="pinned"
          title={titles.pinned}
          cards={pinned}
          firstIndex={0}
          testID={testId('pinnedSection')}
          {...shared}
        />
      ) : null}
      {others.length > 0 ? (
        <CardSection
          key="others"
          title={titles.others}
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
