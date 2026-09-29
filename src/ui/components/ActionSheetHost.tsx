import { useTranslation } from 'react-i18next';
import { Modal, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type SheetAction, useUiStore } from '@/state/stores/uiStore';
import { Button, ListRow, ListSection, Text } from '../primitives';

function runAfterClose(action: SheetAction): void {
  useUiStore.getState().hideActionSheet();
  requestIdleCallback(action.run);
}

export function ActionSheetHost(): React.JSX.Element {
  const { t } = useTranslation();
  const request = useUiStore((state) => state.actionSheet);
  const close = useUiStore((state) => state.hideActionSheet);

  return (
    <Modal
      visible={request !== null}
      transparent
      animationType="slide"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={close}
    >
      <View style={styles.root}>
        <Pressable
          style={styles.backdrop}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
        />
        <View style={styles.sheet} accessibilityViewIsModal>
          {request ? (
            <Text variant="caption" tone="muted" style={styles.title} numberOfLines={1}>
              {request.title}
            </Text>
          ) : null}
          <ListSection>
            {request?.actions.map((action) => (
              <ListRow
                key={action.label}
                title={action.label}
                destructive={action.destructive ?? false}
                onPress={() => runAfterClose(action)}
              />
            ))}
          </ListSection>
          <Button label={t('common.cancel')} variant="secondary" size="lg" onPress={close} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.scrim,
  },
  sheet: {
    gap: theme.space(3),
    padding: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(4),
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    textAlign: 'center',
  },
}));
