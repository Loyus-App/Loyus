import { Component, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { Icon } from '../primitives/Icon';
import { icons } from '../primitives/icons';
import { Text } from '../primitives/Text';

type Props = {
  readonly children: ReactNode;
};

type State = {
  readonly failed: boolean;
};

const InkIcon = withUnistyles(Icon, (theme) => ({ color: theme.barcode.inkMuted }));

function RenderFailed(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.container} accessible accessibilityRole="alert">
      <InkIcon name={icons.warning} size={28} />
      <Text variant="callout" weight="semibold" style={styles.title}>
        {t('checkout.renderFailedTitle')}
      </Text>
      <Text variant="caption" style={styles.body}>
        {t('checkout.renderFailedBody')}
      </Text>
    </View>
  );
}

export class BarcodeErrorBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override render(): ReactNode {
    return this.state.failed ? <RenderFailed /> : this.props.children;
  }
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: theme.space(2),
    paddingVertical: theme.space(2),
  },
  title: {
    color: theme.barcode.ink,
    textAlign: 'center',
  },
  body: {
    color: theme.barcode.inkMuted,
    textAlign: 'center',
  },
}));
