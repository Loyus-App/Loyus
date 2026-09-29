import {
  type Brand,
  brandById,
  findBrandByName,
  matchBrand,
  normalizeBrandName,
  popularBrands,
  rankPopular,
  searchBrands,
  suggestBrands,
} from '../brand';
import { BRAND_CATALOG } from '../brandCatalog';

const brand = (id: string, name: string, extra: Partial<Brand> = {}): Brand => ({
  id,
  name,
  aliases: [],
  markets: ['FR'],
  popularity: 2,
  wallets: 0,
  color: '#123456',
  ...extra,
});

const catalog: readonly Brand[] = [
  brand('e-leclerc', 'E.Leclerc', { aliases: ['Espace Culturel Leclerc'], popularity: 1 }),
  brand('carrefour', 'Carrefour', { popularity: 1 }),
  brand('carrefour-market', 'Carrefour Market'),
  brand('intermarche', 'Intermarché'),
  brand('lidl', 'Lidl', { aliases: ['Lidl Plus'], markets: ['DE', 'FR'] }),
  brand('boots', 'Boots', { markets: ['GB'] }),
  brand('books-a-million', 'Books-A-Million', { markets: ['US'] }),
];

describe('normalizeBrandName', () => {
  it('drops accents, case and punctuation', () => {
    expect(normalizeBrandName('  E.Leclerc ')).toBe('e leclerc');
    expect(normalizeBrandName('Intermarché')).toBe('intermarche');
    expect(normalizeBrandName("L'Occitane en Provence")).toBe('l occitane en provence');
  });
});

describe('searchBrands', () => {
  it('matches a word inside the name', () => {
    expect(searchBrands(catalog, 'leclerc')[0]?.id).toBe('e-leclerc');
  });

  it('ignores accents and spacing', () => {
    expect(searchBrands(catalog, 'inter marche')[0]?.id).toBe('intermarche');
  });

  it('puts exact matches before longer names', () => {
    expect(searchBrands(catalog, 'carrefour').map((b) => b.id)).toEqual([
      'carrefour',
      'carrefour-market',
    ]);
  });

  it('finds brands through their aliases', () => {
    expect(searchBrands(catalog, 'lidl plus')[0]?.id).toBe('lidl');
  });

  it('still suggests the brand when the name has extra words', () => {
    expect(searchBrands(catalog, 'Leclerc Dijon')[0]?.id).toBe('e-leclerc');
  });

  it('ranks brands of the current region first', () => {
    expect(searchBrands(catalog, 'boo', { region: 'us' })[0]?.id).toBe('books-a-million');
    expect(searchBrands(catalog, 'boo', { region: 'GB' })[0]?.id).toBe('boots');
  });

  it('does not match across word boundaries', () => {
    const club = [brand('bjs', "BJ's Wholesale Club"), ...catalog];
    expect(searchBrands(club, 'lecl').map((b) => b.id)).toEqual(['e-leclerc']);
  });

  it('returns nothing for an empty query and honours the limit', () => {
    expect(searchBrands(catalog, '  ')).toEqual([]);
    expect(searchBrands(catalog, 'c', { limit: 1 })).toHaveLength(1);
  });
});

describe('rankPopular', () => {
  const logo = { tone: 'light', ratio: 2 } as const;
  const ranked: readonly Brand[] = [
    brand('b', 'Beta', { logo, popularity: 2 }),
    brand('a', 'Alpha', { logo, popularity: 2 }),
    brand('top', 'Top', { logo, popularity: 1 }),
    brand('bare', 'Bare', { popularity: 1 }),
    brand('us', 'Us only', { logo, popularity: 1, markets: ['US'] }),
  ];

  it('keeps local brands with a logo, most popular first then A to Z', () => {
    expect(rankPopular(ranked, 'fr', 3).map((b) => b.id)).toEqual(['top', 'a', 'b']);
  });

  it('prefers brands listed by more wallet apps among equals', () => {
    const listed = [brand('z', 'Zeta', { logo, popularity: 2, wallets: 5 }), ...ranked];
    expect(rankPopular(listed, 'FR', 2).map((b) => b.id)).toEqual(['top', 'z']);
  });

  it('falls back to international brands without a region', () => {
    const international = [brand('int', 'Global', { logo, markets: ['INT'] }), ...ranked];
    expect(rankPopular(international, undefined, 5).map((b) => b.id)).toEqual(['int']);
  });

  it('lists the big French programs for France', () => {
    const ids = popularBrands('FR', 12).map((b) => b.id);
    expect(ids).toEqual(expect.arrayContaining(['e-leclerc', 'carrefour']));
  });
});

describe('findBrandByName', () => {
  it('only links exact names or aliases', () => {
    expect(findBrandByName(catalog, 'carrefour ')?.id).toBe('carrefour');
    expect(findBrandByName(catalog, 'Espace culturel Leclerc')?.id).toBe('e-leclerc');
    expect(findBrandByName(catalog, 'Carrefour Dijon')).toBeUndefined();
    expect(findBrandByName(catalog, '')).toBeUndefined();
  });
});

describe('brand catalog', () => {
  it('has unique ids, hex colors and sane logo ratios', () => {
    const ids = new Set(BRAND_CATALOG.map((b) => b.id));
    expect(ids.size).toBe(BRAND_CATALOG.length);
    for (const entry of BRAND_CATALOG) {
      expect(entry.color).toMatch(/^#[0-9A-F]{6}$/);
      if (entry.logo) expect(entry.logo.ratio).toBeGreaterThan(0);
    }
  });

  it('knows the big French loyalty programs', () => {
    expect(suggestBrands('leclerc', { region: 'FR' })[0]?.id).toBe('e-leclerc');
    expect(matchBrand('Carrefour')?.id).toBe('carrefour');
    expect(matchBrand('Intermarche')?.id).toBe('intermarche');
    expect(brandById('decathlon')?.name).toBe('Decathlon');
  });

  it('leaves unknown stores alone', () => {
    expect(matchBrand('Green Grocer')).toBeUndefined();
    expect(brandById('not-a-brand')).toBeUndefined();
    expect(brandById(undefined)).toBeUndefined();
  });
});
