import { router } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { SortMode } from '@/domain/sort';
import type { CardViewMode } from '@/state/stores/settingsStore';
import { ReorderButton } from './ReorderButton';
import { SortPill } from './SortPill';
import { ViewModeToggle } from './ViewModeToggle';

type Props = {
  readonly sortMode: SortMode;
  readonly viewMode: CardViewMode;
  readonly onViewModeChange: (mode: CardViewMode) => void;
};

export function SortBar({ sortMode, viewMode, onViewModeChange }: Props): React.JSX.Element {
  return (
    <View style={styles.bar}>
      <View style={styles.leading}>
        <SortPill sortMode={sortMode} onPress={() => router.push('/sort')} />
        {sortMode === 'manual' ? <ReorderButton /> : null}
      </View>
      <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
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
}));
