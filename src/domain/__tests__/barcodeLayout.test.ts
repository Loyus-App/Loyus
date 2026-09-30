import { layoutSymbol, quietZoneModules, type SymbolRoom } from '../barcodeLayout';
import { BarcodeFormat } from '../card';

const PHONE: SymbolRoom = { along: 370, across: 400, margin: 24, pixelRatio: 3 };

const ean13 = { kind: 'linear', format: BarcodeFormat.EAN13, modules: 95 } as const;
const code128 = (modules: number) =>
  ({ kind: 'linear', format: BarcodeFormat.CODE128, modules }) as const;
const qr = (modules: number) =>
  ({ kind: 'matrix', format: BarcodeFormat.QR_CODE, modules }) as const;

describe('quietZoneModules', () => {
  it('follows the GS1 and ISO quiet zones', () => {
    expect(quietZoneModules(BarcodeFormat.EAN13)).toBe(11);
    expect(quietZoneModules(BarcodeFormat.EAN8)).toBe(7);
    expect(quietZoneModules(BarcodeFormat.UPC_A)).toBe(9);
    expect(quietZoneModules(BarcodeFormat.CODE128)).toBe(10);
    expect(quietZoneModules(BarcodeFormat.QR_CODE)).toBe(4);
  });
});

describe('layoutSymbol', () => {
  it('sizes an EAN-13 on a phone within the GS1 X-dimension range', () => {
    const layout = layoutSymbol(ean13, PHONE);

    expect(layout.module).toBe(3);
    expect(layout.width).toBe(285);
    expect(layout.quietZone).toBe(33);
    expect(layout.dense).toBe(false);
  });

  it('keeps every module on whole device pixels', () => {
    for (const along of [320, 343, 358, 370, 398]) {
      for (const pixelRatio of [2, 3]) {
        const { module } = layoutSymbol(ean13, { ...PHONE, along, pixelRatio });
        expect(Number.isInteger(Math.round(module * pixelRatio * 1e6) / 1e6)).toBe(true);
      }
    }
  });

  it('leaves the quiet zones and margins inside the available width', () => {
    for (const shape of [ean13, code128(140), qr(29)]) {
      const layout = layoutSymbol(shape, PHONE);
      expect(layout.width + 2 * layout.quietZone).toBeLessThanOrEqual(PHONE.along);
      expect(layout.width + 2 * PHONE.margin).toBeLessThanOrEqual(PHONE.along);
    }
  });

  it('gives EAN-13 bars their GS1 height when there is room', () => {
    const layout = layoutSymbol(ean13, PHONE);
    expect(layout.height / layout.module).toBeCloseTo(22.85 / 0.33, 0);
  });

  it('truncates the bars to the room across', () => {
    const layout = layoutSymbol(ean13, { ...PHONE, across: 120 });
    expect(layout.height).toBe(120);
  });

  it('draws other 1D codes a third as tall as they are wide', () => {
    const layout = layoutSymbol(code128(112), PHONE);
    expect(layout.height).toBeCloseTo(layout.width / 3, 0);
  });

  it('caps the module at the GS1 maximum when the code is short', () => {
    const layout = layoutSymbol(code128(35), { ...PHONE, along: 580 });
    expect(layout.module).toBeLessThanOrEqual(0.66 / 0.16);
  });

  it('flags codes too dense for the width and clears the flag once rotated', () => {
    expect(layoutSymbol(code128(300), PHONE).dense).toBe(true);
    expect(layoutSymbol(code128(300), { ...PHONE, along: 580 }).dense).toBe(false);
  });

  it('keeps small QR codes at the GS1 maximum module', () => {
    const layout = layoutSymbol(qr(25), PHONE);

    expect(layout.module).toBe(6);
    expect(layout.width).toBe(150);
    expect(layout.height).toBe(150);
    expect(layout.quietZone).toBe(24);
  });

  it('keeps large QR codes inside a scanner field of view', () => {
    const layout = layoutSymbol(qr(57), PHONE);

    expect(layout.width).toBeLessThanOrEqual(36 / 0.16);
    expect(layout.dense).toBe(false);
  });

  it('fits QR codes in the room across when it is the tighter side', () => {
    const layout = layoutSymbol(qr(33), { ...PHONE, across: 150 });
    expect(layout.width + 2 * layout.quietZone).toBeLessThanOrEqual(150);
  });

  it('never drops below one device pixel per module', () => {
    const layout = layoutSymbol(code128(2000), PHONE);
    expect(layout.module).toBeCloseTo(1 / 3);
  });
});
