import { type Card, cardInitials, FORMAT_LABEL } from '@/domain/card';
import { pickWidgetCards } from '@/infra/shortcuts/pickCards';
import { cardColorOf, textOnCard } from '@/ui/theme/cardColors';
import { darkTheme, lightTheme } from '@/ui/theme/themes';
import type { CardsWidgetCard, CardsWidgetProps, CardsWidgetStrings } from './types';

export const APP_HOME_URL = 'loyus:///';

export function cardDeepLink(id: string): string {
  return `${APP_HOME_URL}card/${encodeURIComponent(id)}`;
}

function toWidgetCard(card: Card, strings: CardsWidgetStrings): CardsWidgetCard {
  const fill = cardColorOf(card);
  const format = FORMAT_LABEL[card.format];
  return {
    id: card.id,
    name: card.name,
    initials: cardInitials(card.name),
    subtitle: card.owner ?? format,
    detail: card.owner ? strings.ownerLine(card.owner, format) : format,
    fill,
    ink: textOnCard(fill),
    url: cardDeepLink(card.id),
  };
}

export function buildCardsWidgetProps(
  cards: readonly Card[],
  strings: CardsWidgetStrings,
): CardsWidgetProps {
  return {
    cards: pickWidgetCards(cards).map((card) => toWidgetCard(card, strings)),
    emptyTitle: strings.emptyTitle,
    emptyBody: strings.emptyBody,
    homeUrl: APP_HOME_URL,
    surfaceLight: lightTheme.colors.surface,
    surfaceDark: darkTheme.colors.surface,
  };
}
