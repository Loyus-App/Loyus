import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BrandFill, brandLogo } from '@/entities/brand/ui/BrandMark';
import { subtleGradient } from '@/shared/theme/color';
import { GradientLayer } from '@/shared/ui/primitives/GradientLayer';
import { Text } from '@/shared/ui/primitives/Text';
import { cardInitials } from '../domain/card';
import { cardColorOf, textOnCard } from './cardColors';
import { CARD_ASPECT_RATIO } from './CardTile';

type Props = {
  readonly card: {
    readonly name: string;
    readonly color?: string | undefined;
    readonly brandId?: string | undefined;
  };
  readonly width?: number;
};

export function CardThumb({ card, width = 48 }: Props): React.JSX.Element {
  const art = brandLogo(card.brandId);
  if (art) {
    return <BrandFill art={art} width={width} height={Math.round(width / CARD_ASPECT_RATIO)} />;
  }
  const fill = cardColorOf(card);
  return (
    <View style={styles.thumb(fill, width)}>
      <GradientLayer image={subtleGradient(fill)} />
      <Text
        variant="label"
        weight="bold"
        style={styles.ink(textOnCard(fill))}
        maxFontSizeMultiplier={1}
      >
        {cardInitials(card.name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  thumb: (fill: string, width: number) => ({
    width,
    height: Math.round(width / CARD_ASPECT_RATIO),
    borderRadius: theme.radius.thumb,
    borderCurve: 'continuous',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fill,
  }),
  ink: (ink: string) => ({
    color: ink,
  }),
}));
