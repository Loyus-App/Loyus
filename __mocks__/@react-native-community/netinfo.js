const defaultState = {
  type: 'wifi',
  isConnected: true,
  isInternetReachable: true,
  details: null,
};

const NetInfo = {
  fetch: jest.fn(() => Promise.resolve(defaultState)),
  addEventListener: jest.fn(() => jest.fn()),
  useNetInfo: jest.fn(() => defaultState),
};

module.exports = NetInfo;
module.exports.default = NetInfo;
