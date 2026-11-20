import { Children, Fragment, type ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from './Text';

type Props = {
  readonly title?: string;
  readonly footer?: string;
  readonly children: ReactNode;
  readonly testID?: string | undefined;
};

export function ListSection({ title, footer, children, testID }: Props): React.JSX.Element {
  const rows = Children.toArray(children);
  return (
    <View style={styles.section} testID={testID}>
      {title && (
        <Text variant="label" tone="muted" style={styles.inset} accessibilityRole="header">
          {title}
        </Text>
      )}
      <View style={styles.group}>
        {rows.map((row, index) => (
          <Fragment key={(row as { key?: string }).key ?? `row-${index.toString()}`}>
            {index > 0 && <View style={styles.separator} />}
            {row}
          </Fragment>
        ))}
      </View>
      {footer && (
        <Text variant="caption" tone="muted" style={styles.inset}>
          {footer}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  section: {
    gap: theme.space(2),
  },
  inset: {
    paddingHorizontal: theme.space(4),
  },
  group: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: theme.space(4),
    backgroundColor: theme.colors.border,
  },
}));
