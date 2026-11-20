import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type Brand, brandById, suggestBrands } from '@/entities/brand/domain/brand';
import { CardThumb } from '@/entities/card/ui/CardThumb';
import { ListRow, ListSection } from '@/shared/ui/primitives';
import { testId } from '@/shared/ui/testIds';

type Props = {
  readonly query: string;
  readonly brandId: string | undefined;
  readonly region: string | undefined;
  readonly onPick: (brand: Brand) => void;
};

const SUGGESTION_LIMIT = 3;
const THUMB_WIDTH = 44;

function BrandThumb({ brand }: { readonly brand: Brand }): React.JSX.Element {
  return <CardThumb card={{ name: brand.name, brandId: brand.id }} width={THUMB_WIDTH} />;
}

export function BrandSuggestions({
  query,
  brandId,
  region,
  onPick,
}: Props): React.JSX.Element | null {
  const { t } = useTranslation();
  const linked = brandById(brandId);
  const suggestions = useMemo(
    () => (linked ? [] : suggestBrands(query, { region, limit: SUGGESTION_LIMIT })),
    [linked, query, region],
  );

  if (linked || suggestions.length === 0) return null;

  return (
    <ListSection title={t('form.brandSuggestions')}>
      {suggestions.map((brand) => (
        <ListRow
          key={brand.id}
          leading={<BrandThumb brand={brand} />}
          title={brand.name}
          accessory="chevron"
          accessibilityLabel={t('form.brandUse', { name: brand.name })}
          onPress={() => onPick(brand)}
          testID={testId('brandSuggestion')}
        />
      ))}
    </ListSection>
  );
}
