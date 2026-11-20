import { router } from 'expo-router';
import { useCardStore } from '@/entities/card/state/cardStore';
import { haptics } from '@/shared/platform/haptics';
import type { CardFormValues } from './useCardForm';

export function saveNewCard(values: CardFormValues): void {
  useCardStore.getState().addCard(values);
  haptics.success();
  router.dismissTo('/');
}
