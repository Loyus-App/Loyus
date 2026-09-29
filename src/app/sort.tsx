import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SORT_MODES, type SortMode } from '@/domain/sort';
import { selectPinnedCards, selectUnpinnedCards } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { SORT_A11Y_KEY, SORT_LABEL_KEY } from '@/ui/components/home/SortBar';
import { shownCardOrder } from '@/ui/hooks/useSessionOrder';
import { ListRow, ListSection, Text } from '@/ui/primitives';

function seedManualOrder(previous: SortMode): void {
  const state = useCardStore.getState();
  if (state.manualOrderCustomized) return;
  const sorted = [...selectPinnedCards(previous)(state), ...selectUnpinnedCards(previous)(state)];
  state.setManualOrder([...shownCardOrder(), ...sorted.map((card) => card.id)], { seeded: true });
}

export default function SortSheet(): React.JSX.Element {
  const { t } = useTranslation();
  const sortMode = useSettingsStore((state) => state.sortMode);

  const choose = (mode: SortMode): void => {
    if (mode === 'manual' && sortMode !== 'manual') seedManualOrder(sortMode);
    useSettingsStore.getState().setSortMode(mode);
    router.back();
  };

  return (
    <View style={styles.sheet}>
      <Text variant="headline" accessibilityRole="header" style={styles.title}>
        {t('home.sortBy')}
      </Text>
      <ListSection>
        {SORT_MODES.map((mode) => (
          <ListRow
            key={mode}
            title={t(SORT_LABEL_KEY[mode])}
            accessibilityLabel={t(SORT_A11Y_KEY[mode])}
            accessory="check"
            selected={mode === sortMode}
            onPress={() => choose(mode)}
          />
        ))}
      </ListSection>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  sheet: {
    gap: theme.space(3),
    paddingHorizontal: theme.space(4),
    paddingTop: theme.space(6),
    paddingBottom: rt.insets.bottom + theme.space(2),
    backgroundColor: theme.colors.background,
  },
  title: {
    paddingHorizontal: theme.space(1),
  },
}));
