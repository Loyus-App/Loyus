import { Text, View } from 'react-native';
import { BarcodeFormat } from '../../domain/card';
import { StyleSheet } from '../theme/unistyles';

const DISPLAY_NAME: Record<BarcodeFormat, string> = {
  [BarcodeFormat.EAN13]: 'EAN-13',
  [BarcodeFormat.EAN8]: 'EAN-8',
  [BarcodeFormat.UPC_A]: 'UPC-A',
  [BarcodeFormat.UPC_E]: 'UPC-E',
  [BarcodeFormat.ITF14]: 'ITF-14',
  [BarcodeFormat.CODE128]: 'Code 128',
  [BarcodeFormat.CODE39]: 'Code 39',
  [BarcodeFormat.CODABAR]: 'Codabar',
  [BarcodeFormat.MSI]: 'MSI',
  [BarcodeFormat.PHARMACODE]: 'Pharma',
  [BarcodeFormat.QR_CODE]: 'QR',
  [BarcodeFormat.DATA_MATRIX]: 'DataMatrix',
  [BarcodeFormat.PDF417]: 'PDF417',
  [BarcodeFormat.AZTEC]: 'Aztec',
  [BarcodeFormat.GS1_DATABAR]: 'GS1 DataBar',
};

export { DISPLAY_NAME as FORMAT_DISPLAY_NAME };

interface FormatBadgeProps {
  format: BarcodeFormat;
}

export function FormatBadge({ format }: FormatBadgeProps): React.JSX.Element {
  return (
    <View style={styles.badge} accessible={true} accessibilityRole="text">
      <Text style={styles.label}>{DISPLAY_NAME[format]}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  badge: {
    backgroundColor: theme.colors.containerHigh,
    borderRadius: theme.radius.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
}));
