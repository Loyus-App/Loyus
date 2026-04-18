import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import type { Card } from '../../domain/card';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';
import { ColorChip } from './ColorChip';
import { FavoriteToggle } from './FavoriteToggle';
import { FORMAT_DISPLAY_NAME, FormatBadge } from './FormatBadge';

interface CardListItemProps {
  card: Card;
  onPress: () => void;
  onToggleFavorite: () => void;
  onLongPress?: () => void;
}

export function CardListItem({
  card,
  onPress,
  onToggleFavorite,
  onLongPress,
}: CardListItemProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const displayFormat = FORMAT_DISPLAY_NAME[card.format];

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: theme.colors.containerHigh },
      ]}
      accessibilityLabel={`${card.name}, ${displayFormat}${card.isFavorite ? ', favorite' : ''}`}
      accessibilityRole="button"
      {...tid('cardListItem')}
    >
      <ColorChip
        color={card.color ?? theme.colors.primary}
        label={card.color ? t('form.cardColor') : t('form.defaultColor')}
      />
      <View style={styles.center}>
        <Text style={styles.name} numberOfLines={1}>
          {card.name}
        </Text>
        <FormatBadge format={card.format} />
      </View>
      <FavoriteToggle isFavorite={card.isFavorite} onToggle={onToggleFavorite} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    ...theme.subtleShadow,
  },
  center: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  name: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
}));
