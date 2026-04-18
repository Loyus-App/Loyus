declare module 'react-test-renderer' {
  import type { ReactElement } from 'react';

  interface ReactTestRenderer {
    update(element: ReactElement): void;
    unmount(): void;
    toJSON(): unknown;
  }

  function create(element: ReactElement): ReactTestRenderer;
  function act(callback: () => void | Promise<void>): void;
}
