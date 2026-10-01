import { Stack } from 'expo-router';
import { useDeferredValue, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';
import type { Card } from '@/domain/card';
import { selectRecentlyOpened, selectSearchResults } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { CardLink } from '@/ui/components/CardLink';
import { CardRow } from '@/ui/components/CardRow';
import { TabScreen } from '@/ui/components/TabScreen';
import { EmptyState, icons, ListSection } from '@/ui/primitives';
import { testId } from '@/ui/testIds';

const selectRecent = selectRecentlyOpened(6);

export default function SearchScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim());

  return (
    <TabScreen title={t('search.title')} pinnedTitle testID={testId('searchScreen')}>
      <Stack.SearchBar
        placeholder={t('search.placeholder')}
        autoCapitalize="none"
        autoFocus
        hideWhenScrolling={false}
        hideNavigationBar={false}
        onChangeText={(event) => setQuery(event.nativeEvent.text)}
        onCancelButtonPress={() => setQuery('')}
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
  const { width } = useWindowDimensions();
  const { theme } = useUnistyles();
  return (
    <CardLink card={card} width={width - theme.space(4) * 2}>
      {(handlers) => <CardRow card={card} {...handlers} testID={testId('searchResult')} />}
    </CardLink>
  );
}
