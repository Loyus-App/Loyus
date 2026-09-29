import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, type ScrollViewInstance, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type Brand, brandById, popularBrands } from '@/domain/brand';
import { Icon, icons, PressableScale, Text } from '@/ui/primitives';
import { testId, tid } from '@/ui/testIds';
import { haptics } from '@/ui/utils/haptics';
import { CardThumb } from '../CardThumb';

type Props = {
  readonly brandId: string | undefined;
  readonly region: string | undefined;
  readonly onPick: (brand: Brand) => void;
  readonly onRemove: () => void;
  readonly onMore: () => void;
};

const POPULAR_LIMIT = 12;
const CHIP_WIDTH = 72;

function BrandChip({
  brand,
  selected,
  onPress,
}: {
  readonly brand: Brand;
  readonly selected: boolean;
  readonly onPress: () => void;
}): React.JSX.Element {
  const { t } = useTranslation();
  styles.useVariants({ selected });
  return (
    <PressableScale
      onPress={onPress}
      scaleTo={0.94}
      accessibilityRole="radio"
      accessibilityLabel={t('form.brandUse', { name: brand.name })}
      accessibilityState={{ selected, checked: selected }}
      style={styles.ring}
      testID={testId('brandChip')}
    >
      <CardThumb card={{ name: brand.name, brandId: brand.id }} width={CHIP_WIDTH} />
    </PressableScale>
  );
}

export function BrandChips({
  brandId,
  region,
  onPick,
  onRemove,
  onMore,
}: Props): React.JSX.Element {
  const { t } = useTranslation();
  const linked = brandById(brandId);
  const scroller = useRef<ScrollViewInstance>(null);
  const popular = useMemo(() => popularBrands(region, POPULAR_LIMIT), [region]);
  const pickedElsewhere = linked !== undefined && !popular.some((brand) => brand.id === linked.id);
  const brands = pickedElsewhere && linked ? [linked, ...popular] : popular;

  useEffect(() => {
    if (pickedElsewhere) scroller.current?.scrollTo({ x: 0, animated: true });
  }, [pickedElsewhere]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="caption" tone="muted" weight="semibold">
          {linked ? t('form.storeLinked', { name: linked.name }) : t('form.store')}
        </Text>
        {linked ? (
          <PressableScale
            onPress={() => {
              haptics.selection();
              onRemove();
            }}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={t('form.brandRemoveLabel', { name: linked.name })}
            {...tid('brandRemoveButton')}
          >
            <Text variant="caption" tone="accent" weight="semibold">
              {t('form.brandRemove')}
            </Text>
          </PressableScale>
        ) : null}
      </View>
      <ScrollView
        ref={scroller}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroller}
        contentContainerStyle={styles.row}
        accessibilityRole="radiogroup"
        accessibilityLabel={t('form.store')}
      >
        {brands.map((brand) => (
          <BrandChip
            key={brand.id}
            brand={brand}
            selected={brand.id === linked?.id}
            onPress={() => onPick(brand)}
          />
        ))}
        <PressableScale
          onPress={onMore}
          scaleTo={0.94}
          accessibilityRole="button"
          accessibilityLabel={t('form.moreStores')}
          style={styles.more}
          {...tid('brandMoreButton')}
        >
          <Icon name={icons.search} size={16} tone="accent" />
          <Text variant="label" tone="accent" numberOfLines={1} maxFontSizeMultiplier={1.2}>
            {t('form.moreStores')}
          </Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}

const CHIP_HEIGHT = Math.round(CHIP_WIDTH / 1.586);
const RING = 3;

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.space(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space(1),
  },
  scroller: {
    marginHorizontal: -theme.space(4),
  },
  row: {
    gap: theme.space(2),
    paddingHorizontal: theme.space(4),
    alignItems: 'center',
  },
  ring: {
    padding: RING,
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderWidth: 2,
    variants: {
      selected: {
        true: { borderColor: theme.colors.accent },
        false: { borderColor: 'transparent' },
      },
    },
  },
  more: {
    height: CHIP_HEIGHT + (RING + 2) * 2,
    minWidth: CHIP_WIDTH,
    paddingHorizontal: theme.space(3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space(1),
    backgroundColor: theme.colors.surfaceMuted,
  },
}));
