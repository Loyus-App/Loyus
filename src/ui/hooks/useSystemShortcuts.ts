import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState } from 'react-native';
import type { Card } from '@/domain/card';
import { onCardShortcut, syncCardShortcuts } from '@/infra/shortcuts/quickActions';
import { useCardStore } from '@/state/stores/cardStore';
import { buildCardsWidgetProps } from '@/widgets/buildCardsWidgetProps';
import { syncCardsWidget } from '@/widgets/syncCardsWidget';
import type { CardsWidgetStrings } from '@/widgets/types';

const SYNC_DELAY_MS = 800;

function openCard(id: string): void {
  setTimeout(() => router.navigate({ pathname: '/card/[id]', params: { id } }), 0);
}

function currentCards(): Card[] {
  return Object.values(useCardStore.getState().cards);
}

export function useSystemShortcuts(): void {
  const { t } = useTranslation();

  useEffect(() => onCardShortcut(openCard), []);

  useEffect(() => {
    const strings: CardsWidgetStrings = {
      emptyTitle: t('widgets.emptyTitle'),
      emptyBody: t('widgets.emptyBody'),
      ownerLine: (owner, format) => t('checkout.ownerLine', { owner, format }),
    };
    const sync = (): void => {
      const cards = currentCards();
      syncCardShortcuts(cards);
      syncCardsWidget(buildCardsWidgetProps(cards, strings));
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (): void => {
      clearTimeout(timer);
      timer = setTimeout(sync, SYNC_DELAY_MS);
    };

    sync();
    const unsubscribe = useCardStore.subscribe((state, previous) => {
      if (state.cards !== previous.cards) schedule();
    });
    const appState = AppState.addEventListener('change', (status) => {
      if (status === 'active') sync();
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
      appState.remove();
    };
  }, [t]);
}
