import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, type ImageLoadEvent, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { Card, CardId, CardPhotos } from '@/domain/card';
import { photoUri } from '@/infra/photos/cardPhotos';
import { selectCardById } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { CARD_ASPECT_RATIO } from '@/ui/components/CardTile';
import { useToolbarIcon } from '@/ui/hooks/useToolbarIcon';
import { modalOptions } from '@/ui/navigation/stackOptions';
import { EmptyState, icons, Text } from '@/ui/primitives';

type Side = keyof CardPhotos;

const SIDES: readonly Side[] = ['front', 'back'];

const SIDE_TEXT = {
  front: { name: 'photos.front', label: 'photos.frontLabel' },
  back: { name: 'photos.back', label: 'photos.backLabel' },
} as const satisfies Record<Side, { name: string; label: string }>;

function close(): void {
  router.back();
}

function CloseToolbar(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const closeIcon = useToolbarIcon(icons.close, theme.colors.text);
  return (
    <Stack.Toolbar placement="left">
      <Stack.Toolbar.Button
        {...(closeIcon ? { icon: closeIcon } : {})}
        accessibilityLabel={t('photos.close')}
        onPress={close}
      />
    </Stack.Toolbar>
  );
}

function Photo({
  side,
  fileName,
}: {
  readonly side: Side;
  readonly fileName: string;
}): React.JSX.Element {
  const { t } = useTranslation();
  const [ratio, setRatio] = useState(CARD_ASPECT_RATIO);
  const [failed, setFailed] = useState(false);
  const uri = photoUri(fileName);

  const onLoad = (event: ImageLoadEvent) => {
    const { width, height } = event.nativeEvent.source;
    if (width > 0 && height > 0) setRatio(width / height);
  };

  return (
    <View style={styles.block}>
      <Text variant="label" tone="muted" style={styles.label} accessibilityRole="header">
        {t(SIDE_TEXT[side].name)}
      </Text>
      {uri && !failed ? (
        <Image
          source={{ uri }}
          style={styles.image(ratio)}
          resizeMode="contain"
          accessible
          accessibilityRole="image"
          accessibilityLabel={t(SIDE_TEXT[side].label)}
          onLoad={onLoad}
          onError={() => setFailed(true)}
        />
      ) : (
        <View style={styles.missing}>
          <Text variant="callout" tone="muted" style={styles.missingText}>
            {t('photos.missing')}
          </Text>
        </View>
      )}
    </View>
  );
}

function Photos({ card }: { readonly card: Card }): React.JSX.Element {
  const { t } = useTranslation();
  const shown = SIDES.flatMap((side) => {
    const fileName = card.photos?.[side];
    return fileName ? [{ side, fileName }] : [];
  });

  if (shown.length === 0) {
    return (
      <View style={styles.center}>
        <EmptyState
          icon={icons.photo}
          title={t('photos.emptyTitle')}
          body={t('photos.emptyBody')}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {shown.map(({ side, fileName }) => (
        <Photo key={side} side={side} fileName={fileName} />
      ))}
    </ScrollView>
  );
}

export default function CardPhotosScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = useCardStore(selectCardById(id as CardId));

  return (
    <>
      <Stack.Screen options={{ ...modalOptions, title: card?.name ?? t('photos.title') }} />
      <CloseToolbar />
      {card ? (
        <Photos card={card} />
      ) : (
        <View style={styles.center}>
          <EmptyState
            icon={icons.cards}
            title={t('checkout.notFoundTitle')}
            body={t('checkout.notFoundBody')}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.space(6),
    padding: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(6),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  block: {
    gap: theme.space(2),
  },
  label: {
    paddingHorizontal: theme.space(1),
  },
  image: (ratio: number) => ({
    width: '100%',
    aspectRatio: ratio,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.surfaceMuted,
  }),
  missing: {
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space(4),
    borderRadius: theme.radius.card,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.surface,
  },
  missingText: {
    textAlign: 'center',
  },
}));
