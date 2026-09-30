import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type CardId, findDuplicate } from '@/domain/card';
import { isLikelyRotatingCode } from '@/domain/rotatingCode';
import { useCardStore } from '@/state/stores/cardStore';
import { Banner } from '@/ui/primitives';
import { tid } from '@/ui/testIds';

type Props = {
  readonly code: string;
  readonly editingId?: CardId | undefined;
  readonly warnRotating: boolean;
};

export function FormWarnings({ code, editingId, warnRotating }: Props): React.JSX.Element | null {
  const { t } = useTranslation();
  const cards = useCardStore((state) => state.cards);
  const duplicate = useMemo(
    () => findDuplicate(Object.values(cards), code, editingId),
    [cards, code, editingId],
  );
  const rotating = warnRotating && isLikelyRotatingCode(code.trim());

  if (!(rotating || duplicate)) return null;

  return (
    <View style={styles.stack}>
      {rotating ? (
        <Banner tone="warning" message={t('form.rotating')} {...tid('rotatingCodeWarning')} />
      ) : null}
      {duplicate ? (
        <Banner
          tone="warning"
          message={t('form.duplicate', { name: duplicate.name })}
          {...tid('duplicateWarning')}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  stack: {
    gap: theme.space(2),
  },
}));
