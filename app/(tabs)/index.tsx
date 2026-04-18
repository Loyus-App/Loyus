import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import type { Card, CardId } from '../../src/domain/card';
import { BarcodeFormat } from '../../src/domain/card';
import { isE2E } from '../../src/infra/env';
import { selectFavorites, selectSortedCards } from '../../src/state/selectors/cardSelectors';
import { useCardStore } from '../../src/state/stores/cardStore';
import { useSettingsStore } from '../../src/state/stores/settingsStore';
import { CardGridTile } from '../../src/ui/components/CardGridTile';
import { CardListItem } from '../../src/ui/components/CardListItem';
import { EmptyState } from '../../src/ui/components/EmptyState';
import { ScreenShell } from '../../src/ui/components/ScreenShell';
import { useHaptic } from '../../src/ui/hooks/useHaptic';
import { tid } from '../../src/ui/testIds';
import { StyleSheet, useUnistyles } from '../../src/ui/theme/unistyles';
import { confirmDelete, showQuickActions } from '../../src/ui/utils/quickActions';

type CardActions = Parameters<typeof showQuickActions>[1];

function buildCardActions(
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

interface ViewModeToggleProps {
  cardViewMode: 'list' | 'grid';
  onSetList: () => void;
  onSetGrid: () => void;
}

function ViewModeToggle({
  cardViewMode,
  onSetList,
  onSetGrid,
}: ViewModeToggleProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  return (
    <View style={styles.viewToggle}>
      <Pressable
        onPress={onSetList}
        accessibilityLabel={t('home.switchList')}
        accessibilityRole="button"
        style={[styles.toggleBtn, cardViewMode === 'list' && styles.toggleBtnActive]}
        {...tid('viewModeToggle')}
      >
        <Ionicons
          name="list-outline"
          size={18}
          color={cardViewMode === 'list' ? theme.colors.primary : theme.colors.textTertiary}
        />
      </Pressable>
      <Pressable
        onPress={onSetGrid}
        accessibilityLabel={t('home.switchGrid')}
        accessibilityRole="button"
        style={[styles.toggleBtn, cardViewMode === 'grid' && styles.toggleBtnActive]}
      >
        <Ionicons
          name="grid-outline"
          size={18}
          color={cardViewMode === 'grid' ? theme.colors.primary : theme.colors.textTertiary}
        />
      </Pressable>
    </View>
  );
}

interface FavoriteCardItemProps {
  card: Card;
  width: number;
  onPress: () => void;
  onLongPress: () => void;
}

function FavoriteCardItem({
  card,
  width,
  onPress,
  onLongPress,
}: FavoriteCardItemProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.favoriteCard,
        { width, transform: [{ scale: pressed ? 0.97 : 1 }] },
      ]}
      accessibilityLabel={card.name}
      accessibilityRole="button"
    >
      <View
        style={[styles.favoriteIconBox, { backgroundColor: card.color ?? theme.colors.primary }]}
      >
        <Ionicons name="storefront-outline" size={18} color="#fff" />
      </View>
      <Text style={styles.favoriteName} numberOfLines={1}>
        {card.name}
      </Text>
      <Text style={styles.favoriteLevel} numberOfLines={1}>
        {card.isFavorite ? t('home.cardLevelGold') : t('home.cardLevelMember')}
      </Text>
      <View style={styles.favoriteFooter}>
        <Ionicons name="barcode-outline" size={14} color={theme.colors.textTertiary} />
        <View style={styles.favoriteDash} />
      </View>
    </Pressable>
  );
}

