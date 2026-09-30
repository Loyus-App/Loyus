import { useCallback, useEffect, useState } from 'react';
import type { CameraDevice } from 'react-native-vision-camera';

interface UseTorchResult {
  torchEnabled: boolean;
  toggleTorch: () => void;
  hasTorch: boolean;
}

export function useTorch(device: CameraDevice | undefined): UseTorchResult {
  const hasTorch = device?.hasTorch ?? false;
  const [torchEnabled, setTorchEnabled] = useState(false);

  const toggleTorch = useCallback(() => {
    if (!hasTorch) return;
    setTorchEnabled((prev) => !prev);
  }, [hasTorch]);

  useEffect(() => {
    if (!hasTorch) {
      setTorchEnabled(false);
    }
  }, [hasTorch]);

  return { torchEnabled, toggleTorch, hasTorch };
}
