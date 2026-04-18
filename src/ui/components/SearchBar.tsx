import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={18}
        color={theme.colors.textTertiary}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={t('search.placeholder')}
        placeholderTextColor={theme.colors.textPlaceholder}
        accessibilityLabel={t('home.searchLabel')}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        {...tid('searchInput')}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    ...theme.subtleShadow,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    padding: 0,
  },
}));
