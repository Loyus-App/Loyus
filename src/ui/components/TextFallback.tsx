import { useTranslation } from 'react-i18next';
import { Platform, Text, View } from 'react-native';
import type { BarcodeFormat } from '../../domain/card';
import { StyleSheet } from '../theme/unistyles';
import { FORMAT_DISPLAY_NAME } from './FormatBadge';

interface TextFallbackProps {
  code: string;
  format: BarcodeFormat;
}

export function TextFallback({ code, format }: TextFallbackProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`Code: ${code}, Format: ${FORMAT_DISPLAY_NAME[format]}`}
    >
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.formatLabel}>
        {t('error.formatLabel', { format: FORMAT_DISPLAY_NAME[format] })}
      </Text>
      <Text style={styles.hint}>{t('error.visualNotAvailable')}</Text>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  formatLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
}));
