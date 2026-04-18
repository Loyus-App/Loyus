import { BarcodeFormat } from '../../domain/card';
import { CODE_TYPE_TO_FORMAT, SCAN_CODE_TYPES } from './formatMap';

describe('formatMap', () => {
  describe('SCAN_CODE_TYPES', () => {
    it('contains all 13 VisionCamera CodeType strings', () => {
      const expected = [
        'ean-13',
        'ean-8',
        'upc-a',
        'upc-e',
        'code-128',
        'code-39',
        'qr',
        'pdf-417',
        'data-matrix',
        'aztec',
        'codabar',
        'itf-14',
        'gs1-data-bar',
      ];
      expect(SCAN_CODE_TYPES).toHaveLength(13);
      for (const ct of expected) {
        expect(SCAN_CODE_TYPES).toContain(ct);
      }
    });
  });

  describe('CODE_TYPE_TO_FORMAT', () => {
    it('maps every SCAN_CODE_TYPES entry to a valid BarcodeFormat', () => {
      const allFormats = Object.values(BarcodeFormat);
      for (const ct of SCAN_CODE_TYPES) {
        const mapped = CODE_TYPE_TO_FORMAT[ct];
        expect(mapped).toBeDefined();
        expect(allFormats).toContain(mapped);
      }
    });

    it('provides direct mappings for all CAPS-03 formats (no fallbacks)', () => {
      expect(CODE_TYPE_TO_FORMAT['ean-13']).toBe(BarcodeFormat.EAN13);
      expect(CODE_TYPE_TO_FORMAT['ean-8']).toBe(BarcodeFormat.EAN8);
      expect(CODE_TYPE_TO_FORMAT['upc-a']).toBe(BarcodeFormat.UPC_A);
      expect(CODE_TYPE_TO_FORMAT['upc-e']).toBe(BarcodeFormat.UPC_E);
      expect(CODE_TYPE_TO_FORMAT['code-128']).toBe(BarcodeFormat.CODE128);
      expect(CODE_TYPE_TO_FORMAT['code-39']).toBe(BarcodeFormat.CODE39);
      expect(CODE_TYPE_TO_FORMAT.qr).toBe(BarcodeFormat.QR_CODE);
      expect(CODE_TYPE_TO_FORMAT['pdf-417']).toBe(BarcodeFormat.PDF417);
      expect(CODE_TYPE_TO_FORMAT['data-matrix']).toBe(BarcodeFormat.DATA_MATRIX);
      expect(CODE_TYPE_TO_FORMAT.aztec).toBe(BarcodeFormat.AZTEC);
      expect(CODE_TYPE_TO_FORMAT.codabar).toBe(BarcodeFormat.CODABAR);
      expect(CODE_TYPE_TO_FORMAT['itf-14']).toBe(BarcodeFormat.ITF14);
      expect(CODE_TYPE_TO_FORMAT['gs1-data-bar']).toBe(BarcodeFormat.GS1_DATABAR);
    });

    it('returns undefined for unmapped CodeType (no crash)', () => {
      // Cast to bypass TS type checking for an unmapped value
      const result = CODE_TYPE_TO_FORMAT['unknown-type' as keyof typeof CODE_TYPE_TO_FORMAT];
      expect(result).toBeUndefined();
    });
  });
});
