import { cover, isAvailable, reveal } from '../../../modules/window-crossfade';

const SETTLE_TIMEOUT_MS = 1000;

let latest = 0;

function settled(): Promise<void> {
  return new Promise((resolve) => {
    requestIdleCallback(() => requestAnimationFrame(() => resolve()), {
      timeout: SETTLE_TIMEOUT_MS,
    });
  });
}

export function crossfadeWindow(apply: () => void, durationMs: number): Promise<void> {
  if (!isAvailable) {
    apply();
    return Promise.resolve();
  }
  latest += 1;
  const id = latest;
  return cover()
    .catch(() => undefined)
    .then(apply)
    .then(settled)
    .finally(() => (id === latest ? reveal(durationMs) : undefined));
}
