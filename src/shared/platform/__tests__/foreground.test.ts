import { AppState, type AppStateStatus } from 'react-native';
import { onReturnFromBackground } from '../foreground';

let emit: (state: AppStateStatus) => void = () => undefined;
const remove = jest.fn();

beforeEach(() => {
  remove.mockClear();
  jest.spyOn(AppState, 'addEventListener').mockImplementation((_, handler) => {
    emit = handler as (state: AppStateStatus) => void;
    return { remove };
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('onReturnFromBackground', () => {
  it('fires when the app comes back from the background', () => {
    const listener = jest.fn();
    onReturnFromBackground(listener);
    emit('background');
    emit('active');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('ignores a system alert that only makes the app inactive', () => {
    const listener = jest.fn();
    onReturnFromBackground(listener);
    emit('inactive');
    emit('active');
    expect(listener).not.toHaveBeenCalled();
  });

  it('stops listening when unsubscribed', () => {
    onReturnFromBackground(jest.fn())();
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
