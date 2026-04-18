// Manual mock for react-native-nitro-modules native bridge
// Prevents NitroModules crash in Jest environment

module.exports = {
  NitroModules: {
    createHybridObject: () => ({
      init: () => {},
      add: () => {},
    }),
  },
};
