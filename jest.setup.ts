import 'react-native-unistyles/mocks';
import './src/ui/theme/unistyles';

jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
jest.mock('react-native-reanimated/src/initializers', () => ({
  initializeReanimatedModule: jest.fn(),
}));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
