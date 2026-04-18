import Barcode, { type Format } from '@kichiyaki/react-native-barcode-generator';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BarcodeFormat, JSBARCODE_FORMAT } from '../../domain/card';
import { tid } from '../testIds';
import { StyleSheet } from '../theme/unistyles';
import { TextFallback } from './TextFallback';

const RENDERABLE_1D: BarcodeFormat[] = [
  BarcodeFormat.CODE128,
  BarcodeFormat.CODE39,
  BarcodeFormat.EAN13,
  BarcodeFormat.EAN8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.ITF14,
  BarcodeFormat.CODABAR,
  BarcodeFormat.MSI,
  BarcodeFormat.PHARMACODE,
];

interface BarcodeRendererProps {
  code: string;
  format: BarcodeFormat;
  width: number;
  accessibilityLabel?: string;
}

export function BarcodeRenderer({
  code,
  format,
  width,
  accessibilityLabel,
}: BarcodeRendererProps): React.JSX.Element {
  let content: React.JSX.Element;

  if (format === BarcodeFormat.QR_CODE) {
    content = <QRCode value={code} size={Math.min(width * 0.8, 300)} />;
  } else if (RENDERABLE_1D.includes(format)) {
    content = (
      <Barcode
        value={code}
        format={JSBARCODE_FORMAT[format] as Format}
        maxWidth={width - 32}
        lineColor="#000000"
        background="#FFFFFF"
      />
    );
  } else {
    content = <TextFallback code={code} format={format} />;
  }

  return (
    <View
      style={styles.wrapper}
      accessible={true}
      importantForAccessibility="yes"
      accessibilityLabel={accessibilityLabel}
      {...tid('barcodeDisplay')}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
}));
