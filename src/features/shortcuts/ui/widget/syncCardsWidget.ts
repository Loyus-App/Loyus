import CardsWidget from './CardsWidget';
import type { CardsWidgetProps } from './types';

let lastSnapshot: string | undefined;

export function syncCardsWidget(props: CardsWidgetProps): void {
  if (!CardsWidget) return;
  const snapshot = JSON.stringify(props);
  if (snapshot === lastSnapshot) return;
  try {
    CardsWidget.updateSnapshot(props);
    lastSnapshot = snapshot;
  } catch {
    lastSnapshot = undefined;
  }
}
