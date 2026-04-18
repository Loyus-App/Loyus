import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { tid } from '../testIds';
import { useUnistyles } from '../theme/unistyles';

interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteToggle({ isFavorite, onToggle }: FavoriteToggleProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      accessibilityLabel={isFavorite ? t('form.removeFavorite') : t('form.addFavorite')}
      accessibilityRole="button"
      {...tid('favoriteToggle')}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={22}
        color={isFavorite ? theme.colors.primary : theme.colors.textSecondary}
      />
    </Pressable>
  );
}
