import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ignore } from '@/ui/utils/ignore';
import { Button, EmptyState, GradientLayer, Icon, type IconName, icons, Text } from '../primitives';
import { testId } from '../testIds';
import { CARD_COLORS, textOnCard } from '../theme/cardColors';
import { subtleGradient, withAlpha } from '../theme/color';
import { CARD_ASPECT_RATIO } from './CardTile';

type Props = {
  readonly onScan: () => void;
  readonly onManual: () => void;
  readonly onRestore: () => Promise<void>;
};

const FRONT_FILL = CARD_COLORS[0];
const LEFT_FILL = CARD_COLORS[2];
const RIGHT_FILL = CARD_COLORS[7];

function BlankCard({
  fill,
  detailed = false,
}: {
  readonly fill: string;
  readonly detailed?: boolean;
}): React.JSX.Element {
  const ink = withAlpha(textOnCard(fill), 0.45);
  return (
    <View style={styles.blankCard(fill)}>
      <GradientLayer image={subtleGradient(fill)} />
      {detailed ? (
        <>
          <View style={[styles.mark, styles.ink(ink)]} />
          <View style={[styles.line, styles.ink(ink)]} />
        </>
      ) : null}
    </View>
  );
}

function CardFan(): React.JSX.Element {
  return (
    <View
      style={styles.fan}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={[styles.fanSlot, styles.fanLeft]}>
        <BlankCard fill={LEFT_FILL} />
      </View>
      <View style={[styles.fanSlot, styles.fanRight]}>
        <BlankCard fill={RIGHT_FILL} />
      </View>
      <View style={[styles.fanSlot, styles.fanFront]}>
        <BlankCard fill={FRONT_FILL} detailed />
      </View>
    </View>
  );
}

function PromiseRow({
  icon,
  label,
}: {
  readonly icon: IconName;
  readonly label: string;
}): React.JSX.Element {
  return (
    <View style={styles.promise}>
      <Icon name={icon} size={18} tone="muted" />
      <Text variant="callout" style={styles.promiseLabel}>
        {label}
      </Text>
    </View>
  );
}

export function WelcomeState({ onScan, onManual, onRestore }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const [isRestoring, setIsRestoring] = useState(false);

  const restore = (): void => {
    setIsRestoring(true);
    onRestore()
      .catch(ignore)
      .finally(() => setIsRestoring(false));
  };

  return (
    <View style={styles.container}>
      <EmptyState visual={<CardFan />} title={t('welcome.title')} body={t('welcome.body')}>
        <View style={styles.details}>
          <View style={styles.promises}>
            <PromiseRow icon={icons.person} label={t('welcome.noAccount')} />
            <PromiseRow icon={icons.hand} label={t('welcome.noTracking')} />
            <PromiseRow icon={icons.offline} label={t('welcome.offline')} />
          </View>
          <View style={styles.actions}>
            <Button
              label={t('welcome.scan')}
              icon={icons.barcode}
              size="lg"
              onPress={onScan}
              testID={testId('emptyStateCta')}
            />
            <Button
              label={t('welcome.manual')}
              icon={icons.keyboard}
              variant="secondary"
              onPress={onManual}
              testID={testId('welcomeManual')}
            />
            <Button
              label={t('welcome.restore')}
              icon={icons.import}
              variant="ghost"
              loading={isRestoring}
              onPress={restore}
              testID={testId('welcomeRestore')}
            />
          </View>
        </View>
      </EmptyState>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.space(115),
    alignSelf: 'center',
  },
  fan: {
    width: theme.space(60),
    height: theme.space(34),
    marginBottom: theme.space(2),
  },
  fanSlot: {
    position: 'absolute',
    top: theme.space(6),
    left: theme.space(12),
    width: theme.space(36),
  },
  fanLeft: {
    transform: [
      { translateX: -theme.space(9) },
      { translateY: theme.space(1) },
      { rotate: '-12deg' },
    ],
  },
  fanRight: {
    transform: [
      { translateX: theme.space(9) },
      { translateY: -theme.space(1) },
      { rotate: '9deg' },
    ],
  },
  fanFront: {
    transform: [{ translateY: theme.space(3) }, { rotate: '-2deg' }],
  },
  blankCard: (fill: string) => ({
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    padding: theme.space(3),
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: fill,
    boxShadow: `0 4px 14px ${theme.colors.shadow}`,
  }),
  mark: {
    width: theme.space(7),
    height: theme.space(4),
    borderRadius: theme.space(1),
  },
  line: {
    width: theme.space(18),
    height: theme.space(2.5),
    borderRadius: theme.radius.pill,
  },
  ink: (color: string) => ({
    backgroundColor: color,
  }),
  details: {
    alignSelf: 'stretch',
    gap: theme.space(8),
    marginTop: theme.space(3),
  },
  promises: {
    alignSelf: 'center',
    gap: theme.space(3),
  },
  promise: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(3),
  },
  promiseLabel: {
    flexShrink: 1,
  },
  actions: {
    gap: theme.space(2),
  },
}));
