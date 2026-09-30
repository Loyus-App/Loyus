import { type NativeModule, requireOptionalNativeModule } from 'expo';

export type NativeImageBarcode = {
  readonly value: string;
  readonly format: string;
};

type ImageBarcodeScannerModule = NativeModule & {
  scanImage(uri: string): Promise<NativeImageBarcode[]>;
};

export default requireOptionalNativeModule<ImageBarcodeScannerModule>('ImageBarcodeScanner');
