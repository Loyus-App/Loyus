import { type NativeModule, requireOptionalNativeModule } from 'expo';

type WindowCrossfadeModule = NativeModule & {
  cover(): Promise<void>;
  reveal(durationMs: number): Promise<void>;
};

export default requireOptionalNativeModule<WindowCrossfadeModule>('WindowCrossfade');
