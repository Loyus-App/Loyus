import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

const SCAN_WIDTH = 280;
const SCAN_HEIGHT = 180;
const CORNER_SIZE = 28;
const CORNER_WIDTH = 3;

/**
 * Scanner viewfinder overlay with teal corner bracket markers.
 * pointerEvents="none" so taps pass through to camera/buttons.
 */
export function ScannerOverlay(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const tealColor = theme.colors.primary;

  return (
    <View style={styles.root} pointerEvents="none" {...tid('scannerOverlay')}>
      {/* Top dark band */}
      <View style={styles.darkBand} />

      {/* Middle row */}
      <View style={styles.middleRow}>
        <View style={styles.darkBand} />

        {/* Scan cutout */}
        <View style={styles.cutout}>
          {/* Corner brackets */}
          {/* Top-left */}
          <View style={[styles.corner, styles.cornerTL, { borderColor: tealColor }]} />
          {/* Top-right */}
          <View style={[styles.corner, styles.cornerTR, { borderColor: tealColor }]} />
          {/* Bottom-left */}
          <View style={[styles.corner, styles.cornerBL, { borderColor: tealColor }]} />
          {/* Bottom-right */}
          <View style={[styles.corner, styles.cornerBR, { borderColor: tealColor }]} />

          {/* Center instruction */}
          <View style={styles.centerLabel}>
            <Text style={styles.alignText}>{t('scanner.alignText')}</Text>
          </View>
        </View>

        <View style={styles.darkBand} />
      </View>

      {/* Bottom dark band */}
      <View style={styles.bottomBand} />
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  darkBand: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  middleRow: {
    flexDirection: 'row',
    height: SCAN_HEIGHT,
  },
  cutout: {
    width: SCAN_WIDTH,
    height: SCAN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Corner brackets
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderBottomRightRadius: 4,
  },
  centerLabel: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  alignText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  bottomBand: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
}));
