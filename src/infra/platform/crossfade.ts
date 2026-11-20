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

export async function crossfadeWindow(apply: () => void, durationMs: number): Promise<void> {
  if (!isAvailable) {
    apply();
    return;
  }
  latest += 1;
  const id = latest;
  await cover().catch(() => undefined);
  try {
    apply();
    await settled();
  } finally {
    if (id === latest) await reveal(durationMs);
  }
}
