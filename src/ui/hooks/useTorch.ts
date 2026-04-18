import { useCallback, useEffect, useState } from 'react';
import type { CameraDevice } from 'react-native-vision-camera';

interface UseTorchResult {
  torchEnabled: boolean;
  toggleTorch: () => void;
  hasTorch: boolean;
}

/**
 * Torch state management with device.hasTorch guard.
 *
 * Resets torchEnabled when device changes to one without torch.
 * toggleTorch is a no-op when device has no torch.
 */
export function useTorch(device: CameraDevice | undefined): UseTorchResult {
  const hasTorch = device?.hasTorch ?? false;
  const [torchEnabled, setTorchEnabled] = useState(false);

  const toggleTorch = useCallback(() => {
    if (!hasTorch) return;
    setTorchEnabled((prev) => !prev);
  }, [hasTorch]);

  // Reset torch when device changes to one without torch
  useEffect(() => {
    if (!hasTorch) {
      setTorchEnabled(false);
    }
  }, [hasTorch]);

  return { torchEnabled, toggleTorch, hasTorch };
}
