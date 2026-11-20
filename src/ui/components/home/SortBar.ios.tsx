import { Host, Menu, Picker, RNHostView, Text } from '@expo/ui/swift-ui';
import { accessibilityLabel, pickerStyle, tag } from '@expo/ui/swift-ui/modifiers';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SORT_MODES, type SortMode } from '@/domain/sort';
import type { CardViewMode } from '@/state/stores/settingsStore';
import { chooseSortMode } from '../../utils/sortMode';
import { ReorderButton } from './ReorderButton';
import { SORT_LABEL_KEY } from './sortLabels';
import { SortPill, useSortLabel } from './SortPill';
import { ViewModeToggle } from './ViewModeToggle';

type Props = {
  readonly sortMode: SortMode;
  readonly viewMode: CardViewMode;
  readonly onViewModeChange: (mode: CardViewMode) => void;
};

export function SortBar({ sortMode, viewMode, onViewModeChange }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const label = useSortLabel(sortMode);

  return (
    <View style={styles.bar}>
      <View style={styles.leading}>
        <Host matchContents>
          <Menu
            label={
              <RNHostView matchContents>
                <SortPill sortMode={sortMode} />
              </RNHostView>
            }
            modifiers={[accessibilityLabel(label)]}
          >
            <Picker<SortMode>
              label={t('home.sortBy')}
              selection={sortMode}
              onSelectionChange={chooseSortMode}
              modifiers={[pickerStyle('inline')]}
            >
              {SORT_MODES.map((mode) => (
                <Text key={mode} modifiers={[tag(mode)]}>
                  {t(SORT_LABEL_KEY[mode])}
                </Text>
              ))}
            </Picker>
          </Menu>
        </Host>
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
