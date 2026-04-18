/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^react-native-unistyles$': '<rootDir>/__mocks__/react-native-unistyles.js',
    '^react-native-nitro-modules$':
      '<rootDir>/__mocks__/react-native-nitro-modules.js',
    '^react-native-mmkv$': '<rootDir>/__mocks__/react-native-mmkv.js',
    '^expo-crypto$': '<rootDir>/__mocks__/expo-crypto.js',
    '^@react-native-community/netinfo$':
      '<rootDir>/__mocks__/@react-native-community/netinfo.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    'src/domain/**/*.ts': {
      lines: 80,
      branches: 70,
      functions: 80,
      statements: 80,
    },
  },
  snapshotSerializers: [],
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm/[^/]+/node_modules/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|react-native-svg))',
  ],
};

module.exports = config;
