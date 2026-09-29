import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Keyboard, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import type { CardPhotos } from '@/domain/card';
import { photoUri } from '@/infra/persistence/cardPhotos';
import type { SheetAction } from '@/state/stores/uiStore';
import { PHOTO_SIDE_TEXT, PHOTO_SIDES, type PhotoSide } from '@/ui/constants/photoSides';
import { Icon, icons, PressableScale, Text } from '@/ui/primitives';
import { testId } from '@/ui/testIds';
import { showActionSheet } from '@/ui/utils/actionSheet';
import { haptics } from '@/ui/utils/haptics';
import { choosePhoto, showPhotoFailed, takePhoto } from '@/ui/utils/photoPicker';
import { CARD_ASPECT_RATIO } from '../CardTile';

const Spinner = withUnistyles(ActivityIndicator, (theme) => ({ color: theme.colors.textMuted }));

type Props = {
  readonly photos: CardPhotos;
  readonly onAdd: (side: PhotoSide, sourceUri: string) => Promise<void>;
  readonly onRemove: (side: PhotoSide) => void;
};

type TileProps = {
  readonly side: PhotoSide;
  readonly fileName: string | undefined;
  readonly busy: boolean;
  readonly onPress: () => void;
};

function TileFace({
  uri,
  busy,
}: {
  readonly uri: string | null;
  readonly busy: boolean;
}): React.JSX.Element {
  const { t } = useTranslation();
  if (busy) return <Spinner size="small" />;
  if (uri) return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
  return (
    <>
      <Icon name={icons.camera} size={22} tone="muted" />
      <Text variant="caption" tone="muted" weight="semibold">
        {t('photos.add')}
      </Text>
    </>
  );
}

function PhotoTile({ side, fileName, busy, onPress }: TileProps): React.JSX.Element {
  const { t } = useTranslation();
  const uri = fileName ? photoUri(fileName) : null;
  styles.useVariants({ filled: uri !== null });
  return (
    <PressableScale
      testID={testId(side === 'front' ? 'photoFrontTile' : 'photoBackTile')}
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      accessibilityLabel={t(PHOTO_SIDE_TEXT[side].label)}
      accessibilityHint={t(uri ? 'photos.changeHint' : 'photos.addHint')}
      accessibilityState={{ busy, disabled: busy }}
      containerStyle={styles.slot}
      style={styles.column}
    >
      <View style={styles.tile}>
        <TileFace uri={uri} busy={busy} />
      </View>
      <Text variant="caption" tone="muted" style={styles.caption}>
        {t(PHOTO_SIDE_TEXT[side].name)}
      </Text>
    </PressableScale>
  );
}

export function PhotoSection({ photos, onAdd, onRemove }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const [busySide, setBusySide] = useState<PhotoSide | null>(null);

  const add = (side: PhotoSide, source: () => Promise<string | null>) => {
    source()
      .then(async (uri) => {
        if (!uri) return;
        setBusySide(side);
        await onAdd(side, uri);
        haptics.light();
      })
      .catch(showPhotoFailed)
      .finally(() => setBusySide(null));
  };

  const open = (side: PhotoSide) => {
    Keyboard.dismiss();
    const actions: SheetAction[] = [
      { label: t('photos.take'), run: () => add(side, takePhoto) },
      { label: t('photos.choose'), run: () => add(side, choosePhoto) },
    ];
    if (photos[side]) {
      actions.push({ label: t('photos.remove'), destructive: true, run: () => onRemove(side) });
    }
    showActionSheet(t(PHOTO_SIDE_TEXT[side].label), actions);
  };

  return (
    <View style={styles.section}>
      <Text variant="caption" tone="muted" weight="semibold" style={styles.inset}>
        {t('form.photos')}
      </Text>
      <View style={styles.row}>
        {PHOTO_SIDES.map((side) => (
          <PhotoTile
            key={side}
            side={side}
            fileName={photos[side]}
            busy={busySide === side}
            onPress={() => open(side)}
          />
        ))}
      </View>
      <Text variant="caption" tone="muted" style={styles.inset}>
        {t('form.photosFooter')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  section: {
    gap: theme.space(1.5),
  },
  inset: {
    paddingHorizontal: theme.space(1),
  },
  row: {
    flexDirection: 'row',
    gap: theme.space(3),
  },
  slot: {
    flex: 1,
  },
  column: {
    gap: theme.space(1.5),
  },
  tile: {
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    minHeight: theme.size.touch,
    borderRadius: theme.radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(1),
    variants: {
      filled: {
        true: {
          backgroundColor: theme.colors.surfaceMuted,
        },
        false: {
          backgroundColor: theme.colors.surface,
          borderWidth: 1.5,
          borderStyle: 'dashed',
          borderColor: theme.colors.border,
        },
      },
    },
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    textAlign: 'center',
  },
}));
