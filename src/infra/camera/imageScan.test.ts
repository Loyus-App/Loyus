import { BarcodeFormat } from '../../domain/card';

const mockScanImage = jest.fn();

jest.mock('../../../modules/image-barcode-scanner', () => ({
  isAvailable: true,
  scanImage: (uri: string) => mockScanImage(uri),
}));

import { isImageScanAvailable, scanImage, toImageBarcodes } from './imageScan';

describe('toImageBarcodes', () => {
  it('keeps known formats as domain values', () => {
    expect(
      toImageBarcodes([
        { value: '4006381333931', format: 'EAN13' },
        { value: 'https://example.com', format: 'QR_CODE' },
      ]),
    ).toEqual([
      { value: '4006381333931', format: BarcodeFormat.EAN13 },
      { value: 'https://example.com', format: BarcodeFormat.QR_CODE },
    ]);
  });

  it('drops unknown formats, blank values and duplicates', () => {
    expect(
      toImageBarcodes([
        { value: '123', format: 'CODE93' },
        { value: '  ', format: 'CODE128' },
        { value: ' 42 ', format: 'CODE128' },
        { value: '42', format: 'CODE39' },
      ]),
    ).toEqual([{ value: '42', format: BarcodeFormat.CODE128 }]);
  });
});

describe('scanImage', () => {
  beforeEach(() => mockScanImage.mockReset());

  it('reads the image through the native module', async () => {
    mockScanImage.mockResolvedValue([{ value: '12345670', format: 'EAN8' }]);
    await expect(scanImage('file:///shot.png')).resolves.toEqual([
      { value: '12345670', format: BarcodeFormat.EAN8 },
    ]);
    expect(mockScanImage).toHaveBeenCalledWith('file:///shot.png');
  });

  it('resolves empty when nothing is found', async () => {
    mockScanImage.mockResolvedValue([]);
    await expect(scanImage('file:///blank.png')).resolves.toEqual([]);
  });

  it('passes native failures on', async () => {
    mockScanImage.mockRejectedValue(new Error('unreadable'));
    await expect(scanImage('file:///broken.png')).rejects.toThrow('unreadable');
  });

  it('reports availability from the native module', () => {
    expect(isImageScanAvailable).toBe(true);
  });
});
