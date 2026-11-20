import { readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { isPureCode, SRC_ROOT, sourceFiles } from '@/shared/testing/sourceFiles';

type Place = { readonly layer: string; readonly slice: string; readonly segment: string };

type Link = {
  readonly file: string;
  readonly target: string;
  readonly isRelative: boolean;
  readonly from: Place;
  readonly to: Place;
};

const RANK: Readonly<Record<string, number>> = {
  shared: 0,
  entities: 1,
  features: 2,
  boot: 3,
  app: 3,
};
const IMPURE = /(?:from|import|require)\s*\(?\s*['"](?:react-native|react(?=['"/])|expo|zustand)/;
const SPECIFIER = /(?:from\s+|import\s*\(\s*|import\s+|require\(\s*)['"]([^'"]+)['"]/g;

function placeOf(path: string): Place {
  const [layer = '', name = '', segment = ''] = path.split('/');
  if (layer === 'shared') return { layer, slice: `${layer}/${name}`, segment: name };
  if (layer === 'entities' || layer === 'features') {
    return { layer, slice: `${layer}/${name}`, segment };
  }
  return { layer, slice: layer, segment: '' };
}

function linksOf(file: string): Link[] {
  const content = readFileSync(join(SRC_ROOT, file), 'utf-8');
  return [...content.matchAll(SPECIFIER)].flatMap(([, specifier = '']) => {
    const isRelative = specifier.startsWith('.');
    if (!(isRelative || specifier.startsWith('@/'))) return [];
    const target = isRelative
      ? relative(SRC_ROOT, resolve(dirname(join(SRC_ROOT, file)), specifier))
      : specifier.slice(2);
    if (target.startsWith('..')) return [];
    return [{ file, target, isRelative, from: placeOf(file), to: placeOf(target) }];
  });
}

const files = sourceFiles();
const links = files.flatMap(linksOf);

function violations(isViolation: (link: Link) => boolean): string[] {
  return links.filter(isViolation).map(({ file, target }) => `${file} -> ${target}`);
}

function entityCycles(): string[] {
  const edges = new Map<string, Set<string>>();
  for (const { from, to } of links) {
    if (from.layer !== 'entities' || to.layer !== 'entities' || from.slice === to.slice) continue;
    edges.set(from.slice, (edges.get(from.slice) ?? new Set()).add(to.slice));
  }
  const reaches = (start: string, goal: string, seen = new Set<string>()): boolean =>
    [...(edges.get(start) ?? [])].some(
      (next) => next === goal || (!seen.has(next) && reaches(next, goal, seen.add(next))),
    );
  return [...edges.keys()].filter((slice) => reaches(slice, slice));
}

describe('architecture', () => {
  it('scans the source tree', () => {
    expect(files.filter(isPureCode).length).toBeGreaterThan(10);
    expect(links.length).toBeGreaterThan(100);
  });

  it('keeps domain code and shared/lib free of React, React Native, Expo and Zustand', () => {
    const impure = files
      .filter(isPureCode)
      .filter((file) => IMPURE.test(readFileSync(join(SRC_ROOT, file), 'utf-8')));
    expect(impure).toEqual([]);
  });

  it('only imports from the same or a lower layer (shared < entities < features < app)', () => {
    expect(violations(({ from, to }) => (RANK[to.layer] ?? 0) > (RANK[from.layer] ?? 0))).toEqual(
      [],
    );
  });

  it('never imports one feature from another', () => {
    expect(
      violations(
        ({ from, to }) =>
          from.layer === 'features' && to.layer === 'features' && from.slice !== to.slice,
      ),
    ).toEqual([]);
  });

  it('keeps entities free of dependency cycles', () => {
    expect(entityCycles()).toEqual([]);
  });

  it('keeps relative imports inside their slice', () => {
    expect(violations(({ isRelative, from, to }) => isRelative && from.slice !== to.slice)).toEqual(
      [],
    );
  });

  it('lets domain code import only domain code and shared/lib', () => {
    expect(
      violations(
        ({ from, to }) =>
          from.segment === 'domain' && to.segment !== 'domain' && to.slice !== 'shared/lib',
      ),
    ).toEqual([]);
  });

  it('keeps state and infra away from the UI, and infra away from state', () => {
    expect(
      violations(
        ({ from, to }) =>
          (['state', 'infra'].includes(from.segment) && to.segment === 'ui') ||
          (from.segment === 'infra' && to.segment === 'state'),
      ),
    ).toEqual([]);
  });
});
