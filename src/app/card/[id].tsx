import * as Clipboard from 'expo-clipboard';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, type LayoutChangeEvent, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { type Card, type CardId, photoFileNames } from '@/domain/card';
import { selectCardById } from '@/state/selectors';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { BarcodePanel, type PanelArea, useBarcodeLayout } from '@/ui/components/BarcodePanel';
import { CardThumb } from '@/ui/components/CardThumb';
import { useCheckoutDisplay } from '@/ui/hooks/useCheckoutDisplay';
import { useToolbarIcon } from '@/ui/hooks/useToolbarIcon';
import { modalOptions } from '@/ui/navigation/stackOptions';
import { Button, EmptyState, GradientLayer, icons, RoundAction, Text } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { brandWash, cardColorOf } from '@/ui/theme';
import { confirmDeleteCard, editCard, shareCard, togglePin } from '@/ui/utils/cardActions';
import { haptics } from '@/ui/utils/haptics';
import { ignore } from '@/ui/utils/ignore';

const COPIED_FEEDBACK_MS = 1500;
const NO_NOTE: Size = { width: 0, height: 0 };
const THUMB_WIDTH = 32;

type Size = PanelArea;

function close(): void {
  router.back();
}

function useLayoutSize(): [Size | null, (event: LayoutChangeEvent) => void] {
  const [size, setSize] = useState<Size | null>(null);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize((previous) =>
      previous?.width === width && previous.height === height ? previous : { width, height },
    );
  }, []);
  return [size, onLayout];
}

function panelArea(stage: Size | null, note: Size | null): PanelArea | null {
  if (!(stage && note)) return null;
  return { width: stage.width, height: Math.max(0, stage.height - note.height) };
}

function useRecordOpen(id: CardId): void {
  const recorded = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (recorded.current) return;
      recorded.current = true;
      useCardStore.getState().recordOpen(id);
    }, [id]),
  );
}

function useSuccessOnce(ready: boolean): void {
  const done = useRef(false);
  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    haptics.success();
  }, [ready]);
}

function useCopyCode(code: string, announcement: string): { copied: boolean; copy: () => void } {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(() => {
    Clipboard.setStringAsync(code)
      .then(() => {
        haptics.success();
        AccessibilityInfo.announceForAccessibility(announcement);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
      })
      .catch(ignore);
  }, [code, announcement]);

  return { copied, copy };
}

type ToolbarProps = {
  readonly card: Card | null;
  readonly onDeleted: (card: Card) => void;
};

function CheckoutToolbar({ card, onDeleted }: ToolbarProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const closeIcon = useToolbarIcon(icons.close, theme.colors.text);
  const moreIcon = useToolbarIcon(icons.more, theme.colors.text);

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button
          {...(closeIcon ? { icon: closeIcon } : {})}
          accessibilityLabel={t('checkout.close')}
          onPress={close}
        />
      </Stack.Toolbar>
      {card ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Menu
            {...(moreIcon ? { icon: moreIcon } : {})}
            accessibilityLabel={t('cardActions.more')}
          >
            {photoFileNames(card.photos).length > 0 ? (
              <Stack.Toolbar.MenuAction
                icon={icons.photo.ios}
                onPress={() => router.push(`/card/photos/${card.id}`)}
              >
                {t('photos.title')}
              </Stack.Toolbar.MenuAction>
            ) : null}
            <Stack.Toolbar.MenuAction
              icon={card.isPinned ? icons.unpin.ios : icons.pin.ios}
              onPress={() => togglePin(card)}
            >
              {t(card.isPinned ? 'cardActions.unpin' : 'cardActions.pin')}
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction icon={icons.edit.ios} onPress={() => editCard(card)}>
              {t('cardActions.edit')}
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction icon={icons.share.ios} onPress={() => shareCard(card)}>
              {t('cardActions.share')}
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction
              icon={icons.trash.ios}
              destructive
              onPress={() => confirmDeleteCard(card, () => onDeleted(card))}
            >
              {t('cardActions.delete')}
            </Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar>
      ) : null}
    </>
  );
}

