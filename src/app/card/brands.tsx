import { router } from 'expo-router';
import { useDeferredValue, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SectionList, TextInput, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { allBrands, type Brand, popularBrands, suggestBrands } from '@/domain/brand';
import { deviceRegion } from '@/infra/platform/region';
import { useUiStore } from '@/state/stores/uiStore';
import { CardThumb } from '@/ui/components/CardThumb';
import { CARD_ASPECT_RATIO } from '@/ui/components/CardTile';
import { Icon, icons, Text } from '@/ui/primitives';
import { testId, tid } from '@/ui/testIds';

type Section = {
  readonly key: string;
  readonly title: string;
  readonly data: readonly Brand[];
};

const POPULAR_LIMIT = 12;
const SEARCH_LIMIT = 40;
const THUMB_WIDTH = 48;

const SearchInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.textMuted,
  selectionColor: theme.colors.accent,
}));

function choose(brandId: string | null): void {
  useUiStore.getState().pickBrand(brandId);
  router.back();
}

function BrandRow({
  brand,
  first,
  last,
}: {
  readonly brand: Brand;
  readonly first: boolean;
  readonly last: boolean;
}): React.JSX.Element {
  styles.useVariants({ first, last });
  return (
    <Pressable
      onPress={() => choose(brand.id)}
      accessibilityRole="button"
      accessibilityLabel={brand.name}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      testID={testId('brandPickerRow')}
    >
      <CardThumb card={{ name: brand.name, brandId: brand.id }} width={THUMB_WIDTH} />
      <Text variant="body" numberOfLines={1} style={styles.name}>
        {brand.name}
      </Text>
    </Pressable>
  );
}

function OtherStore(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={() => choose(null)}
      accessibilityRole="button"
      accessibilityLabel={`${t('brandPicker.other')}, ${t('brandPicker.otherHint')}`}
      style={({ pressed }) => [styles.other, pressed && styles.pressed]}
      {...tid('brandPickerOther')}
    >
      <View style={styles.otherIcon}>
        <Icon name={icons.edit} size={18} tone="muted" />
      </View>
      <View style={styles.name}>
        <Text variant="body">{t('brandPicker.other')}</Text>
        <Text variant="caption" tone="muted">
          {t('brandPicker.otherHint')}
        </Text>
      </View>
    </Pressable>
  );
}

function useSections(query: string, region: string | undefined): Section[] {
  const { t } = useTranslation();
  return useMemo(() => {
    if (query) {
      const results = suggestBrands(query, { region, limit: SEARCH_LIMIT });
      if (results.length === 0) return [];
      return [{ key: 'results', title: t('brandPicker.results'), data: results }];
    }
    return [
      {
        key: 'popular',
        title: t('brandPicker.popular'),
        data: popularBrands(region, POPULAR_LIMIT),
      },
      { key: 'all', title: t('brandPicker.all'), data: allBrands() },
    ];
  }, [query, region, t]);
}

type HeaderProps = {
  readonly query: string;
  readonly onQueryChange: (query: string) => void;
};

function PickerHeader({ query, onQueryChange }: HeaderProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <Text variant="headline" accessibilityRole="header" style={styles.title}>
        {t('brandPicker.title')}
      </Text>
      <View style={styles.search}>
        <Icon name={icons.search} size={16} tone="muted" />
        <SearchInput
          value={query}
          onChangeText={onQueryChange}
          placeholder={t('brandPicker.search')}
          accessibilityLabel={t('brandPicker.search')}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={styles.input}
          {...tid('brandPickerSearch')}
        />
      </View>
      <OtherStore />
    </View>
  );
}

export default function BrandPickerScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const [region] = useState(deviceRegion);
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query.trim());
  const sections = useSections(deferred, region);

  return (
    <SectionList<Brand, Section>
      style={styles.screen}
      sections={sections}
      keyExtractor={(brand) => brand.id}
      renderItem={({ item, index, section }) => (
        <BrandRow brand={item} first={index === 0} last={index === section.data.length - 1} />
      )}
      renderSectionHeader={({ section }) => (
        <Text variant="label" tone="muted" accessibilityRole="header" style={styles.sectionTitle}>
          {section.title}
        </Text>
      )}
      ListHeaderComponent={<PickerHeader query={query} onQueryChange={setQuery} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text variant="callout" weight="semibold" style={styles.centered}>
            {t('brandPicker.empty', { query: deferred })}
          </Text>
          <Text variant="caption" tone="muted" style={styles.centered}>
            {t('brandPicker.emptyHint')}
          </Text>
        </View>
      }
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={16}
      contentContainerStyle={styles.content}
      {...tid('brandPickerScreen')}
    />
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    gap: theme.space(3),
    paddingTop: theme.space(2),
  },
  title: {
    paddingHorizontal: theme.space(1),
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(2),
    paddingHorizontal: theme.space(3),
    minHeight: theme.size.touch,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  content: {
    padding: theme.space(4),
    paddingTop: theme.space(6),
    paddingBottom: rt.insets.bottom + theme.space(6),
  },
  sectionTitle: {
    paddingHorizontal: theme.space(4),
    paddingTop: theme.space(5),
    paddingBottom: theme.space(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    minHeight: 56,
    paddingHorizontal: theme.space(4),
    paddingVertical: theme.space(2),
    backgroundColor: theme.colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    variants: {
      first: {
        true: {
          borderTopWidth: 0,
          borderTopLeftRadius: theme.radius.lg,
          borderTopRightRadius: theme.radius.lg,
        },
        false: {},
      },
      last: {
        true: {
          borderBottomLeftRadius: theme.radius.lg,
          borderBottomRightRadius: theme.radius.lg,
        },
        false: {},
      },
    },
  },
  pressed: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  name: {
    flex: 1,
  },
  other: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
    minHeight: 56,
    paddingHorizontal: theme.space(4),
    paddingVertical: theme.space(2),
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
  },
  otherIcon: {
    width: THUMB_WIDTH,
    height: Math.round(THUMB_WIDTH / CARD_ASPECT_RATIO),
    borderRadius: theme.radius.thumb,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  },
  empty: {
    gap: theme.space(1),
    paddingTop: theme.space(8),
    paddingHorizontal: theme.space(6),
  },
  centered: {
    textAlign: 'center',
  },
}));
