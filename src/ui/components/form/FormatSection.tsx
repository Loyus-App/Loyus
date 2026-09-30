import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { BarcodeFormat, FORMAT_LABEL } from '@/domain/card';
import { ListRow, ListSection } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { type Option, OptionSheet } from '../OptionSheet';

const FORMAT_OPTIONS: readonly Option<BarcodeFormat>[] = Object.values(BarcodeFormat).map(
  (format) => ({ value: format, label: FORMAT_LABEL[format] }),
);

type Props = {
  readonly format: BarcodeFormat;
  readonly onChange: (format: BarcodeFormat) => void;
};

export function FormatSection({ format, onChange }: Props): React.JSX.Element {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListSection footer={t('form.formatHint')}>
        <ListRow
          title={t('form.format')}
          value={FORMAT_LABEL[format]}
          accessory="chevron"
          onPress={() => {
            Keyboard.dismiss();
            setOpen(true);
          }}
          {...tid('formatPicker')}
        />
      </ListSection>
      <OptionSheet
        visible={open}
        title={t('form.chooseFormat')}
        options={FORMAT_OPTIONS}
        value={format}
        onSelect={onChange}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
