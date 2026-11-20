import { AppState } from 'react-native';

export function onReturnFromBackground(listener: () => void): () => void {
  let previous: string | null | undefined = AppState.currentState;
  const subscription = AppState.addEventListener('change', (next) => {
    if (previous === 'background' && next === 'active') listener();
    previous = next;
  });
  return () => subscription.remove();
}
