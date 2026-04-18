import type React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';

jest.mock('../../../infra/i18n', () => ({
  i18n: { t: (key: string) => key },
}));

import { ErrorBoundary } from '../ErrorBoundary';

// react-test-renderer 19.x ships no TS declarations; describe only what we use.
interface TestInstance {
  readonly props: { readonly children?: unknown };
  findByType(type: unknown): TestInstance;
  findAllByType(type: unknown): readonly TestInstance[];
}
interface RendererWithRoot extends TestRenderer.ReactTestRenderer {
  readonly root: TestInstance;
}
const withRoot = (r: TestRenderer.ReactTestRenderer): RendererWithRoot => r as RendererWithRoot;

const OK_TEXT = 'ok';
const CUSTOM_FALLBACK = 'custom-fallback';
const BOMB_MESSAGE = 'kaboom';

function Bomb({ explode }: { explode: boolean }): React.JSX.Element {
  if (explode) throw new Error(BOMB_MESSAGE);
  return <Text>{OK_TEXT}</Text>;
}

describe('ErrorBoundary (STOR-06: crash-free sessions)', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('getDerivedStateFromError flips hasError and captures the error', () => {
    const err = new Error('boom');
    expect(ErrorBoundary.getDerivedStateFromError(err)).toEqual({ hasError: true, error: err });
  });

  it('renders children when no error is thrown', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => {
      tree = TestRenderer.create(
        <ErrorBoundary>
          <Bomb explode={false} />
        </ErrorBoundary>,
      );
    });
    expect(withRoot(tree).root.findByType(Text).props.children).toBe(OK_TEXT);
    act(() => tree.unmount());
  });

  it('renders a fallback UI instead of crashing when a child throws', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => {
      tree = TestRenderer.create(
        <ErrorBoundary>
          <Bomb explode={true} />
        </ErrorBoundary>,
      );
    });
    const texts = withRoot(tree)
      .root.findAllByType(Text)
      .map((n) => n.props.children);
    expect(texts).toContain('error.title');
    expect(texts).toContain(BOMB_MESSAGE);
    expect(texts).toContain('error.tryAgain');
    act(() => tree.unmount());
  });

  it('uses custom fallback when provided', () => {
    let tree!: TestRenderer.ReactTestRenderer;
    act(() => {
      tree = TestRenderer.create(
        <ErrorBoundary fallback={<Text>{CUSTOM_FALLBACK}</Text>}>
          <Bomb explode={true} />
        </ErrorBoundary>,
      );
    });
    expect(withRoot(tree).root.findByType(Text).props.children).toBe(CUSTOM_FALLBACK);
    act(() => tree.unmount());
  });
});
