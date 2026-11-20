import { Button, Host, Menu, RNHostView } from '@expo/ui/swift-ui';
import { accessibilityLabel, disabled } from '@expo/ui/swift-ui/modifiers';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { PHOTO_SIDE_TEXT } from '@/entities/card/ui/photoSides';
import type { IconName } from '@/shared/ui/primitives';
import type { SheetAction } from '@/shared/ui/uiStore';
import { PhotoTile, type PhotoTileProps } from './PhotoTile';

export type PhotoAction = SheetAction & { readonly icon: IconName };

type Props = PhotoTileProps & {
  readonly actions: readonly PhotoAction[];
};

function useTileWidth(): number {
  const { width } = useWindowDimensions();
  const { theme } = useUnistyles();
  return (width - theme.space(4) * 2 - theme.space(3)) / 2;
}

export function PhotoSlot({ actions, ...tile }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const width = useTileWidth();

  return (
    <Host matchContents>
      <Menu
        label={
          <RNHostView matchContents>
            <View style={styles.slot(width)}>
              <PhotoTile {...tile} />
            </View>
          </RNHostView>
        }
        modifiers={[accessibilityLabel(t(PHOTO_SIDE_TEXT[tile.side].label)), disabled(tile.busy)]}
      >
        {actions.map((action) => (
          <Button
            key={action.label}
            label={action.label}
            systemImage={action.icon.ios}
            role={action.destructive ? 'destructive' : 'default'}
            onPress={action.run}
          />
        ))}
      </Menu>
    </Host>
  );
}

const styles = StyleSheet.create({
  slot: (width: number) => ({
    width,
  }),
});
