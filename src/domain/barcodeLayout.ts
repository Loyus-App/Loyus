import { BarcodeFormat } from './card';

export type SymbolKind = 'linear' | 'matrix';

export interface SymbolShape {
  readonly kind: SymbolKind;
  readonly format: BarcodeFormat;
  readonly modules: number;
}

export interface SymbolRoom {
  readonly along: number;
  readonly across: number;
  readonly margin: number;
  readonly pixelRatio: number;
}

export interface SymbolLayout {
  readonly module: number;
  readonly width: number;
  readonly height: number;
  readonly quietZone: number;
  readonly dense: boolean;
}

const MM_PER_POINT = 0.16;

function mm(value: number): number {
  return value / MM_PER_POINT;
}

const LINEAR_MODULE = { min: mm(0.264), max: mm(0.66) };
const MATRIX_MODULE = { min: mm(0.375), target: mm(0.625), max: mm(0.99) };
const MATRIX_MAX_SIDE = mm(36);

const QUIET_MODULES: Partial<Record<BarcodeFormat, number>> = {
  [BarcodeFormat.EAN13]: 11,
  [BarcodeFormat.EAN8]: 7,
  [BarcodeFormat.UPC_A]: 9,
  [BarcodeFormat.UPC_E]: 9,
  [BarcodeFormat.QR_CODE]: 4,
};
const DEFAULT_QUIET_MODULES = 10;

const HEIGHT_IN_MODULES: Partial<Record<BarcodeFormat, number>> = {
  [BarcodeFormat.EAN13]: 22.85 / 0.33,
  [BarcodeFormat.UPC_A]: 22.85 / 0.33,
  [BarcodeFormat.UPC_E]: 22.85 / 0.33,
  [BarcodeFormat.EAN8]: 18.23 / 0.33,
};
const HEIGHT_RATIO = 1 / 3;
const MIN_BAR_HEIGHT = mm(6.35);

const PIXEL_EPSILON = 1e-6;

export function quietZoneModules(format: BarcodeFormat): number {
  return QUIET_MODULES[format] ?? DEFAULT_QUIET_MODULES;
}

function fitModule(modules: number, quietModules: number, space: number, margin: number): number {
  return Math.min(space / (modules + 2 * quietModules), (space - 2 * margin) / modules);
}

function snapToPixels(points: number, pixelRatio: number, floor: number): number {
  return Math.max(floor, Math.floor(points * pixelRatio + PIXEL_EPSILON)) / pixelRatio;
}

function preferredModule(shape: SymbolShape): number {
  if (shape.kind === 'linear') return LINEAR_MODULE.max;
  return Math.min(
    MATRIX_MODULE.max,
    Math.max(MATRIX_MODULE.target, MATRIX_MAX_SIDE / shape.modules),
  );
}

function barHeight(format: BarcodeFormat, module: number, width: number): number {
  const heightInModules = HEIGHT_IN_MODULES[format];
  if (heightInModules !== undefined) return heightInModules * module;
  return Math.max(width * HEIGHT_RATIO, MIN_BAR_HEIGHT);
}

export function layoutSymbol(shape: SymbolShape, room: SymbolRoom): SymbolLayout {
  const quietModules = quietZoneModules(shape.format);
  const matrix = shape.kind === 'matrix';
  const fitAlong = fitModule(shape.modules, quietModules, room.along, room.margin);
  const fitAcross = matrix
    ? fitModule(shape.modules, quietModules, room.across, room.margin)
    : Number.POSITIVE_INFINITY;
  const module = snapToPixels(
    Math.min(fitAlong, fitAcross, preferredModule(shape)),
    room.pixelRatio,
    1,
  );
  const width = module * shape.modules;
  const height = matrix
    ? width
    : snapToPixels(
        Math.min(barHeight(shape.format, module, width), room.across),
        room.pixelRatio,
        0,
      );

  return {
    module,
    width,
    height,
    quietZone: module * quietModules,
    dense: module < (matrix ? MATRIX_MODULE.min : LINEAR_MODULE.min),
  };
}
