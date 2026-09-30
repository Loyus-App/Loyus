import ImageBarcodeScanner, { type NativeImageBarcode } from './src/ImageBarcodeScannerModule';

export type { NativeImageBarcode } from './src/ImageBarcodeScannerModule';

export const isAvailable = ImageBarcodeScanner !== null;

export function scanImage(uri: string): Promise<NativeImageBarcode[]> {
  if (!ImageBarcodeScanner) {
    return Promise.reject(new Error('ImageBarcodeScanner native module is not linked'));
  }
  return ImageBarcodeScanner.scanImage(uri);
}
