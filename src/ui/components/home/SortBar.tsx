import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { SortMode } from '@/domain/sort';
import { Icon, IconButton, icons, PressableScale, Text } from '../../primitives';
import { testId } from '../../testIds';

export type CardViewMode = 'grid' | 'list';

type Props = {
  readonly sortMode: SortMode;
  readonly viewMode: CardViewMode;
  readonly onViewModeChange: (mode: CardViewMode) => void;
};

export const SORT_LABEL_KEY = {
  mostUsed: 'home.sortMostUsed',
  recent: 'home.sortRecent',
  alphabetical: 'home.sortAlphabetical',
  manual: 'home.sortManual',
} as const satisfies Record<SortMode, string>;

export const SORT_A11Y_KEY = {
  ...SORT_LABEL_KEY,
  alphabetical: 'home.sortAlphabeticalLabel',
} as const satisfies Record<SortMode, string>;

function ReorderButton(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <PressableScale
      onPress={() => router.push('/reorder')}
      accessibilityRole="button"
      accessibilityLabel={t('reorder.title')}
      containerStyle={styles.shrink}
      style={styles.textButton}
    >
      <Icon name={icons.reorder} size={14} tone="accent" />
      <Text
        variant="callout"
        weight="semibold"
        tone="accent"
        numberOfLines={1}
        style={styles.shrink}
      >
        {t('home.reorder')}
      </Text>
    </PressableScale>
  );
}

export function SortBar({ sortMode, viewMode, onViewModeChange }: Props): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.bar}>
      <View style={styles.leading}>
        <PressableScale
          testID={testId('sortMenu')}
          onPress={() => router.push('/sort')}
          accessibilityRole="button"
          accessibilityLabel={`${t('home.sortBy')}: ${t(SORT_A11Y_KEY[sortMode])}`}
          containerStyle={styles.shrink}
          style={styles.textButton}
        >
          <Icon name={icons.sort} size={14} tone="accent" />
          <Text
            variant="callout"
            weight="semibold"
            tone="accent"
            numberOfLines={1}
            style={styles.shrink}
          >
            {t(SORT_LABEL_KEY[sortMode])}
          </Text>
          <Icon name={icons.chevronDown} size={12} tone="accent" />
        </PressableScale>
        {sortMode === 'manual' ? <ReorderButton /> : null}
      </View>
      <View style={styles.viewToggle} accessibilityRole="radiogroup">
        <IconButton
          variant="plain"
          icon={icons.grid}
          selected={viewMode === 'grid'}
          accessibilityLabel={t('home.viewGrid')}
          onPress={() => onViewModeChange('grid')}
        />
        <IconButton
          variant="plain"
          icon={icons.list}
          selected={viewMode === 'list'}
          accessibilityLabel={t('home.viewList')}
          onPress={() => onViewModeChange('list')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space(2),
  },
  leading: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: theme.space(1),
  },
  shrink: {
    flexShrink: 1,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(1.5),
    minHeight: theme.size.touch,
    paddingRight: theme.space(2),
  },
  viewToggle: {
    flexDirection: 'row',
    padding: theme.space(0.5),
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
  },
}));
