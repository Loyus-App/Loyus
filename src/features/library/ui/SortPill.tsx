import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { SortMode } from '@/entities/card/domain/sort';
import { Icon, icons, PressableScale, Text } from '@/shared/ui/primitives';
import { testId } from '@/shared/ui/testIds';
import { SORT_A11Y_KEY, SORT_LABEL_KEY } from './sortLabels';

type Props = {
  readonly sortMode: SortMode;
  readonly onPress?: (() => void) | undefined;
};

function PillContent({ sortMode }: { readonly sortMode: SortMode }): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <Icon name={icons.sort} size={14} tone="accent" />
      <Text
        variant="callout"
        weight="semibold"
        tone="accent"
        numberOfLines={1}
        style={styles.label}
      >
        {t(SORT_LABEL_KEY[sortMode])}
      </Text>
      <Icon name={icons.chevronDown} size={12} tone="accent" />
    </>
  );
}

export function useSortLabel(sortMode: SortMode): string {
  const { t } = useTranslation();
  return `${t('home.sortBy')}: ${t(SORT_A11Y_KEY[sortMode])}`;
}

export function SortPill({ sortMode, onPress }: Props): React.JSX.Element {
  const label = useSortLabel(sortMode);
  if (!onPress) {
    return (
      <View style={styles.pill} testID={testId('sortMenu')} accessible accessibilityLabel={label}>
        <PillContent sortMode={sortMode} />
      </View>
    );
  }
  return (
    <PressableScale
      testID={testId('sortMenu')}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      containerStyle={styles.shrink}
      style={styles.pill}
    >
      <PillContent sortMode={sortMode} />
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(1.5),
    minHeight: theme.size.touch,
    paddingRight: theme.space(2),
  },
  shrink: {
    flexShrink: 1,
  },
  label: {
    flexShrink: 1,
  },
}));
