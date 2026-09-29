import { useTranslation } from 'react-i18next';
import { Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button, ListRow, ListSection, Text } from '@/ui/primitives';

export type Option<T extends string> = {
  readonly value: T;
  readonly label: string;
  readonly subtitle?: string | undefined;
};

type Props<T extends string> = {
  readonly visible: boolean;
  readonly title: string;
  readonly options: readonly Option<T>[];
  readonly value: T;
  readonly onSelect: (value: T) => void;
  readonly onClose: () => void;
};

const IS_IOS = Platform.OS === 'ios';

export function OptionSheet<T extends string>({
  visible,
  title,
  options,
  value,
  onSelect,
  onClose,
}: Props<T>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={IS_IOS ? 'pageSheet' : undefined}
      transparent={!IS_IOS}
      allowSwipeDismissal
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        {IS_IOS ? null : (
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t('common.close')}
          />
        )}
        <View style={styles.sheet} accessibilityViewIsModal>
          <View style={styles.header}>
            <Text variant="headline" style={styles.title} accessibilityRole="header">
              {title}
            </Text>
            <Button label={t('common.done')} variant="ghost" onPress={onClose} />
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <ListSection>
              {options.map((option) => (
                <ListRow
                  key={option.value}
                  title={option.label}
                  subtitle={option.subtitle}
                  accessory="check"
                  selected={option.value === value}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                />
              ))}
            </ListSection>
          </ScrollView>
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
    flex: 1,
  },
  sheet: IS_IOS
    ? {
        flex: 1,
        backgroundColor: theme.colors.background,
      }
    : {
        maxHeight: '85%',
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.lg,
        borderTopRightRadius: theme.radius.lg,
        borderCurve: 'continuous',
        boxShadow: `0 -4px 24px ${theme.colors.shadow}`,
      },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space(2),
    paddingTop: theme.space(3),
    paddingLeft: theme.space(5),
    paddingRight: theme.space(1),
  },
  title: {
    flex: 1,
  },
  content: {
    padding: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(4),
  },
}));
