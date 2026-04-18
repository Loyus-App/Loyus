// VisionCamera CodeType <-> domain BarcodeFormat mapping — zero react-native runtime imports

import type { CodeType } from 'react-native-vision-camera';
import { BarcodeFormat } from '../../domain/card';

/** VisionCamera CodeType -> domain BarcodeFormat (direct mapping, no fallbacks). */
export const CODE_TYPE_TO_FORMAT: Partial<Record<CodeType, BarcodeFormat>> = {
  'ean-13': BarcodeFormat.EAN13,
  'ean-8': BarcodeFormat.EAN8,
  'upc-a': BarcodeFormat.UPC_A,
  'upc-e': BarcodeFormat.UPC_E,
  'code-128': BarcodeFormat.CODE128,
  'code-39': BarcodeFormat.CODE39,
  qr: BarcodeFormat.QR_CODE,
  'pdf-417': BarcodeFormat.PDF417,
  'data-matrix': BarcodeFormat.DATA_MATRIX,
  aztec: BarcodeFormat.AZTEC,
  codabar: BarcodeFormat.CODABAR,
  'itf-14': BarcodeFormat.ITF14,
  'gs1-data-bar': BarcodeFormat.GS1_DATABAR,
} as const;

/** All VisionCamera CodeType values to pass to useCodeScanner codeTypes. */
export const SCAN_CODE_TYPES: CodeType[] = [
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
