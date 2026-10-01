import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { onReturnFromBackground } from '@/ui/utils/foreground';

function startOfToday(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

export function useToday(): number {
  const [today, setToday] = useState(startOfToday);
  useFocusEffect(
    useCallback(() => {
      setToday(startOfToday());
      return onReturnFromBackground(() => setToday(startOfToday()));
    }, []),
  );
  return today;
}
