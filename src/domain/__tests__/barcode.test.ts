import { parseBarcodeFormat, validateBarcode } from '../barcode';
import { BarcodeFormat } from '../card';

describe('validateBarcode', () => {
  describe('EAN13', () => {
    it('accepts valid 13-digit EAN with correct check digit', () => {
      const result = validateBarcode('4006381333931', BarcodeFormat.EAN13);
      expect(result).toEqual({ valid: true });
    });

    it('accepts valid 12-digit EAN (auto-calc check digit)', () => {
      const result = validateBarcode('400638133393', BarcodeFormat.EAN13);
      expect(result).toEqual({ valid: true });
    });

    it('rejects 13-digit EAN with wrong check digit', () => {
      const result = validateBarcode('4006381333932', BarcodeFormat.EAN13);
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('rejects non-digit characters', () => {
      const result = validateBarcode('400638133393A', BarcodeFormat.EAN13);
      expect(result.valid).toBe(false);
    });

    it('rejects wrong length', () => {
      const result = validateBarcode('12345', BarcodeFormat.EAN13);
      expect(result.valid).toBe(false);
    });
  });

  describe('EAN8', () => {
    it('accepts valid 8-digit EAN with correct check digit', () => {
      const result = validateBarcode('96385074', BarcodeFormat.EAN8);
      expect(result).toEqual({ valid: true });
    });

    it('accepts 7-digit EAN (auto-calc)', () => {
      const result = validateBarcode('9638507', BarcodeFormat.EAN8);
      expect(result).toEqual({ valid: true });
    });

    it('rejects 8-digit EAN with wrong check digit', () => {
      const result = validateBarcode('96385075', BarcodeFormat.EAN8);
      expect(result.valid).toBe(false);
    });

    it('rejects wrong length', () => {
      const result = validateBarcode('123', BarcodeFormat.EAN8);
      expect(result.valid).toBe(false);
    });
  });

  describe('UPC_A', () => {
    it('accepts valid 12-digit UPC-A', () => {
      const result = validateBarcode('012345678905', BarcodeFormat.UPC_A);
      expect(result).toEqual({ valid: true });
    });

    it('accepts 11-digit UPC-A (auto-calc)', () => {
      const result = validateBarcode('01234567890', BarcodeFormat.UPC_A);
      expect(result).toEqual({ valid: true });
    });

    it('rejects 12-digit UPC-A with wrong check digit', () => {
      const result = validateBarcode('012345678906', BarcodeFormat.UPC_A);
      expect(result.valid).toBe(false);
    });

    it('rejects wrong length', () => {
      const result = validateBarcode('12345', BarcodeFormat.UPC_A);
      expect(result.valid).toBe(false);
    });
  });

  describe('UPC_E', () => {
    it('accepts 6-digit UPC-E', () => {
      const result = validateBarcode('123456', BarcodeFormat.UPC_E);
      expect(result).toEqual({ valid: true });
    });

    it('accepts 7-digit UPC-E', () => {
      const result = validateBarcode('1234567', BarcodeFormat.UPC_E);
      expect(result).toEqual({ valid: true });
    });

    it('accepts 8-digit UPC-E', () => {
      const result = validateBarcode('12345678', BarcodeFormat.UPC_E);
      expect(result).toEqual({ valid: true });
    });

    it('rejects non-digit characters', () => {
      const result = validateBarcode('12345A', BarcodeFormat.UPC_E);
      expect(result.valid).toBe(false);
    });

    it('rejects wrong length', () => {
      const result = validateBarcode('12345', BarcodeFormat.UPC_E);
      expect(result.valid).toBe(false);
    });
  });

  describe('CODE128', () => {
    it('accepts valid ASCII string', () => {
      const result = validateBarcode('Hello123', BarcodeFormat.CODE128);
      expect(result).toEqual({ valid: true });
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.CODE128);
      expect(result.valid).toBe(false);
    });
  });

  describe('CODE39', () => {
    it('accepts uppercase alphanumeric with special chars', () => {
      const result = validateBarcode('HELLO', BarcodeFormat.CODE39);
      expect(result).toEqual({ valid: true });
    });

    it('accepts digits', () => {
      const result = validateBarcode('12345', BarcodeFormat.CODE39);
      expect(result).toEqual({ valid: true });
    });

    it('accepts special characters -. $/+%', () => {
      const result = validateBarcode('A-B.C $D/E+F%G', BarcodeFormat.CODE39);
      expect(result).toEqual({ valid: true });
    });

    it('rejects lowercase letters', () => {
      const result = validateBarcode('hello', BarcodeFormat.CODE39);
      expect(result.valid).toBe(false);
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.CODE39);
      expect(result.valid).toBe(false);
    });
  });

  describe('ITF14', () => {
    it('accepts valid 14-digit ITF14', () => {
      // ITF14 check digit: same mod-10 algorithm
      const result = validateBarcode('00012345678905', BarcodeFormat.ITF14);
      expect(result).toEqual({ valid: true });
    });

    it('accepts 13-digit ITF14 (auto-calc)', () => {
      const result = validateBarcode('0001234567890', BarcodeFormat.ITF14);
      expect(result).toEqual({ valid: true });
    });

    it('rejects wrong length', () => {
      const result = validateBarcode('12345', BarcodeFormat.ITF14);
      expect(result.valid).toBe(false);
    });
  });

  describe('CODABAR', () => {
    it('accepts digits and special chars', () => {
      const result = validateBarcode('123-456', BarcodeFormat.CODABAR);
      expect(result).toEqual({ valid: true });
    });

    it('accepts all valid CODABAR characters', () => {
      const result = validateBarcode('0123456789-$:/.+', BarcodeFormat.CODABAR);
      expect(result).toEqual({ valid: true });
    });

    it('rejects letters', () => {
      const result = validateBarcode('ABC', BarcodeFormat.CODABAR);
      expect(result.valid).toBe(false);
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.CODABAR);
      expect(result.valid).toBe(false);
    });
  });

  describe('MSI', () => {
    it('accepts digits only', () => {
      const result = validateBarcode('123456', BarcodeFormat.MSI);
      expect(result).toEqual({ valid: true });
    });

    it('rejects non-digit characters', () => {
      const result = validateBarcode('123A', BarcodeFormat.MSI);
      expect(result.valid).toBe(false);
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.MSI);
      expect(result.valid).toBe(false);
    });
  });

  describe('PHARMACODE', () => {
    it('accepts valid pharmacode "131070" (max value)', () => {
      const result = validateBarcode('131070', BarcodeFormat.PHARMACODE);
      expect(result).toEqual({ valid: true });
    });

    it('accepts minimum value "3"', () => {
      const result = validateBarcode('3', BarcodeFormat.PHARMACODE);
      expect(result).toEqual({ valid: true });
    });

    it('rejects "131071" (exceeds max)', () => {
      const result = validateBarcode('131071', BarcodeFormat.PHARMACODE);
      expect(result.valid).toBe(false);
    });

    it('rejects "2" (below minimum 3)', () => {
      const result = validateBarcode('2', BarcodeFormat.PHARMACODE);
      expect(result.valid).toBe(false);
    });

    it('rejects "0"', () => {
      const result = validateBarcode('0', BarcodeFormat.PHARMACODE);
      expect(result.valid).toBe(false);
    });

    it('rejects non-digit characters', () => {
      const result = validateBarcode('12A', BarcodeFormat.PHARMACODE);
      expect(result.valid).toBe(false);
    });

    it('rejects more than 6 digits', () => {
      const result = validateBarcode('1234567', BarcodeFormat.PHARMACODE);
      expect(result.valid).toBe(false);
    });
  });

  describe('QR_CODE', () => {
    it('accepts any non-empty string', () => {
      const result = validateBarcode('https://example.com', BarcodeFormat.QR_CODE);
      expect(result).toEqual({ valid: true });
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.QR_CODE);
      expect(result.valid).toBe(false);
    });
  });

  describe('DATA_MATRIX', () => {
    it('accepts any non-empty string', () => {
      const result = validateBarcode('data-matrix-content', BarcodeFormat.DATA_MATRIX);
      expect(result).toEqual({ valid: true });
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.DATA_MATRIX);
      expect(result.valid).toBe(false);
    });
  });

  describe('PDF417', () => {
    it('accepts any non-empty string', () => {
      const result = validateBarcode('pdf417-content', BarcodeFormat.PDF417);
      expect(result).toEqual({ valid: true });
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.PDF417);
      expect(result.valid).toBe(false);
    });
  });

  describe('AZTEC', () => {
    it('accepts any non-empty string', () => {
      const result = validateBarcode('aztec-content', BarcodeFormat.AZTEC);
      expect(result).toEqual({ valid: true });
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.AZTEC);
      expect(result.valid).toBe(false);
    });
  });

  describe('GS1_DATABAR', () => {
    it('accepts digit-only string', () => {
      const result = validateBarcode('0123456789', BarcodeFormat.GS1_DATABAR);
      expect(result).toEqual({ valid: true });
    });

    it('rejects non-digit characters', () => {
      const result = validateBarcode('ABC123', BarcodeFormat.GS1_DATABAR);
      expect(result.valid).toBe(false);
    });

    it('rejects empty string', () => {
      const result = validateBarcode('', BarcodeFormat.GS1_DATABAR);
      expect(result.valid).toBe(false);
    });
  });

  describe('CODE128 non-ASCII', () => {
    it('rejects non-ASCII characters', () => {
      const result = validateBarcode('Hello\u00E9', BarcodeFormat.CODE128);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('ASCII');
    });
  });

  describe('ITF14 check digit', () => {
    it('rejects 14-digit ITF14 with wrong check digit', () => {
      const result = validateBarcode('00012345678909', BarcodeFormat.ITF14);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('check digit');
    });
  });
});

