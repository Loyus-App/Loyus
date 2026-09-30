import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';
import { BarcodeFormat, type Card } from '@/domain/card';
import { isE2E } from '@/infra/env';
import { selectPinnedCards, selectUnpinnedCards } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { CardSections } from '@/ui/components/home/CardSections';
import { SortBar } from '@/ui/components/home/SortBar';
import { TabScreen } from '@/ui/components/TabScreen';
import { WelcomeState } from '@/ui/components/WelcomeState';
import { useRememberShownOrder, useSessionOrder } from '@/ui/hooks/useSessionOrder';
import { IconButton, icons } from '@/ui/primitives';
import { testId } from '@/ui/testIds';
import { restoreBackup } from '@/ui/utils/backup';
import { showCardActions } from '@/ui/utils/cardActions';

const E2E_SEED_LABEL = 'E2E add test card';

function openScanner(): void {
  router.push('/card/scan');
}

function openManualEntry(): void {
  router.push('/card/add');
}

function openCard(card: Card): void {
  router.push(`/card/${card.id}`);
}

function addTestCard(): void {
  useCardStore
    .getState()
    .addCard({ name: 'TestCard', code: '1234567890', format: BarcodeFormat.CODE128 });
}

export default function HomeScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const sortMode = useSettingsStore((state) => state.sortMode);
  const viewMode = useSettingsStore((state) => state.cardViewMode);
  const setCardViewMode = useSettingsStore((state) => state.setCardViewMode);
  const pinned = useSessionOrder(useCardStore(useShallow(selectPinnedCards(sortMode))), sortMode);
  const others = useSessionOrder(useCardStore(useShallow(selectUnpinnedCards(sortMode))), sortMode);
  useRememberShownOrder([...pinned, ...others]);
  const hasCards = pinned.length + others.length > 0;

  return (
    <View style={styles.root}>
      <TabScreen
        title={t('home.title')}
        testID={testId('homeScreen')}
        action={
          <IconButton
            icon={icons.add}
            variant="glass"
            accessibilityLabel={t('home.addCard')}
            onPress={openScanner}
            testID={testId('addCardButton')}
          />
        }
      >
        {hasCards ? (
          <>
            <SortBar sortMode={sortMode} viewMode={viewMode} onViewModeChange={setCardViewMode} />
            <CardSections
              pinned={pinned}
              others={others}
              viewMode={viewMode}
              onOpen={openCard}
              onActions={showCardActions}
            />
          </>
        ) : (
          <WelcomeState onScan={openScanner} onManual={openManualEntry} onRestore={restoreBackup} />
        )}
      </TabScreen>
      {isE2E ? (
        <Pressable
          testID="e2e-add-test-card"
          accessibilityLabel={E2E_SEED_LABEL}
          onPress={addTestCard}
          style={styles.e2eSeed}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  e2eSeed: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: theme.space(11),
    height: theme.space(11),
  },
}));
