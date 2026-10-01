import { Host, Picker, Text } from '@expo/ui/swift-ui';
import { labelsHidden, pickerStyle, tag, tint } from '@expo/ui/swift-ui/modifiers';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { BarcodeFormat, FORMAT_LABEL } from '@/domain/card';
import { ListRow, ListSection } from '@/ui/primitives';
import { tid } from '@/ui/testIds';

const FORMATS = Object.values(BarcodeFormat);

type Props = {
  readonly format: BarcodeFormat;
  readonly onChange: (format: BarcodeFormat) => void;
};

export function FormatSection({ format, onChange }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <ListSection footer={t('form.formatHint')}>
      <ListRow
        title={t('form.format')}
        accessory={
          <View {...tid('formatPicker')}>
            <Host matchContents>
              <Picker<BarcodeFormat>
                label={t('form.format')}
                selection={format}
                onSelectionChange={onChange}
                modifiers={[pickerStyle('menu'), labelsHidden(), tint(theme.colors.accent)]}
              >
                {FORMATS.map((option) => (
                  <Text key={option} modifiers={[tag(option)]}>
                    {FORMAT_LABEL[option]}
                  </Text>
                ))}
              </Picker>
            </Host>
          </View>
        }
      />
    </ListSection>
  );
}
