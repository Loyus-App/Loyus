import {
  AccessoryWidgetBackground,
  HStack,
  Image,
  Link,
  Spacer,
  Text,
  VStack,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  accessibilityHidden,
  accessibilityLabel,
  background,
  containerBackground,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  minimumScaleFactor,
  padding,
  shapes,
  widgetURL,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';
import type { CardsWidgetCard, CardsWidgetProps } from './types';

function CardsWidget(props: CardsWidgetProps, environment: WidgetEnvironment): React.JSX.Element {
  'widget';
  const family = environment.widgetFamily;
  const surface = environment.colorScheme === 'dark' ? props.surfaceDark : props.surfaceLight;
  const tinted = environment.widgetRenderingMode === 'accented';
  const first = props.cards[0];
  const fillFrame = frame({
    maxWidth: Number.POSITIVE_INFINITY,
    maxHeight: Number.POSITIVE_INFINITY,
    alignment: 'topLeading',
  });

  const tileBody = (card: CardsWidgetCard, compact: boolean) => (
    <VStack alignment="leading" spacing={2} modifiers={[fillFrame]}>
      <Text
        modifiers={[
          font({ textStyle: compact ? 'caption' : 'subheadline', weight: 'bold' }),
          foregroundStyle(card.ink),
          accessibilityHidden(true),
        ]}
      >
        {card.initials}
      </Text>
      <Spacer minLength={4} />
      <Text
        modifiers={[
          font({ textStyle: compact ? 'subheadline' : 'headline', weight: 'semibold' }),
          foregroundStyle(card.ink),
          lineLimit(2),
          minimumScaleFactor(0.8),
        ]}
      >
        {card.name}
      </Text>
      <Text
        modifiers={[
          font({ textStyle: compact ? 'caption2' : 'caption' }),
          foregroundStyle(card.ink),
          lineLimit(1),
        ]}
      >
        {card.subtitle}
      </Text>
    </VStack>
  );

  const tile = (card: CardsWidgetCard) => (
    <VStack
      modifiers={[
        padding({ all: 10 }),
        fillFrame,
        background(
          tinted ? { type: 'hierarchical', style: 'quaternary' } : card.fill,
          shapes.roundedRectangle({ cornerRadius: 14, roundedCornerStyle: 'continuous' }),
        ),
      ]}
    >
      {tileBody(card, true)}
    </VStack>
  );

  const empty = () => (
    <VStack
      alignment="leading"
      spacing={4}
      modifiers={[fillFrame, containerBackground(surface, 'widget'), widgetURL(props.homeUrl)]}
    >
      <Image
        systemName="creditcard"
        modifiers={[foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}
      />
      <Spacer />
      <Text modifiers={[font({ textStyle: 'headline' }), lineLimit(2)]}>{props.emptyTitle}</Text>
      <Text
        modifiers={[
          font({ textStyle: 'caption' }),
          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
          lineLimit(3),
        ]}
      >
        {props.emptyBody}
      </Text>
    </VStack>
  );

  const circular = (card: CardsWidgetCard | undefined) => (
    <ZStack
      modifiers={[
        containerBackground('transparent', 'widget'),
        widgetURL(card ? card.url : props.homeUrl),
        accessibilityLabel(card ? card.name : props.emptyTitle),
      ]}
    >
      <AccessoryWidgetBackground />
      {card ? (
        <Text
          modifiers={[
            font({ size: 20, weight: 'bold', design: 'rounded' }),
            minimumScaleFactor(0.6),
          ]}
        >
          {card.initials}
        </Text>
      ) : (
        <Image systemName="creditcard" />
      )}
    </ZStack>
  );

  const rectangular = (title: string, detail: string, url: string) => (
    <VStack
      alignment="leading"
      spacing={0}
      modifiers={[
        frame({ maxWidth: Number.POSITIVE_INFINITY, alignment: 'leading' }),
        containerBackground('transparent', 'widget'),
        widgetURL(url),
      ]}
    >
      <Text modifiers={[font({ textStyle: 'headline' }), lineLimit(1)]}>{title}</Text>
      <Text
        modifiers={[
          font({ textStyle: 'caption' }),
          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
          lineLimit(2),
        ]}
      >
        {detail}
      </Text>
    </VStack>
  );

  if (family === 'accessoryCircular') return circular(first);
  if (family === 'accessoryRectangular') {
    return first
      ? rectangular(first.name, first.detail, first.url)
      : rectangular(props.emptyTitle, props.emptyBody, props.homeUrl);
  }
  if (!first) return empty();
  if (family === 'systemMedium') {
    return (
      <HStack spacing={8} modifiers={[containerBackground(surface, 'widget')]}>
        {props.cards.map((card) => (
          <Link key={card.id} destination={card.url}>
            {tile(card)}
          </Link>
        ))}
      </HStack>
    );
  }
  return (
    <VStack
      modifiers={[fillFrame, containerBackground(first.fill, 'widget'), widgetURL(first.url)]}
    >
      {tileBody(first, false)}
    </VStack>
  );
}

const CardsWidgetInstance = createWidget<CardsWidgetProps>('LoyusCards', CardsWidget, {
  cards: [],
  emptyTitle: 'No cards yet',
  emptyBody: 'Open Loyus to add your first card.',
  homeUrl: 'loyus:///',
  surfaceLight: '#FFFFFF',
  surfaceDark: '#161B22',
});

export default CardsWidgetInstance;
