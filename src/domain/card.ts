declare const CardIdBrand: unique symbol;

export type CardId = string & { readonly [CardIdBrand]: typeof CardIdBrand };

export enum BarcodeFormat {
  CODE128 = 'CODE128',
  CODE39 = 'CODE39',
  EAN13 = 'EAN13',
  EAN8 = 'EAN8',
  UPC_A = 'UPC_A',
  UPC_E = 'UPC_E',
  ITF14 = 'ITF14',
  CODABAR = 'CODABAR',
  MSI = 'MSI',
  PHARMACODE = 'PHARMACODE',
  QR_CODE = 'QR_CODE',
  DATA_MATRIX = 'DATA_MATRIX',
  PDF417 = 'PDF417',
  AZTEC = 'AZTEC',
  GS1_DATABAR = 'GS1_DATABAR',
}

/** JsBarcode format names; casing matters ('codabar', 'pharmacode' are lowercase). */
export const JSBARCODE_FORMAT: Record<BarcodeFormat, string> = {
  [BarcodeFormat.CODE128]: 'CODE128',
  [BarcodeFormat.CODE39]: 'CODE39',
  [BarcodeFormat.EAN13]: 'EAN13',
  [BarcodeFormat.EAN8]: 'EAN8',
  [BarcodeFormat.UPC_A]: 'UPC',
  [BarcodeFormat.UPC_E]: 'UPCE',
  [BarcodeFormat.ITF14]: 'ITF14',
  [BarcodeFormat.CODABAR]: 'codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'pharmacode',
  [BarcodeFormat.QR_CODE]: 'QR_CODE',
  [BarcodeFormat.DATA_MATRIX]: 'DATA_MATRIX',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'AZTEC',
  [BarcodeFormat.GS1_DATABAR]: 'GS1_DATABAR',
};

export interface Card {
  readonly id: CardId;
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
  readonly color?: string | undefined;
  readonly note?: string | undefined;
  readonly isFavorite: boolean;
  readonly barcodeRotated?: boolean | undefined;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface CreateCardInput {
  readonly id: CardId;
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
  readonly color?: string | undefined;
  readonly note?: string | undefined;
}

export function createCard(input: CreateCardInput): Card {
  const now = Date.now();
  return {
    id: input.id,
    name: input.name,
    code: input.code,
    format: input.format,
    ...(input.color === undefined ? {} : { color: input.color }),
    ...(input.note === undefined ? {} : { note: input.note }),
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
  };
}
