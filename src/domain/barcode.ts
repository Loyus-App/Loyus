// Barcode validation and format parsing — zero react-native / expo imports

import { BarcodeFormat } from './card';

export interface BarcodeValidationResult {
  readonly valid: boolean;
  readonly error?: string | undefined;
}

const VALID: BarcodeValidationResult = { valid: true };

function invalid(error: string): BarcodeValidationResult {
  return { valid: false, error };
}

// --- top-level regex constants ---
const RE_DIGITS_12_13 = /^\d{12,13}$/;
const RE_DIGITS_7_8 = /^\d{7,8}$/;
const RE_DIGITS_11_12 = /^\d{11,12}$/;
const RE_DIGITS_6_8 = /^\d{6,8}$/;
const RE_CODE39 = /^[0-9A-Z\-.$/+%\s]+$/;
const RE_DIGITS_13_14 = /^\d{13,14}$/;
const RE_CODABAR = /^[0-9\-$:/.+]+$/;
const RE_DIGITS_ONLY = /^\d+$/;
const RE_DIGITS_1_6 = /^\d{1,6}$/;

/**
 * Computes the EAN/UPC mod-10 check digit for a digit string.
 * Works for EAN-13 (12 digits), EAN-8 (7 digits), UPC-A (11 digits), ITF-14 (13 digits).
 */
function computeCheckDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = Number(digits[i]);
    // From rightmost digit: weight 3, then alternating 1, 3, 1, 3...
    const indexFromRight = digits.length - 1 - i;
    const weight = indexFromRight % 2 === 0 ? 3 : 1;
    sum += digit * weight;
  }
  return (10 - (sum % 10)) % 10;
}

function verifyCheckDigit(code: string, expectedLength: number): BarcodeValidationResult {
  if (code.length !== expectedLength) return VALID;
  const payload = code.slice(0, -1);
  const expected = computeCheckDigit(payload);
  const actual = Number(code[code.length - 1]);
  if (actual !== expected) {
    return invalid(`Invalid check digit: expected ${expected}, got ${actual}`);
  }
  return VALID;
}

function isAsciiOnly(str: string): boolean {
  return [...str].every((c) => c.charCodeAt(0) <= 127);
}

// --- per-format validators ---
function validateEan13(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_12_13.test(code)) return invalid('EAN-13 must be 12 or 13 digits');
  return verifyCheckDigit(code, 13);
}

function validateEan8(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_7_8.test(code)) return invalid('EAN-8 must be 7 or 8 digits');
  return verifyCheckDigit(code, 8);
}

function validateUpcA(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_11_12.test(code)) return invalid('UPC-A must be 11 or 12 digits');
  return verifyCheckDigit(code, 12);
}

function validateUpcE(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_6_8.test(code)) return invalid('UPC-E must be 6, 7, or 8 digits');
  return VALID;
}

function validateCode128(code: string): BarcodeValidationResult {
  if (code.length === 0) return invalid('CODE128 must not be empty');
  if (!isAsciiOnly(code)) return invalid('CODE128 must contain only ASCII characters');
  return VALID;
}

function validateCode39(code: string): BarcodeValidationResult {
  if (code.length === 0) return invalid('CODE39 must not be empty');
  if (!RE_CODE39.test(code)) {
    return invalid('CODE39 must contain only uppercase letters, digits, and - . $ / + % space');
  }
  return VALID;
}

function validateItf14(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_13_14.test(code)) return invalid('ITF-14 must be 13 or 14 digits');
  return verifyCheckDigit(code, 14);
}

function validateCodabar(code: string): BarcodeValidationResult {
  if (code.length === 0) return invalid('CODABAR must not be empty');
  if (!RE_CODABAR.test(code)) return invalid('CODABAR must contain only digits and - $ : / . +');
  return VALID;
}

function validateMsi(code: string): BarcodeValidationResult {
  if (code.length === 0) return invalid('MSI must not be empty');
  if (!RE_DIGITS_ONLY.test(code)) return invalid('MSI must contain only digits');
  return VALID;
}

function validatePharmacode(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_1_6.test(code)) return invalid('PHARMACODE must be 1-6 digits');
  const value = Number.parseInt(code, 10);
  if (value < 3 || value > 131_070) {
    return invalid('PHARMACODE value must be between 3 and 131070');
  }
  return VALID;
}

function validateNonEmpty(label: string): (code: string) => BarcodeValidationResult {
  return (code: string) => {
    if (code.length === 0) return invalid(`${label} must not be empty`);
    return VALID;
  };
}

function validateGs1Databar(code: string): BarcodeValidationResult {
  if (code.length === 0) return invalid('GS1 DataBar must not be empty');
  if (!RE_DIGITS_ONLY.test(code)) return invalid('GS1 DataBar must contain only digits');
  return VALID;
}

type Validator = (code: string) => BarcodeValidationResult;

const VALIDATORS: Record<BarcodeFormat, Validator> = {
  [BarcodeFormat.EAN13]: validateEan13,
  [BarcodeFormat.EAN8]: validateEan8,
  [BarcodeFormat.UPC_A]: validateUpcA,
  [BarcodeFormat.UPC_E]: validateUpcE,
  [BarcodeFormat.CODE128]: validateCode128,
  [BarcodeFormat.CODE39]: validateCode39,
  [BarcodeFormat.ITF14]: validateItf14,
  [BarcodeFormat.CODABAR]: validateCodabar,
  [BarcodeFormat.MSI]: validateMsi,
  [BarcodeFormat.PHARMACODE]: validatePharmacode,
  [BarcodeFormat.QR_CODE]: validateNonEmpty('QR code'),
  [BarcodeFormat.DATA_MATRIX]: validateNonEmpty('Data Matrix'),
  [BarcodeFormat.PDF417]: validateNonEmpty('PDF417'),
  [BarcodeFormat.AZTEC]: validateNonEmpty('Aztec'),
  [BarcodeFormat.GS1_DATABAR]: validateGs1Databar,
};

/** Validates a barcode string against its format rules. */
export function validateBarcode(code: string, format: BarcodeFormat): BarcodeValidationResult {
  return VALIDATORS[format](code);
}

/**
 * Best-effort heuristic to detect barcode format from a raw code string.
 * Returns null if format cannot be determined.
 */
export function parseBarcodeFormat(code: string): BarcodeFormat | null {
  if (code.length === 0) return null;
  if (!RE_DIGITS_ONLY.test(code)) return null;
  if (code.length === 8 && code.startsWith('0')) return BarcodeFormat.UPC_E;
  if (code.length === 12 || code.length === 13) return BarcodeFormat.EAN13;
  if (code.length === 7 || code.length === 8) return BarcodeFormat.EAN8;
  return null;
}
