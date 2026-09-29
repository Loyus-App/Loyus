import { BRAND_CATALOG } from './brandCatalog';
import { foldText } from './text';

export type BrandLogoTone = 'light' | 'dark';

export interface BrandLogo {
  readonly tone: BrandLogoTone;
  readonly ratio: number;
  readonly viewBox?: string | undefined;
  readonly plate?: string | undefined;
}

export interface Brand {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly markets: readonly string[];
  readonly popularity: number;
  readonly wallets: number;
  readonly color: string;
  readonly logo?: BrandLogo | undefined;
}

export interface BrandQueryOptions {
  readonly region?: string | undefined;
  readonly limit?: number | undefined;
}

const SEPARATORS = /[^\p{L}\p{N}]+/gu;
const SPACES = / /g;
const MIN_CONTAINS_LENGTH = 3;
const DEFAULT_LIMIT = 4;

const SCORE = {
  exact: 100,
  prefix: 80,
  wordPrefix: 60,
  contains: 40,
  partialWord: 0.7,
  alias: 0.9,
  region: 8,
  international: 3,
  popularity: 2,
  wallets: 0.5,
} as const;

export function normalizeBrandName(value: string): string {
  return foldText(value).replace(SEPARATORS, ' ').trim();
}

interface BrandTerms {
  readonly name: string;
  readonly aliases: readonly string[];
}

const TERMS = new WeakMap<Brand, BrandTerms>();

function termsOf(brand: Brand): BrandTerms {
  const cached = TERMS.get(brand);
  if (cached) return cached;
  const terms = {
    name: normalizeBrandName(brand.name),
    aliases: brand.aliases.map(normalizeBrandName),
  };
  TERMS.set(brand, terms);
  return terms;
}

function compact(normalized: string): string {
  return normalized.replace(SPACES, '');
}

function termScore(term: string, query: string): number {
  if (!(term && query)) return 0;
  const compactTerm = compact(term);
  const compactQuery = compact(query);
  if (term === query || compactTerm === compactQuery) return SCORE.exact;
  if (term.startsWith(query) || compactTerm.startsWith(compactQuery)) return SCORE.prefix;
  if (term.split(' ').some((word) => word.startsWith(query))) return SCORE.wordPrefix;
  if (query.length >= MIN_CONTAINS_LENGTH && term.includes(query)) {
    return SCORE.contains;
  }
  return 0;
}

function queryScore(term: string, query: string): number {
  const whole = termScore(term, query);
  const words = query.split(' ').filter((word) => word.length >= MIN_CONTAINS_LENGTH);
  if (words.length < 2) return whole;
  const partial = Math.max(...words.map((word) => termScore(term, word))) * SCORE.partialWord;
  return Math.max(whole, partial);
}

function brandScore(brand: Brand, query: string): number {
  const terms = termsOf(brand);
  const name = queryScore(terms.name, query);
  const alias = Math.max(0, ...terms.aliases.map((term) => queryScore(term, query)));
  return Math.max(name, alias * SCORE.alias);
}

function reach(brand: Brand, region: string | undefined): number {
  if (region && brand.markets.includes(region)) return SCORE.region;
  return brand.markets.includes('INT') ? SCORE.international : 0;
}

export function searchBrands(
  catalog: readonly Brand[],
  text: string,
  options: BrandQueryOptions = {},
): Brand[] {
  const query = normalizeBrandName(text);
  if (!query) return [];
  const region = options.region?.toUpperCase();
  return catalog
    .map((brand) => ({ brand, match: brandScore(brand, query) }))
    .filter(({ match }) => match > 0)
    .map(({ brand, match }) => ({
      brand,
      score:
        match +
        reach(brand, region) +
        (4 - brand.popularity) * SCORE.popularity +
        Math.min(brand.wallets, 4) * SCORE.wallets,
    }))
    .sort((a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name))
    .slice(0, options.limit ?? DEFAULT_LIMIT)
    .map(({ brand }) => brand);
}

export function findBrandByName(
  catalog: readonly Brand[],
  name: string,
  region?: string | undefined,
): Brand | undefined {
  const query = normalizeBrandName(name);
  if (!query) return undefined;
  const matches = catalog.filter((brand) => {
    const terms = termsOf(brand);
    return [terms.name, ...terms.aliases].some((term) => termScore(term, query) === SCORE.exact);
  });
  return searchBrands(matches, name, { region, limit: 1 })[0];
}

export function rankPopular(
  catalog: readonly Brand[],
  region: string | undefined,
  limit: number,
): Brand[] {
  const market = region?.toUpperCase() ?? 'INT';
  return catalog
    .filter((brand) => brand.logo && brand.markets.includes(market))
    .sort(
      (a, b) =>
        a.popularity - b.popularity || b.wallets - a.wallets || a.name.localeCompare(b.name),
    )
    .slice(0, limit);
}

export function brandIndex(catalog: readonly Brand[]): ReadonlyMap<string, Brand> {
  return new Map(catalog.map((brand) => [brand.id, brand]));
}

const INDEX = brandIndex(BRAND_CATALOG);

export function brandById(id: string | undefined): Brand | undefined {
  return id === undefined ? undefined : INDEX.get(id);
}

export function suggestBrands(text: string, options?: BrandQueryOptions): Brand[] {
  return searchBrands(BRAND_CATALOG, text, options);
}

export function matchBrand(name: string, region?: string | undefined): Brand | undefined {
  return findBrandByName(BRAND_CATALOG, name, region);
}

export function popularBrands(region: string | undefined, limit: number): Brand[] {
  return rankPopular(BRAND_CATALOG, region, limit);
}

export function allBrands(): readonly Brand[] {
  return BRAND_CATALOG;
}
