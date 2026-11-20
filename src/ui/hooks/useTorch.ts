import { useCallback, useState } from 'react';
import type { CameraDevice } from 'react-native-vision-camera';

interface UseTorchResult {
  torchEnabled: boolean;
  toggleTorch: () => void;
  hasTorch: boolean;
}

export function useTorch(device: CameraDevice | undefined): UseTorchResult {
  const hasTorch = device?.hasTorch ?? false;
  const [torchOn, setTorchOn] = useState(false);

  const toggleTorch = useCallback(() => {
    if (hasTorch) setTorchOn((prev) => !prev);
  }, [hasTorch]);

  return { torchEnabled: hasTorch && torchOn, toggleTorch, hasTorch };
}
