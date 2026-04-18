import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import type { Card } from '../../domain/card';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

const WHITESPACE_RE = /\s+/;

interface CardGridTileProps {
  card: Card;
  onPress: () => void;
  onLongPress?: () => void;
}

/** Derive a short 3-letter abbreviation from a card name */
function getAbbreviation(name: string): string {
  const words = name.trim().split(WHITESPACE_RE).filter(Boolean);
  if (words.length >= 3) {
    return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '') + (words[2]?.[0] ?? '')).toUpperCase();
  }
  if (words.length === 2) {
    const w0 = (words[0] ?? '').slice(0, 2);
    const w1 = (words[1] ?? '').slice(0, 1);
    return (w0 + w1).toUpperCase();
  }
  return (words[0] ?? '???').slice(0, 3).toUpperCase();
}

export function CardGridTile({ card, onPress, onLongPress }: CardGridTileProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const { width: screenWidth } = useWindowDimensions();
  const tileWidth = (screenWidth - theme.spacing.md * 2 - theme.spacing.sm) / 2;
  const abbr = getAbbreviation(card.name);

  return (
    <View style={{ width: tileWidth }}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.tile,
          {
            backgroundColor: card.color ?? theme.colors.primary,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
        accessibilityLabel={card.name}
        accessibilityRole="button"
        {...tid('cardGridTile')}
      >
        <Text style={styles.abbr}>{abbr}</Text>
        <View style={styles.tileBottom}>
          <Ionicons name="wifi-outline" size={16} color="rgba(255,255,255,0.6)" />
        </View>
      </Pressable>
      <Text style={styles.name} numberOfLines={1}>
        {card.name}
      </Text>
    </View>
  );
}

/** @deprecated No longer rendered inline; FAB button used instead */
interface AddCardTileProps {
  onPress: () => void;
}

export function AddCardTile({ onPress }: AddCardTileProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { width: screenWidth } = useWindowDimensions();
  const tileWidth = (screenWidth - theme.spacing.md * 2 - theme.spacing.sm) / 2;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.addTile,
        {
          width: tileWidth,
          backgroundColor: theme.colors.containerLow,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      accessibilityLabel={t('home.addCardLabel')}
      accessibilityRole="button"
      {...tid('addCardTile')}
    >
      <View style={[styles.addIconRing, { borderColor: theme.colors.primary }]}>
        <Ionicons name="add" size={28} color={theme.colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  tile: {
    aspectRatio: 4 / 3,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.sm + 4,
    ...theme.cardShadow,
  },
  abbr: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xs,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1,
  },
  tileBottom: {
    position: 'absolute',
    bottom: theme.spacing.sm + 4,
    right: theme.spacing.sm + 4,
  },
  name: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    marginTop: 6,
    paddingHorizontal: 2,
  },
  addTile: {
    aspectRatio: 4 / 3,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
