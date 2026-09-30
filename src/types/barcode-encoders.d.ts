declare module 'jsbarcode/bin/barcodes' {
  interface Encoding {
    readonly data: string;
  }

  interface Encoder {
    valid(): boolean;
    encode(): Encoding | readonly Encoding[];
  }

  type EncoderClass = new (data: string, options: Readonly<Record<string, unknown>>) => Encoder;

  const barcodes: Readonly<Record<string, EncoderClass | undefined>>;
  export default barcodes;
}

declare module 'qrcode' {
  interface BitMatrix {
    readonly size: number;
    readonly data: Uint8Array;
  }

  interface QRCode {
    readonly modules: BitMatrix;
  }

  interface CreateOptions {
    readonly errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  }

  export function create(text: string, options?: CreateOptions): QRCode;
}
