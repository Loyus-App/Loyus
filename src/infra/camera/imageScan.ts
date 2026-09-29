import {
  isAvailable,
  type NativeImageBarcode,
  scanImage as scanNativeImage,
} from '../../../modules/image-barcode-scanner';
import { BarcodeFormat } from '../../domain/card';

export type ImageBarcode = {
  readonly value: string;
  readonly format: BarcodeFormat;
};

const FORMATS: ReadonlySet<string> = new Set(Object.values(BarcodeFormat));

function isBarcodeFormat(format: string): format is BarcodeFormat {
  return FORMATS.has(format);
}

export function toImageBarcodes(found: readonly NativeImageBarcode[]): ImageBarcode[] {
  const seen = new Set<string>();
  const barcodes: ImageBarcode[] = [];
  for (const { value, format } of found) {
    const code = value.trim();
    if (!(code && isBarcodeFormat(format)) || seen.has(code)) continue;
    seen.add(code);
    barcodes.push({ value: code, format });
  }
  return barcodes;
}

export const isImageScanAvailable = isAvailable;

export async function scanImage(uri: string): Promise<ImageBarcode[]> {
  return toImageBarcodes(await scanNativeImage(uri));
}
