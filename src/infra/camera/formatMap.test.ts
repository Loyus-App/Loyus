import { BarcodeFormat } from '../../domain/card';
import {
  ANDROID_FORMAT_TO_FORMAT,
  ANDROID_SCAN_FORMATS,
  IOS_SCAN_TYPES,
  IOS_TYPE_TO_FORMAT,
} from './formatMap';

describe('formatMap', () => {
  const allFormats = Object.values(BarcodeFormat);

  describe('iOS (VisionCamera object output)', () => {
    it('scans all 13 supported object types', () => {
      const expected = [
        'ean-13',
        'ean-8',
        'upc-e',
        'code-128',
        'code-39',
        'qr',
        'pdf-417',
        'data-matrix',
        'aztec',
        'codabar',
        'itf-14',
        'interleaved-2-of-5',
        'gs1-data-bar',
      ];
      expect(IOS_SCAN_TYPES).toHaveLength(13);
      for (const type of expected) {
        expect(IOS_SCAN_TYPES).toContain(type);
      }
    });

    it('maps every scanned type to a valid BarcodeFormat', () => {
      for (const type of IOS_SCAN_TYPES) {
        expect(allFormats).toContain(IOS_TYPE_TO_FORMAT[type]);
      }
    });

    it('provides direct mappings for all CAPS-03 formats (no fallbacks)', () => {
      expect(IOS_TYPE_TO_FORMAT['ean-13']).toBe(BarcodeFormat.EAN13);
      expect(IOS_TYPE_TO_FORMAT['ean-8']).toBe(BarcodeFormat.EAN8);
      expect(IOS_TYPE_TO_FORMAT['upc-e']).toBe(BarcodeFormat.UPC_E);
      expect(IOS_TYPE_TO_FORMAT['code-128']).toBe(BarcodeFormat.CODE128);
      expect(IOS_TYPE_TO_FORMAT['code-39']).toBe(BarcodeFormat.CODE39);
      expect(IOS_TYPE_TO_FORMAT.qr).toBe(BarcodeFormat.QR_CODE);
      expect(IOS_TYPE_TO_FORMAT['pdf-417']).toBe(BarcodeFormat.PDF417);
      expect(IOS_TYPE_TO_FORMAT['data-matrix']).toBe(BarcodeFormat.DATA_MATRIX);
      expect(IOS_TYPE_TO_FORMAT.aztec).toBe(BarcodeFormat.AZTEC);
      expect(IOS_TYPE_TO_FORMAT.codabar).toBe(BarcodeFormat.CODABAR);
      expect(IOS_TYPE_TO_FORMAT['itf-14']).toBe(BarcodeFormat.ITF14);
      expect(IOS_TYPE_TO_FORMAT['interleaved-2-of-5']).toBe(BarcodeFormat.ITF);
      expect(IOS_TYPE_TO_FORMAT['gs1-data-bar']).toBe(BarcodeFormat.GS1_DATABAR);
    });

    it('returns undefined for non-barcode object types (no crash)', () => {
      expect(IOS_TYPE_TO_FORMAT.face).toBeUndefined();
    });
  });

  describe('Android (ML Kit)', () => {
    it('scans all 12 supported ML Kit formats', () => {
      const expected = [
        'ean-13',
        'ean-8',
        'upc-a',
        'upc-e',
        'code-128',
        'code-39',
        'qr-code',
        'pdf-417',
        'data-matrix',
        'aztec',
        'codabar',
        'itf',
      ];
      expect(ANDROID_SCAN_FORMATS).toHaveLength(12);
      for (const format of expected) {
        expect(ANDROID_SCAN_FORMATS).toContain(format);
      }
    });

    it('maps every scanned format to a valid BarcodeFormat', () => {
      for (const format of ANDROID_SCAN_FORMATS) {
        const mlKitFormat = format as keyof typeof ANDROID_FORMAT_TO_FORMAT;
        expect(allFormats).toContain(ANDROID_FORMAT_TO_FORMAT[mlKitFormat]);
      }
    });

    it('provides direct mappings for all CAPS-03 formats (no fallbacks)', () => {
      expect(ANDROID_FORMAT_TO_FORMAT['ean-13']).toBe(BarcodeFormat.EAN13);
      expect(ANDROID_FORMAT_TO_FORMAT['ean-8']).toBe(BarcodeFormat.EAN8);
      expect(ANDROID_FORMAT_TO_FORMAT['upc-a']).toBe(BarcodeFormat.UPC_A);
      expect(ANDROID_FORMAT_TO_FORMAT['upc-e']).toBe(BarcodeFormat.UPC_E);
      expect(ANDROID_FORMAT_TO_FORMAT['code-128']).toBe(BarcodeFormat.CODE128);
      expect(ANDROID_FORMAT_TO_FORMAT['code-39']).toBe(BarcodeFormat.CODE39);
      expect(ANDROID_FORMAT_TO_FORMAT['qr-code']).toBe(BarcodeFormat.QR_CODE);
      expect(ANDROID_FORMAT_TO_FORMAT['pdf-417']).toBe(BarcodeFormat.PDF417);
      expect(ANDROID_FORMAT_TO_FORMAT['data-matrix']).toBe(BarcodeFormat.DATA_MATRIX);
      expect(ANDROID_FORMAT_TO_FORMAT.aztec).toBe(BarcodeFormat.AZTEC);
      expect(ANDROID_FORMAT_TO_FORMAT.codabar).toBe(BarcodeFormat.CODABAR);
      expect(ANDROID_FORMAT_TO_FORMAT.itf).toBe(BarcodeFormat.ITF);
    });

    it('returns undefined for unknown formats (no crash)', () => {
      expect(ANDROID_FORMAT_TO_FORMAT.unknown).toBeUndefined();
    });
  });
});
