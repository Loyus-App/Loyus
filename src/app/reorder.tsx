import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { reorderItems, ScrollViewContainer } from 'react-native-reorderable-list';
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';
import type { Card } from '@/domain/card';
import { selectPinnedCards, selectUnpinnedCards } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { ReorderSection } from '@/ui/components/reorder/ReorderSection';
import { Text } from '@/ui/primitives';

const Scroll = withUnistyles(ScrollViewContainer);

function saveOrder(pinned: Card[], others: Card[]): void {
  useCardStore.getState().setManualOrder([...pinned, ...others].map((card) => card.id));
}

export default function ReorderScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const pinned = useCardStore(useShallow(selectPinnedCards('manual')));
  const others = useCardStore(useShallow(selectUnpinnedCards('manual')));
  const hasPinned = pinned.length > 0;

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          variant="done"
          tintColor={theme.colors.accent}
          onPress={() => router.back()}
        >
          {t('common.done')}
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <Scroll
        style={styles.screen}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text tone="muted" style={styles.hint}>
          {t('reorder.hint')}
        </Text>
        {hasPinned ? (
          <ReorderSection
            title={t('home.sectionPinned')}
            cards={pinned}
            onMove={(from, to) => saveOrder(reorderItems(pinned, from, to), others)}
          />
        ) : null}
        {others.length > 0 ? (
          <ReorderSection
            title={
              hasPinned
                ? t('home.sectionOthers', { count: others.length })
                : t('home.sectionAll', { count: others.length })
            }
            cards={others}
            onMove={(from, to) => saveOrder(pinned, reorderItems(others, from, to))}
          />
        ) : null}
      </Scroll>
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.space(6),
    paddingHorizontal: theme.space(4),
    paddingTop: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(6),
  },
  hint: {
    paddingHorizontal: theme.space(4),
  },
}));