describe('parseBarcodeFormat', () => {
  it('detects EAN13 for 13-digit string', () => {
    expect(parseBarcodeFormat('4006381333931')).toBe(BarcodeFormat.EAN13);
  });

  it('detects EAN13 for 12-digit string', () => {
    expect(parseBarcodeFormat('400638133393')).toBe(BarcodeFormat.EAN13);
  });

  it('detects EAN8 for 8-digit string', () => {
    expect(parseBarcodeFormat('96385074')).toBe(BarcodeFormat.EAN8);
  });

  it('detects EAN8 for 7-digit string', () => {
    expect(parseBarcodeFormat('9638507')).toBe(BarcodeFormat.EAN8);
  });

  it('detects UPC_E for 0-prefixed 8-digit string', () => {
    expect(parseBarcodeFormat('01234567')).toBe(BarcodeFormat.UPC_E);
  });

  it('returns null for non-numeric string', () => {
    expect(parseBarcodeFormat('ABCD1234')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseBarcodeFormat('')).toBeNull();
  });

  it('returns null for unrecognized digit length (e.g. 5 digits)', () => {
    expect(parseBarcodeFormat('12345')).toBeNull();
  });

  it('returns null for very long digit string', () => {
    expect(parseBarcodeFormat('12345678901234567890')).toBeNull();
  });
});
