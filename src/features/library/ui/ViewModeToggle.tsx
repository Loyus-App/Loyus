import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { CardViewMode } from '@/entities/settings/state/settingsStore';
import { IconButton, icons } from '@/shared/ui/primitives';

type Props = {
  readonly viewMode: CardViewMode;
  readonly onChange: (mode: CardViewMode) => void;
};

export function ViewModeToggle({ viewMode, onChange }: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.toggle} accessibilityRole="radiogroup">
      <IconButton
        variant="plain"
        icon={icons.grid}
        selected={viewMode === 'grid'}
        accessibilityLabel={t('home.viewGrid')}
        onPress={() => onChange('grid')}
      />
      <IconButton
        variant="plain"
        icon={icons.list}
        selected={viewMode === 'list'}
        accessibilityLabel={t('home.viewList')}
        onPress={() => onChange('list')}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  toggle: {
    flexDirection: 'row',
    padding: theme.space(0.5),
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
  },
}));
