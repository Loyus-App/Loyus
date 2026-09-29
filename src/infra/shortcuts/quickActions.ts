import * as QuickActions from 'expo-quick-actions';
import { AppState, Platform } from 'react-native';
import { type Card, FORMAT_LABEL } from '@/domain/card';
import { pickShortcutCards } from './pickCards';

export type CardShortcut = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
  readonly params: { readonly cardId: string };
};

type ShortcutPlatform = 'ios' | 'android';

const ICONS: Record<ShortcutPlatform, string> = {
  ios: 'symbol:creditcard',
  android: 'ic_launcher',
};

let lastSignature: string | undefined;
let initialHandled = false;

function currentPlatform(): ShortcutPlatform {
  return Platform.OS === 'android' ? 'android' : 'ios';
}

function titleOf(card: Card, platform: ShortcutPlatform): string {
  if (platform === 'android' && card.owner) return `${card.name} · ${card.owner}`;
  return card.name;
}

export function buildCardShortcuts(
  cards: readonly Card[],
  platform: ShortcutPlatform = currentPlatform(),
): CardShortcut[] {
  return pickShortcutCards(cards).map((card) => ({
    id: card.id,
    title: titleOf(card, platform),
    subtitle: card.owner ?? FORMAT_LABEL[card.format],
    icon: ICONS[platform],
    params: { cardId: card.id },
  }));
}

export function syncCardShortcuts(cards: readonly Card[]): void {
  if (AppState.currentState === 'background') return;
  const shortcuts = buildCardShortcuts(cards);
  const signature = JSON.stringify(shortcuts);
  if (signature === lastSignature) return;
  lastSignature = signature;
  QuickActions.setItems(shortcuts).catch(() => {
    lastSignature = undefined;
  });
}

function cardIdOf(action: QuickActions.Action): string | undefined {
  const cardId = action.params?.cardId;
  return typeof cardId === 'string' && cardId.length > 0 ? cardId : undefined;
}

export function onCardShortcut(open: (cardId: string) => void): () => void {
  const handle = (action: QuickActions.Action): void => {
    const cardId = cardIdOf(action);
    if (cardId) open(cardId);
  };
  if (QuickActions.initial && !initialHandled) {
    initialHandled = true;
    handle(QuickActions.initial);
  }
  const subscription = QuickActions.addListener(handle);
  return () => subscription.remove();
}
