import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { SheetAction } from '@/state/stores/uiStore';
import { PHOTO_SIDE_TEXT } from '@/ui/constants/photoSides';
import type { IconName } from '@/ui/primitives';
import { PressableScale } from '@/ui/primitives';
import { showActionSheet } from '@/ui/utils/actionSheet';
import { PhotoTile, type PhotoTileProps } from './PhotoTile';

export type PhotoAction = SheetAction & { readonly icon: IconName };

type Props = PhotoTileProps & {
  readonly actions: readonly PhotoAction[];
};

export function PhotoSlot({ actions, ...tile }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const title = t(PHOTO_SIDE_TEXT[tile.side].label);
  return (
    <PressableScale
      onPress={() => {
        Keyboard.dismiss();
        showActionSheet(title, actions);
      }}
      disabled={tile.busy}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={t(tile.fileName ? 'photos.changeHint' : 'photos.addHint')}
      accessibilityState={{ busy: tile.busy, disabled: tile.busy }}
      containerStyle={styles.slot}
    >
      <PhotoTile {...tile} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
  },
});
