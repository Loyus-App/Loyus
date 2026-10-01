import { Host, Picker, Text } from '@expo/ui/swift-ui';
import { accessibilityLabel as label, pickerStyle, tag } from '@expo/ui/swift-ui/modifiers';
import { StyleSheet } from 'react-native-unistyles';
import { haptics } from '../utils/haptics';

export type SegmentOption<T extends string> = {
  readonly value: T;
  readonly label: string;
  readonly testID?: string | undefined;
};

type Props<T extends string> = {
  readonly options: readonly SegmentOption<T>[];
  readonly value: T | null;
  readonly onChange: (value: T) => void;
  readonly accessibilityLabel: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: Props<T>): React.JSX.Element {
  return (
    <Host matchContents={{ vertical: true }} style={styles.host}>
      <Picker<T | null>
        selection={value}
        onSelectionChange={(next) => {
          if (next === null) return;
          haptics.selection();
          onChange(next);
        }}
        modifiers={[pickerStyle('segmented'), label(accessibilityLabel)]}
      >
        {options.map((option) => (
          <Text key={option.value} modifiers={[tag(option.value)]}>
            {option.label}
          </Text>
        ))}
      </Picker>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    alignSelf: 'stretch',
  },
});