export default function CardsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { selection, mediumImpact } = useHaptic();
  const { width: screenWidth } = useWindowDimensions();
  const allCards = useCardStore(useShallow(selectSortedCards));
  const favorites = useCardStore(useShallow(selectFavorites));
  const cardViewMode = useSettingsStore((s) => s.cardViewMode);
  const setCardViewMode = useSettingsStore((s) => s.setCardViewMode);

  const handleToggleFavorite = useCallback(
    (id: string) => {
      useCardStore.getState().toggleFavorite(id as CardId);
      selection();
    },
    [selection],
  );

  const handleLongPress = useCallback(
    (card: Card) => {
      showQuickActions(card, buildCardActions(card, selection, mediumImpact));
    },
    [selection, mediumImpact],
  );

  const navigateToCard = useCallback((id: string) => {
    router.push(`/card/${id}`);
  }, []);

  const navigateToAdd = useCallback(() => {
    router.push('/card/add');
  }, []);

  const hasCards = allCards.length > 0;

  const filteredCards = allCards;

  // Favorite card width: 2 columns with gap
  const favCardWidth = (screenWidth - theme.spacing.md * 2 - theme.spacing.sm) / 2;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenShell {...tid('homeScreen')}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} {...tid('homeTitle')}>
            {t('home.title')}
          </Text>
        </View>

        {hasCards ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Search trigger — tapping navigates to Search tab */}
            <Pressable
              onPress={() => router.navigate('/(tabs)/search')}
              style={styles.searchTrigger}
              accessibilityLabel={t('home.searchLabel')}
              accessibilityRole="search"
            >
              <Ionicons name="search-outline" size={18} color={theme.colors.textTertiary} />
              <Text style={styles.searchPlaceholder}>{t('home.searchPlaceholder')}</Text>
            </Pressable>

            {/* Favorites Section — only shown when not all cards are favorites */}
            {favorites.length > 0 && favorites.length < allCards.length && (
              <View {...tid('favoritesSection')}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{t('home.sectionFavorites')}</Text>
                  <Pressable
                    accessibilityLabel={t('home.viewAllFavorites')}
                    accessibilityRole="button"
                  >
                    <Text style={styles.viewAll}>{t('common.viewAll')}</Text>
                  </Pressable>
                </View>
                <View style={styles.favoritesRow}>
                  {favorites.slice(0, 4).map((card) => (
                    <FavoriteCardItem
                      key={card.id}
                      card={card}
                      width={favCardWidth}
                      onPress={() => navigateToCard(card.id)}
                      onLongPress={() => handleLongPress(card)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* All Cards Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.sectionAllCards')}</Text>
              <ViewModeToggle
                cardViewMode={cardViewMode}
                onSetList={() => setCardViewMode('list')}
                onSetGrid={() => setCardViewMode('grid')}
              />
            </View>

            {cardViewMode === 'grid' ? (
              <View style={styles.grid}>
                {filteredCards.map((card) => (
                  <CardGridTile
                    key={card.id}
                    card={card}
                    onPress={() => navigateToCard(card.id)}
                    onLongPress={() => handleLongPress(card)}
                  />
                ))}
              </View>
            ) : (
              <View>
                {filteredCards.map((card) => (
                  <CardListItem
                    key={card.id}
                    card={card}
                    onPress={() => navigateToCard(card.id)}
                    onToggleFavorite={() => handleToggleFavorite(card.id)}
                    onLongPress={() => handleLongPress(card)}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <EmptyState onAddCard={navigateToAdd} />
        )}

        {/* Floating Add Button */}
        {hasCards && (
          <Pressable
            onPress={navigateToAdd}
            style={({ pressed }) => [styles.fab, { transform: [{ scale: pressed ? 0.93 : 1 }] }]}
            accessibilityLabel={t('home.addCardLabel')}
            accessibilityRole="button"
            {...tid('addCardButton')}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </Pressable>
        )}

        {/* E2E-only: seed button to add a test card without form input */}
        {isE2E && (
          <Pressable
            onPress={() => {
              const store = useCardStore.getState();
              store.addCard({
                name: 'TestCard',
                code: '1234567890',
                format: BarcodeFormat.CODE128,
              });
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: 44, height: 44, opacity: 0 }}
            testID="e2e-add-test-card"
            accessibilityLabel="E2E add test card"
          />
        )}
      </ScreenShell>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.extraBold,
    fontSize: 22,
    color: theme.colors.text,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
    letterSpacing: 1.5,
  },
  viewAll: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 4,
  },
  toggleBtn: {
    padding: 6,
    borderRadius: theme.radius.sm,
  },
  toggleBtnActive: {
    backgroundColor: theme.colors.containerLow,
  },
  favoritesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  favoriteCard: {
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    ...theme.subtleShadow,
  },
  favoriteIconBox: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  favoriteName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginBottom: 2,
  },
  favoriteLevel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  favoriteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  favoriteDash: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
    opacity: 0.4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  searchTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.subtleShadow,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPlaceholder,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md + 4,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
}));
