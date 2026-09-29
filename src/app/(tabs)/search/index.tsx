import { router, Stack } from 'expo-router';
import { useDeferredValue, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Card } from '@/domain/card';
import { selectRecentlyOpened, selectSearchResults } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { useUiStore } from '@/state/stores/uiStore';
import { CardRow } from '@/ui/components/CardRow';
import { TabScreen } from '@/ui/components/TabScreen';
import { EmptyState, icons, ListSection } from '@/ui/primitives';
import { testId } from '@/ui/testIds';
import { showCardActions } from '@/ui/utils/cardActions';

const selectRecent = selectRecentlyOpened(6);

export default function SearchScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const query = useUiStore((state) => state.searchQuery);
  const setSearchQuery = useUiStore((state) => state.setSearchQuery);
  const deferredQuery = useDeferredValue(query.trim());

  useEffect(() => () => setSearchQuery(''), [setSearchQuery]);

  return (
    <TabScreen title={t('search.title')} pinnedTitle testID={testId('searchScreen')}>
      <Stack.SearchBar
        placeholder={t('search.placeholder')}
        autoCapitalize="none"
        autoFocus
        hideWhenScrolling={false}
        // iOS 27 keeps the field in the header; without this it slides over the pinned title while searching.
        hideNavigationBar={false}
        onChangeText={(event) => setSearchQuery(event.nativeEvent.text)}
        onCancelButtonPress={() => setSearchQuery('')}
      />
      {deferredQuery ? <SearchResults query={deferredQuery} /> : <RecentCards />}
    </TabScreen>
  );
}

function RecentCards(): React.JSX.Element {
  const { t } = useTranslation();
  const cards = useCardStore(useShallow(selectRecent));

  if (cards.length === 0) {
    return (
      <EmptyState icon={icons.search} title={t('search.emptyTitle')} body={t('search.emptyBody')} />
    );
  }

  return (
    <ListSection title={t('search.recent')}>
      {cards.map((card) => (
        <CardResultRow key={card.id} card={card} />
      ))}
    </ListSection>
  );
}

function SearchResults({ query }: { readonly query: string }): React.JSX.Element {
  const { t } = useTranslation();
  const results = useCardStore(useShallow(selectSearchResults(query)));

  if (results.length === 0) {
    return (
      <EmptyState
        icon={icons.search}
        title={t('search.noResultsTitle', { query })}
        body={t('search.noResultsBody')}
      />
    );
  }

  return (
    <ListSection>
      {results.map((card) => (
        <CardResultRow key={card.id} card={card} />
      ))}
    </ListSection>
  );
}

function CardResultRow({ card }: { readonly card: Card }): React.JSX.Element {
  return (
    <CardRow
      card={card}
      onPress={() => router.push(`/card/${card.id}`)}
      onLongPress={() => showCardActions(card)}
      testID={testId('searchResult')}
    />
  );
}
