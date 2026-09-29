import { View } from 'react-native';
import { type JsxAST, parse, SvgAst } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { type Brand, brandById } from '@/domain/brand';
import { BRAND_LOGOS } from '../brands/brandLogos';

export type BrandLogoArt = {
  readonly brand: Brand;
  readonly ast: JsxAST;
};

const parsed = new Map<string, JsxAST | null>();

function parseLogo(id: string): JsxAST | null {
  const load = BRAND_LOGOS[id];
  if (!load) return null;
  try {
    return parse(load());
  } catch {
    return null;
  }
}

export function brandLogo(brandId: string | undefined): BrandLogoArt | null {
  const brand = brandById(brandId);
  if (!brand?.logo) return null;
  if (!parsed.has(brand.id)) parsed.set(brand.id, parseLogo(brand.id));
  const ast = parsed.get(brand.id);
  return ast ? { brand, ast } : null;
}

const PLATE_LOGO_AREA = 1500;
const PLATE_LOGO_MAX_HEIGHT = 30;
const PLATE_INSET = 6;

function Logo({ art }: { readonly art: BrandLogoArt }): React.JSX.Element {
  const viewBox = art.brand.logo?.viewBox;
  return (
    <SvgAst
      ast={art.ast}
      override={{ width: '100%', height: '100%', ...(viewBox ? { viewBox } : {}) }}
    />
  );
}

function plateColor(art: BrandLogoArt): { tone: 'light' | 'dark'; color?: string | undefined } {
  return { tone: art.brand.logo?.tone ?? 'light', color: art.brand.logo?.plate };
}

export function BrandPlate({ art }: { readonly art: BrandLogoArt }): React.JSX.Element {
  const ratio = art.brand.logo?.ratio ?? 1;
  const height = Math.min(PLATE_LOGO_MAX_HEIGHT, Math.sqrt(PLATE_LOGO_AREA / ratio));
  const { tone, color } = plateColor(art);
  return (
    <View style={styles.plate(tone, color)}>
      <View style={styles.logo(height * ratio, height)}>
        <Logo art={art} />
      </View>
    </View>
  );
}

type FillProps = {
  readonly art: BrandLogoArt;
  readonly width: number;
  readonly height: number;
};

export function BrandFill({ art, width, height }: FillProps): React.JSX.Element {
  const inset = Math.max(2, Math.round(height * 0.14));
  const { tone, color } = plateColor(art);
  return (
    <View style={styles.fill(tone, color, width, height, inset)}>
      <Logo art={art} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  plate: (tone: 'light' | 'dark', color: string | undefined) => ({
    maxWidth: '72%',
    flexShrink: 1,
    padding: PLATE_INSET,
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    backgroundColor: color ?? theme.brandPlate[tone],
  }),
  logo: (width: number, height: number) => ({
    width,
    height,
    maxWidth: '100%',
  }),
  fill: (
    tone: 'light' | 'dark',
    color: string | undefined,
    width: number,
    height: number,
    inset: number,
  ) => ({
    width,
    height,
    padding: inset,
    borderRadius: theme.radius.sm - 3,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: color ?? theme.brandPlate[tone],
  }),
}));
