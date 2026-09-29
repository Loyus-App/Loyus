import { BarcodeFormat } from './card';

export interface BarcodeValidationResult {
  readonly valid: boolean;
  readonly error?: string | undefined;
}

const VALID: BarcodeValidationResult = { valid: true };

function invalid(error: string): BarcodeValidationResult {
  return { valid: false, error };
}

const RE_DIGITS_12_13 = /^\d{12,13}$/;
const RE_DIGITS_7_8 = /^\d{7,8}$/;
const RE_DIGITS_11_12 = /^\d{11,12}$/;
const RE_DIGITS_6_8 = /^\d{6,8}$/;
const RE_CODE39 = /^[0-9A-Z\-. $/+%]+$/;
const RE_DIGITS_13_14 = /^\d{13,14}$/;
const RE_DIGIT_PAIRS = /^(\d{2})+$/;
const RE_PRINTABLE_ASCII = /^[\x20-\x7e]+$/;
const RE_CODABAR = /^[0-9\-$:/.+]+$/;
const RE_DIGITS_ONLY = /^\d+$/;
const RE_DIGITS_1_6 = /^\d{1,6}$/;

function computeCheckDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = Number(digits[i]);
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
  if (!isAsciiOnly(code)) return invalid('CODE39 must contain only ASCII characters');
  return VALID;
}

const RE_FULL_ASCII_SAME = /^[0-9A-Z. -]$/;

const FULL_ASCII_SINGLES: Readonly<Record<number, string>> = {
  0: '%U',
  47: '/O',
  58: '/Z',
  64: '%V',
  96: '%W',
};

const FULL_ASCII_RANGES = [
  { from: 1, to: 26, shift: '$', first: 'A' },
  { from: 27, to: 31, shift: '%', first: 'A' },
  { from: 33, to: 44, shift: '/', first: 'A' },
  { from: 59, to: 63, shift: '%', first: 'F' },
  { from: 91, to: 95, shift: '%', first: 'K' },
  { from: 97, to: 122, shift: '+', first: 'A' },
  { from: 123, to: 127, shift: '%', first: 'P' },
] as const;

function fullAsciiPair(char: string): string {
  if (RE_FULL_ASCII_SAME.test(char)) return char;
  const code = char.charCodeAt(0);
  const single = FULL_ASCII_SINGLES[code];
  if (single) return single;
  const range = FULL_ASCII_RANGES.find(({ from, to }) => code >= from && code <= to);
  if (!range) return char;
  return `${range.shift}${String.fromCharCode(range.first.charCodeAt(0) + code - range.from)}`;
}

export function code39Symbols(code: string): string {
  if (RE_CODE39.test(code)) return code;
  return [...code].map(fullAsciiPair).join('');
}

function validateItf14(code: string): BarcodeValidationResult {
  if (!RE_DIGITS_13_14.test(code)) return invalid('ITF-14 must be 13 or 14 digits');
  return verifyCheckDigit(code, 14);
}

function validateItf(code: string): BarcodeValidationResult {
  if (!RE_DIGIT_PAIRS.test(code)) return invalid('ITF must be an even number of digits');
  return VALID;
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
  if (!RE_PRINTABLE_ASCII.test(code)) {
    return invalid('GS1 DataBar must contain only printable ASCII characters');
  }
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
  [BarcodeFormat.ITF]: validateItf,
  [BarcodeFormat.CODABAR]: validateCodabar,
  [BarcodeFormat.MSI]: validateMsi,
  [BarcodeFormat.PHARMACODE]: validatePharmacode,
  [BarcodeFormat.QR_CODE]: validateNonEmpty('QR code'),
  [BarcodeFormat.DATA_MATRIX]: validateNonEmpty('Data Matrix'),
  [BarcodeFormat.PDF417]: validateNonEmpty('PDF417'),
  [BarcodeFormat.AZTEC]: validateNonEmpty('Aztec'),
  [BarcodeFormat.GS1_DATABAR]: validateGs1Databar,
};

export function validateBarcode(code: string, format: BarcodeFormat): BarcodeValidationResult {
  return VALIDATORS[format](code);
}
