import WindowCrossfade from './src/WindowCrossfadeModule';

export const isAvailable = WindowCrossfade !== null;

export function cover(): Promise<void> {
  return WindowCrossfade ? WindowCrossfade.cover() : Promise.resolve();
}

export function reveal(durationMs: number): Promise<void> {
  return WindowCrossfade ? WindowCrossfade.reveal(durationMs) : Promise.resolve();
}
