import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SORT_MODES, type SortMode } from '@/entities/card/domain/sort';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { SORT_A11Y_KEY, SORT_LABEL_KEY } from '@/features/library/ui/sortLabels';
import { chooseSortMode } from '@/features/library/ui/sortMode';
import { ListRow, ListSection, Text } from '@/shared/ui/primitives';
import { sheetBottomInset } from '@/shared/ui/stackOptions';

export default function SortSheet(): React.JSX.Element {
  const { t } = useTranslation();
  const sortMode = useSettingsStore((state) => state.sortMode);

  const choose = (mode: SortMode): void => {
    chooseSortMode(mode);
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
    paddingBottom: sheetBottomInset(rt.insets.bottom) + theme.space(2),
  },
  title: {
    paddingHorizontal: theme.space(1),
  },
}));
