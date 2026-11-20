import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { photoUri } from '@/entities/card/infra/cardPhotos';
import { CARD_ASPECT_RATIO } from '@/entities/card/ui/CardTile';
import { PHOTO_SIDE_TEXT, type PhotoSide } from '@/entities/card/ui/photoSides';
import { Icon, icons, Text } from '@/shared/ui/primitives';
import { testId } from '@/shared/ui/testIds';

const Spinner = withUnistyles(ActivityIndicator, (theme) => ({ color: theme.colors.textMuted }));

export type PhotoTileProps = {
  readonly side: PhotoSide;
  readonly fileName: string | undefined;
  readonly busy: boolean;
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

export function PhotoTile({ side, fileName, busy }: PhotoTileProps): React.JSX.Element {
  const { t } = useTranslation();
  const uri = fileName ? photoUri(fileName) : null;
  styles.useVariants({ filled: uri !== null });
  return (
    <View
      style={styles.column}
      testID={testId(side === 'front' ? 'photoFrontTile' : 'photoBackTile')}
    >
      <View style={styles.tile}>
        <TileFace uri={uri} busy={busy} />
      </View>
      <Text variant="caption" tone="muted" style={styles.caption}>
        {t(PHOTO_SIDE_TEXT[side].name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
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
