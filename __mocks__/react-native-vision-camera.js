module.exports = {
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => undefined),
  useCameraPermission: jest.fn(() => ({
    status: 'not-determined',
    hasPermission: false,
    canRequestPermission: true,
    requestPermission: jest.fn(),
  })),
  useObjectOutput: jest.fn(() => ({})),
  isScannedCode: jest.fn((object) => 'value' in object),
};
