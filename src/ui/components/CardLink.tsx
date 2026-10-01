import type { ReactElement } from 'react';
import type { Card } from '@/domain/card';
import { openCard, showCardActions } from '../utils/cardActions';

export type CardPressHandlers = {
  readonly onPress: () => void;
  readonly onLongPress: (() => void) | undefined;
};

export type CardLinkProps = {
  readonly card: Card;
  readonly width: number;
  readonly children: (handlers: CardPressHandlers) => ReactElement;
};

export function CardLink({ card, children }: CardLinkProps): ReactElement {
  return children({ onPress: () => openCard(card), onLongPress: () => showCardActions(card) });
}
