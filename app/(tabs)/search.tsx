import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useDeferredValue, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import type { Card } from '../../src/domain/card';
import {
  selectFavorites,
  selectRecentCards,
  selectSearchResults,
  selectSortedCards,
} from '../../src/state/selectors/cardSelectors';
import { useCardStore } from '../../src/state/stores/cardStore';
import { useUiStore } from '../../src/state/stores/uiStore';
import { ScreenShell } from '../../src/ui/components/ScreenShell';
import { useHaptic } from '../../src/ui/hooks/useHaptic';
import { tid } from '../../src/ui/testIds';
import { StyleSheet, useUnistyles } from '../../src/ui/theme/unistyles';
import { confirmDelete, showQuickActions } from '../../src/ui/utils/quickActions';

type FilterCategory = 'all' | 'favorites' | 'recent';

const WHITESPACE_RE = /\s+/;

type CardActions = Parameters<typeof showQuickActions>[1];

function getAbbreviation(name: string): string {
  const words = name.trim().split(WHITESPACE_RE).filter(Boolean);
  if (words.length >= 2) return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase();
  return (words[0] ?? '??').slice(0, 2).toUpperCase();
}

function buildSearchCardActions(
  card: Card,
  onSelection: () => void,
  onMediumImpact: () => void,
): CardActions {
  return {
    onFavorite: () => {
      useCardStore.getState().toggleFavorite(card.id);
      onSelection();
    },
    onEdit: () => router.push(`/card/edit/${card.id}` as never),
    onDelete: () =>
      confirmDelete(card.name, () => {
        onMediumImpact();
        useCardStore.getState().removeCard(card.id);
      }),
  };
}

// --- Sub-components ---

interface SearchNoResultsProps {
  query: string;
}

function SearchNoResults({ query }: SearchNoResultsProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  return (
    <View style={styles.noResults}>
      <Ionicons name="search-outline" size={48} color={theme.colors.containerHigh} />
      <Text style={styles.noResultsTitle}>{t('search.noResultsTitle', { query })}</Text>
      <Text style={styles.noResultsSub}>{t('search.noResultsSub')}</Text>
    </View>
  );
}

type CardRenderItem = ({ item }: { item: Card }) => React.JSX.Element;

interface SearchBrowseViewProps {
  recentSearches: string[];
  onClearRecents: () => void;
  onRecentTap: (term: string) => void;
  category: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  displayedCards: Card[];
  renderCard: CardRenderItem;
}

