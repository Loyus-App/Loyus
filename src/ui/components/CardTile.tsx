import { type AccessibilityActionEvent, type AccessibilityActionInfo, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { cardInitials } from '@/domain/card';
import { GradientLayer } from '../primitives/GradientLayer';
import { PressableScale } from '../primitives/PressableScale';
import { Text } from '../primitives/Text';
import { cardColorOf, textOnCard } from '../theme/cardColors';
import { subtleGradient, withAlpha } from '../theme/color';
import { BrandPlate, brandLogo } from './BrandMark';

export const CARD_ASPECT_RATIO = 1.586;

type TileCard = {
  readonly name: string;
  readonly color?: string | undefined;
  readonly brandId?: string | undefined;
  readonly owner?: string | undefined;
  readonly isPlaceholder?: boolean | undefined;
};

type Props = {
  readonly card: TileCard;
  readonly onPress?: () => void;
  readonly onLongPress?: () => void;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly accessibilityActions?: AccessibilityActionInfo[] | undefined;
  readonly onAccessibilityAction?: ((event: AccessibilityActionEvent) => void) | undefined;
  readonly testID?: string | undefined;
};

function TileMark({
  card,
  ink,
}: {
  readonly card: TileCard;
  readonly ink: string;
}): React.JSX.Element {
  const art = brandLogo(card.brandId);
  if (art) return <BrandPlate art={art} />;
  if (card.isPlaceholder) return <View />;
  return (
    <Text variant="headline" weight="bold" style={styles.ink(ink)} maxFontSizeMultiplier={1.2}>
      {cardInitials(card.name)}
    </Text>
  );
}

function TileFace({ card }: { readonly card: TileCard }): React.JSX.Element {
  const fill = cardColorOf(card);
  const ink = textOnCard(fill);
  return (
    <View style={styles.tile(fill)}>
      <GradientLayer image={subtleGradient(fill)} />
      <View style={styles.top}>
        <TileMark card={card} ink={ink} />
        {card.owner ? (
          <View style={styles.owner(ink)}>
            <Text
              variant="caption"
              weight="semibold"
              numberOfLines={1}
              style={styles.ink(ink)}
              maxFontSizeMultiplier={1.2}
            >
              {card.owner}
            </Text>
          </View>
        ) : null}
      </View>
      <Text
        variant="callout"
        weight="semibold"
        numberOfLines={2}
        style={[styles.ink(ink), card.isPlaceholder && styles.placeholder]}
        maxFontSizeMultiplier={1.3}
      >
        {card.name}
      </Text>
    </View>
  );
}

export function CardTile({
  card,
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityActions,
  onAccessibilityAction,
  testID,
}: Props): React.JSX.Element {
  if (!(onPress || onLongPress)) {
    return (
      <View testID={testID} accessible accessibilityLabel={accessibilityLabel ?? card.name}>
        <TileFace card={card} />
      </View>
    );
  }
  return (
    <PressableScale
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={350}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? card.name}
      accessibilityHint={accessibilityHint}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
    >
      <TileFace card={card} />
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  tile: (fill: string) => ({
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    padding: theme.space(3),
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: fill,
    boxShadow: `0 2px 8px ${theme.colors.shadow}`,
  }),
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.space(2),
  },
  owner: (ink: string) => ({
    flexShrink: 1,
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(0.5),
    borderRadius: theme.radius.pill,
    backgroundColor: withAlpha(ink === '#FFFFFF' ? '#000000' : '#FFFFFF', 0.22),
  }),
  ink: (ink: string) => ({
    color: ink,
  }),
  placeholder: {
    opacity: 0.6,
  },
}));
