import { useTranslation } from 'react-i18next';
import { type Card, FORMAT_LABEL } from '@/domain/card';
import { Icon, icons, ListRow } from '../primitives';
import { cardAccessibilityActions } from '../utils/cardActions';
import { CardThumb } from './CardThumb';

type Props = {
  readonly card: Card;
  readonly onPress: () => void;
  readonly onLongPress?: (() => void) | undefined;
  readonly testID?: string | undefined;
};

function subtitleOf(card: Card): string {
  const format = FORMAT_LABEL[card.format];
  return card.owner ? `${card.owner} · ${format}` : format;
}

export function CardRow({ card, onPress, onLongPress, testID }: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <ListRow
      title={card.name}
      subtitle={subtitleOf(card)}
      leading={<CardThumb card={card} />}
      accessory={card.isPinned ? <Icon name={icons.pin} size={14} tone="muted" /> : undefined}
      onPress={onPress}
      {...(onLongPress ? { onLongPress } : {})}
      accessibilityHint={t('home.tileHint')}
      {...cardAccessibilityActions(card)}
      testID={testID}
    />
  );
}
