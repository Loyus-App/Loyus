import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type BarcodeFormat, formatCodeForDisplay } from '@/domain/card';
import { Text } from '../primitives/Text';
import { tid } from '../testIds';

type Props = {
  readonly code: string;
  readonly format: BarcodeFormat;
};

const MAX_CODE_LINES = 4;

export function TextFallback({ code, format }: Props): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="callout" weight="semibold" style={styles.title}>
        {t('checkout.textOnlyTitle')}
      </Text>
      <Text
        variant="code"
        selectable
        numberOfLines={MAX_CODE_LINES}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.3}
        style={styles.code}
        accessibilityLabel={t('checkout.numberLabel', { code })}
        {...tid('cardNumber')}
      >
        {formatCodeForDisplay(code, format)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: theme.space(3),
  },
  title: {
    color: theme.barcode.inkMuted,
    textAlign: 'center',
  },
  code: {
    color: theme.barcode.ink,
    fontSize: theme.typography.display.fontSize,
    lineHeight: theme.typography.display.lineHeight,
    textAlign: 'center',
  },
}));
