import type { ScannedObjectType } from 'react-native-vision-camera';
import type {
  BarcodeFormat as MlKitBarcodeFormat,
  TargetBarcodeFormat,
} from 'react-native-vision-camera-barcode-scanner';
import { BarcodeFormat } from '../../domain/card';

export const IOS_TYPE_TO_FORMAT: Partial<Record<ScannedObjectType, BarcodeFormat>> = {
  'ean-13': BarcodeFormat.EAN13,
  'ean-8': BarcodeFormat.EAN8,
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

export const IOS_SCAN_TYPES = Object.keys(IOS_TYPE_TO_FORMAT) as ScannedObjectType[];

export const ANDROID_FORMAT_TO_FORMAT: Partial<Record<MlKitBarcodeFormat, BarcodeFormat>> = {
  'ean-13': BarcodeFormat.EAN13,
  'ean-8': BarcodeFormat.EAN8,
  'upc-a': BarcodeFormat.UPC_A,
  'upc-e': BarcodeFormat.UPC_E,
  'code-128': BarcodeFormat.CODE128,
  'code-39': BarcodeFormat.CODE39,
  'qr-code': BarcodeFormat.QR_CODE,
  'pdf-417': BarcodeFormat.PDF417,
  'data-matrix': BarcodeFormat.DATA_MATRIX,
  aztec: BarcodeFormat.AZTEC,
  codabar: BarcodeFormat.CODABAR,
  itf: BarcodeFormat.ITF14,
} as const;

export const ANDROID_SCAN_FORMATS = Object.keys(ANDROID_FORMAT_TO_FORMAT) as TargetBarcodeFormat[];
