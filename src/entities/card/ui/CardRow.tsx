import { useTranslation } from 'react-i18next';
import { Icon, icons, ListRow } from '@/shared/ui/primitives';
import { type Card, cardSubtitle } from '../domain/card';
import { cardAccessibilityActions } from './cardActions';
import { CardThumb } from './CardThumb';

type Props = {
  readonly card: Card;
  readonly onPress?: (() => void) | undefined;
  readonly onLongPress?: (() => void) | undefined;
  readonly testID?: string | undefined;
};

export function CardRow({ card, onPress, onLongPress, testID }: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <ListRow
      title={card.name}
      subtitle={cardSubtitle(card)}
      leading={<CardThumb card={card} />}
      accessory={card.isPinned ? <Icon name={icons.pin} size={14} tone="muted" /> : undefined}
      {...(onPress ? { onPress } : {})}
      {...(onLongPress ? { onLongPress } : {})}
      accessibilityHint={t('home.tileHint')}
      {...cardAccessibilityActions(card)}
      testID={testID}
    />
  );
}
