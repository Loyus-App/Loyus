import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PHOTO_SIDE_TEXT } from '@/entities/card/ui/photoSides';
import { showActionSheet } from '@/shared/ui/actionSheet';
import type { IconName } from '@/shared/ui/primitives';
import { PressableScale } from '@/shared/ui/primitives';
import type { SheetAction } from '@/shared/ui/uiStore';
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
