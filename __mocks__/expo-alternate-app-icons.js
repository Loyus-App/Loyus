module.exports = {
  supportsAlternateIcons: true,
  getAppIconName: jest.fn(() => null),
  setAlternateAppIcon: jest.fn((name) => Promise.resolve(name)),
};
