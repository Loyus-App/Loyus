// Manual mock for @react-native-community/netinfo (native module)
// Prevents Jest tests from crashing on native module import

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