function CheckoutTitle({ card }: { readonly card: Card }): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.title}>
      <CardThumb card={card} width={THUMB_WIDTH} />
      <View style={styles.titleText}>
        <Text
          variant="body"
          weight="semibold"
          numberOfLines={1}
          maxFontSizeMultiplier={1.3}
          accessibilityRole="header"
          {...tid('cardDetailName')}
        >
          {card.name}
        </Text>
        {card.owner ? (
          <Text variant="caption" tone="muted" numberOfLines={1} maxFontSizeMultiplier={1.3}>
            {t('checkout.ownerCard', { owner: card.owner })}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

type NoteProps = {
  readonly note: string;
  readonly onLayout: (event: LayoutChangeEvent) => void;
};

function CheckoutNote({ note, onLayout }: NoteProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Text
      variant="caption"
      tone="muted"
      numberOfLines={2}
      selectable
      onLayout={onLayout}
      style={styles.note}
      accessibilityLabel={t('checkout.noteLabel', { note })}
      {...tid('checkoutNote')}
    >
      {note}
    </Text>
  );
}

type ActionsProps = {
  readonly card: Card;
  readonly maxBrightness: boolean;
  readonly dense: boolean;
};

function checkoutHint(
  dense: boolean,
  maxBrightness: boolean,
): 'hintDense' | 'hintBright' | 'hintAwake' {
  if (dense) return 'hintDense';
  return maxBrightness ? 'hintBright' : 'hintAwake';
}

function CheckoutActions({ card, maxBrightness, dense }: ActionsProps): React.JSX.Element {
  const { t } = useTranslation();
  const setMaxBrightness = useSettingsStore((state) => state.setMaxBrightness);
  const { copied, copy } = useCopyCode(card.code, t('checkout.copied'));
  const rotated = card.barcodeRotated ?? false;

  return (
    <View style={styles.footer}>
      <View style={styles.actions}>
        <RoundAction
          icon={icons.rotate}
          label={t('checkout.rotate')}
          active={rotated}
          accessibilityHint={t('checkout.rotateHint')}
          onPress={() => useCardStore.getState().toggleBarcodeRotation(card.id)}
          {...tid('rotateButton')}
        />
        <RoundAction
          icon={copied ? icons.check : icons.copy}
          label={copied ? t('checkout.copied') : t('checkout.copy')}
          accessibilityHint={t('checkout.copyHint')}
          onPress={copy}
          {...tid('copyNumberButton')}
        />
        <RoundAction
          icon={maxBrightness ? icons.brightness : icons.brightnessOff}
          label={t('checkout.brightness')}
          active={maxBrightness}
          accessibilityLabel={
            maxBrightness ? t('checkout.brightnessOnLabel') : t('checkout.brightnessOffLabel')
          }
          onPress={() => setMaxBrightness(!maxBrightness)}
          {...tid('brightnessButton')}
        />
      </View>
      <Text variant="caption" tone="muted" style={styles.hint}>
        {t(`checkout.${checkoutHint(dense, maxBrightness)}`)}
      </Text>
    </View>
  );
}

function Checkout({ card }: { readonly card: Card }): React.JSX.Element {
  const maxBrightness = useSettingsStore((state) => state.maxBrightness);
  const [stage, onStageLayout] = useLayoutSize();
  const [note, onNoteLayout] = useLayoutSize();
  const area = panelArea(stage, card.note ? note : NO_NOTE);
  const rotated = card.barcodeRotated ?? false;
  const barcode = useBarcodeLayout(card, rotated, area);

  useRecordOpen(card.id);
  useCheckoutDisplay(maxBrightness);
  useSuccessOnce(area !== null);

  return (
    <>
      <View style={styles.stage} onLayout={onStageLayout}>
        {area ? <BarcodePanel card={card} rotated={rotated} area={area} barcode={barcode} /> : null}
        {card.note ? <CheckoutNote note={card.note} onLayout={onNoteLayout} /> : null}
      </View>
      <CheckoutActions
        card={card}
        maxBrightness={maxBrightness}
        dense={!rotated && (barcode?.layout.dense ?? false)}
      />
    </>
  );
}

function NotFound(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.notFound}>
      <EmptyState
        icon={icons.cards}
        title={t('checkout.notFoundTitle')}
        body={t('checkout.notFoundBody')}
      >
        <Button label={t('checkout.backToCards')} onPress={close} />
      </EmptyState>
    </View>
  );
}

export default function CheckoutScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const liveCard = useCardStore(selectCardById(id as CardId));
  const [departed, setDeparted] = useState<Card | null>(null);
  const headerHeight = useHeaderHeight();
  const card = liveCard ?? departed;

  const handleDeleted = useCallback((deleted: Card) => {
    setDeparted(deleted);
    close();
  }, []);

  return (
    <View
      style={styles.screen(modalOptions.headerTransparent ? headerHeight : 0)}
      {...tid('checkoutScreen')}
    >
      {card ? <GradientLayer image={brandWash(cardColorOf(card))} /> : null}
      <CheckoutToolbar card={card} onDeleted={handleDeleted} />
      {card ? (
        <Stack.Title asChild>
          <CheckoutTitle card={card} />
        </Stack.Title>
      ) : null}
      {card ? <Checkout card={card} /> : <NotFound />}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: (headerInset: number) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: headerInset + theme.space(2),
    paddingHorizontal: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(4),
  }),
  stage: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(2),
    maxWidth: rt.screen.width - theme.space(40),
  },
  titleText: {
    flexShrink: 1,
  },
  note: {
    paddingTop: theme.space(4),
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: theme.space(4),
    paddingTop: theme.space(5),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.space(6),
  },
  hint: {
    textAlign: 'center',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
  },
}));
