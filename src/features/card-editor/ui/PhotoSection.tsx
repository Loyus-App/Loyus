import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { CardPhotos } from '@/entities/card/domain/card';
import { PHOTO_SIDES, type PhotoSide } from '@/entities/card/ui/photoSides';
import { haptics } from '@/shared/platform/haptics';
import { choosePhoto, showPhotoFailed, takePhoto } from '@/shared/platform/photoPicker';
import { icons, Text } from '@/shared/ui/primitives';
import { type PhotoAction, PhotoSlot } from './PhotoSlot';

type Props = {
  readonly photos: CardPhotos;
  readonly onAdd: (side: PhotoSide, sourceUri: string) => Promise<void>;
  readonly onRemove: (side: PhotoSide) => void;
};

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

  const actionsFor = (side: PhotoSide): PhotoAction[] => [
    { label: t('photos.take'), icon: icons.camera, run: () => add(side, takePhoto) },
    { label: t('photos.choose'), icon: icons.photo, run: () => add(side, choosePhoto) },
    ...(photos[side]
      ? [
          {
            label: t('photos.remove'),
            icon: icons.trash,
            destructive: true,
            run: () => onRemove(side),
          },
        ]
      : []),
  ];

  return (
    <View style={styles.section}>
      <Text variant="caption" tone="muted" weight="semibold" style={styles.inset}>
        {t('form.photos')}
      </Text>
      <View style={styles.row}>
        {PHOTO_SIDES.map((side) => (
          <PhotoSlot
            key={side}
            side={side}
            fileName={photos[side]}
            busy={busySide === side}
            actions={actionsFor(side)}
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
}));
