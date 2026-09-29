import { makeCard } from '@/testing/makeCard';
import { cardColorOf, textOnCard } from '@/ui/theme/cardColors';
import { darkTheme, lightTheme } from '@/ui/theme/themes';
import { buildCardsWidgetProps, cardDeepLink } from '../buildCardsWidgetProps';

const strings = {
  emptyTitle: 'No cards yet',
  emptyBody: 'Open Loyus to add your first card.',
  ownerLine: (owner: string, format: string) => `${owner}'s card · ${format}`,
};

describe('buildCardsWidgetProps', () => {
  it('describes the chosen cards with brand colours and AA text', () => {
    const card = makeCard({
      id: 'card-1',
      name: 'Carrefour Market',
      owner: 'Léa',
      color: '#B8860B',
      isPinned: true,
    });
    const props = buildCardsWidgetProps([card], strings);

    expect(props.cards).toEqual([
      {
        id: 'card-1',
        name: 'Carrefour Market',
        initials: 'CM',
        subtitle: 'Léa',
        detail: "Léa's card · EAN-13",
        fill: '#B8860B',
        ink: textOnCard('#B8860B'),
        url: 'loyus:///card/card-1',
      },
    ]);
  });

  it('falls back to the default brand colour and the barcode type', () => {
    const card = makeCard({ id: 'b', name: 'Fnac', openCount: 1, lastOpenedAt: 10 });
    const [widgetCard] = buildCardsWidgetProps([card], strings).cards;

    expect(widgetCard?.fill).toBe(cardColorOf(card));
    expect(widgetCard?.subtitle).toBe('EAN-13');
    expect(widgetCard?.detail).toBe('EAN-13');
  });

  it('passes localized empty copy and neutral surfaces', () => {
    const props = buildCardsWidgetProps([], strings);

    expect(props.cards).toEqual([]);
    expect(props.emptyTitle).toBe(strings.emptyTitle);
    expect(props.homeUrl).toBe('loyus:///');
    expect(props.surfaceLight).toBe(lightTheme.colors.surface);
    expect(props.surfaceDark).toBe(darkTheme.colors.surface);
  });

  it('encodes ids in deep links', () => {
    expect(cardDeepLink('a b')).toBe('loyus:///card/a%20b');
  });
});