function SearchBrowseView({
  recentSearches,
  onClearRecents,
  onRecentTap,
  category,
  onCategoryChange,
  displayedCards,
  renderCard,
}: SearchBrowseViewProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const categories: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t('search.categoryAll') },
    { key: 'favorites', label: t('search.categoryFavorites') },
    { key: 'recent', label: t('search.categoryRecent') },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{t('search.sectionRecent')}</Text>
            <Pressable onPress={onClearRecents} accessibilityLabel={t('search.clearRecents')}>
              <Text style={styles.sectionAction}>{t('search.clearRecents')}</Text>
            </Pressable>
          </View>
          <View style={styles.recentList}>
            {recentSearches.map((term) => (
              <Pressable
                key={term}
                onPress={() => onRecentTap(term)}
                style={styles.recentChip}
                accessibilityLabel={t('search.searchFor', { term })}
                accessibilityRole="button"
              >
                <Ionicons name="time-outline" size={14} color={theme.colors.textTertiary} />
                <Text style={styles.recentChipText}>{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>{t('search.sectionBrowse')}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => onCategoryChange(cat.key)}
              style={[styles.categoryPill, category === cat.key && styles.categoryPillActive]}
              accessibilityLabel={cat.label}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.categoryPillText,
                  category === cat.key && styles.categoryPillTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {displayedCards.length === 0 ? (
        <View style={styles.emptySection}>
          <Ionicons name="search-outline" size={40} color={theme.colors.containerHigh} />
          <Text style={styles.emptyText}>{t('search.noCardsInCategory')}</Text>
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.tilesGrid}>
            {displayedCards.map((card) => renderCard({ item: card }))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

interface SearchResultsViewProps {
  results: Card[];
  renderCard: CardRenderItem;
}

function SearchResultsView({ results, renderCard }: SearchResultsViewProps): React.JSX.Element {
  return (
    <FlatList
      data={results}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={styles.tilesRow}
      contentContainerStyle={styles.tilesContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

// --- Main screen ---

export default function SearchScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { selection, mediumImpact } = useHaptic();
  const { width: screenWidth } = useWindowDimensions();
  const inputRef = useRef<TextInput>(null);

  const searchQuery = useUiStore((s) => s.searchQuery);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const deferredQuery = useDeferredValue(searchQuery);

  const [category, setCategory] = useState<FilterCategory>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const allCards = useCardStore(useShallow(selectSortedCards));
  const favorites = useCardStore(useShallow(selectFavorites));
  const recentCards = useCardStore(useShallow(selectRecentCards(6)));
  const searchSelector = useMemo(() => selectSearchResults(deferredQuery), [deferredQuery]);
  const searchResults = useCardStore(useShallow(searchSelector));

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }, []),
  );

  const isSearching = deferredQuery.trim() !== '';

  const displayedCards = useMemo(() => {
    if (isSearching) return searchResults;
    if (category === 'favorites') return favorites;
    if (category === 'recent') return recentCards;
    return allCards;
  }, [isSearching, searchResults, category, favorites, recentCards, allCards]);

  const handleSubmitEditing = useCallback(() => {
    const q = searchQuery.trim();
    if (q && !recentSearches.includes(q)) {
      setRecentSearches((prev) => [q, ...prev].slice(0, 6));
    }
  }, [searchQuery, recentSearches]);

  const handleRecentTap = useCallback(
    (term: string) => {
      setSearchQuery(term);
    },
    [setSearchQuery],
  );

  const handleClearRecents = useCallback(() => setRecentSearches([]), []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    inputRef.current?.focus();
  }, [setSearchQuery]);

  const handleLongPress = useCallback(
    (card: Card) => showQuickActions(card, buildSearchCardActions(card, selection, mediumImpact)),
    [selection, mediumImpact],
  );

  const tileWidth = (screenWidth - theme.spacing.md * 2 - theme.spacing.sm * 2) / 3;

  const renderCard = useCallback(
    ({ item }: { item: Card }) => (
      <Pressable
        key={item.id}
        onPress={() => router.push(`/card/${item.id}`)}
        onLongPress={() => handleLongPress(item)}
        style={({ pressed }) => [
          styles.resultTile,
          { width: tileWidth, transform: [{ scale: pressed ? 0.96 : 1 }] },
        ]}
        accessibilityLabel={item.name}
        accessibilityRole="button"
      >
        <View
          style={[styles.resultTileCard, { backgroundColor: item.color ?? theme.colors.primary }]}
        >
          <Text style={styles.resultTileAbbr}>{getAbbreviation(item.name)}</Text>
          <Ionicons
            name="wifi-outline"
            size={12}
            color="rgba(255,255,255,0.5)"
            style={styles.resultTileIcon}
          />
        </View>
        <Text style={styles.resultTileName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.isFavorite && (
          <Ionicons
            name="star"
            size={10}
            color={theme.colors.primary}
            style={styles.resultTileStar}
          />
        )}
      </Pressable>
    ),
    [tileWidth, theme, handleLongPress],
  );

  return (
    <ScreenShell {...tid('searchScreen')}>
      {/* Search bar row */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={18}
            color={theme.colors.textTertiary}
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSubmitEditing}
            placeholder={t('search.placeholder')}
            placeholderTextColor={theme.colors.textPlaceholder}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel={t('home.searchLabel')}
            {...tid('searchInput')}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={handleClear} hitSlop={8} accessibilityLabel={t('common.cancel')}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textTertiary} />
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={() => {
            setSearchQuery('');
            router.back();
          }}
          accessibilityLabel={t('common.cancel')}
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>{t('search.cancelText')}</Text>
        </Pressable>
      </View>

      {!isSearching && (
        <SearchBrowseView
          recentSearches={recentSearches}
          onClearRecents={handleClearRecents}
          onRecentTap={handleRecentTap}
          category={category}
          onCategoryChange={setCategory}
          displayedCards={displayedCards}
          renderCard={renderCard}
        />
      )}
      {isSearching && searchResults.length === 0 && <SearchNoResults query={deferredQuery} />}
      {isSearching && searchResults.length > 0 && (
        <SearchResultsView results={searchResults} renderCard={renderCard} />
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.lg,
    height: 46,
    paddingHorizontal: theme.spacing.md,
    ...theme.subtleShadow,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    padding: 0,
  },
  cancelText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  section: {
    paddingTop: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 1.5,
  },
  sectionAction: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
  },
  recentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    ...theme.subtleShadow,
  },
  recentChipText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  categoryPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.containerLowest,
    ...theme.subtleShadow,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryPillText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  categoryPillTextActive: {
    color: theme.colors.textOnPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  tilesRow: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  tilesContent: {
    paddingTop: theme.spacing.md,
    paddingBottom: 80,
    gap: theme.spacing.sm,
  },
  resultTile: {
    alignItems: 'center',
  },
  resultTileCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    ...theme.subtleShadow,
  },
  resultTileAbbr: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  resultTileIcon: {
    position: 'absolute',
    bottom: theme.spacing.sm,
    right: theme.spacing.sm,
  },
  resultTileName: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  resultTileStar: {
    marginTop: 1,
  },
  emptySection: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  emptyText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textTertiary,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  noResultsTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    textAlign: 'center',
  },
  noResultsSub: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}));
