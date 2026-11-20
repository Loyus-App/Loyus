import TestRenderer, { act } from 'react-test-renderer';
import { ErrorBoundary } from '../ErrorBoundary';

interface TestInstance {
  readonly props: { readonly accessibilityRole?: string; readonly onPress?: () => void };
  find(predicate: (node: TestInstance) => boolean): TestInstance;
}

describe('route ErrorBoundary', () => {
  it('offers a retry that re-runs the route', () => {
    const retry = jest.fn(() => Promise.resolve());
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => {
      tree = TestRenderer.create(<ErrorBoundary error={new Error('boom')} retry={retry} />);
    });

    const root = (tree as unknown as { root: TestInstance }).root;
    act(() => {
      root
        .find((node) => node.props.accessibilityRole === 'button' && Boolean(node.props.onPress))
        .props.onPress?.();
    });

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
