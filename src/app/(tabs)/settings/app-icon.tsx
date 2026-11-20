import { useTranslation } from 'react-i18next';
import { APP_ICONS, DEFAULT_APP_ICON } from '@/entities/settings/domain/appIcon';
import { chooseAppIcon } from '@/features/settings/ui/appIconActions';
import { AppIconImage } from '@/features/settings/ui/AppIconImage';
import { APP_ICON_LABELS } from '@/features/settings/ui/appIconImages';
import { SettingsSubscreen } from '@/features/settings/ui/SettingsSubscreen';
import { useAppIcon } from '@/features/settings/ui/useAppIcon';
import { ListRow, ListSection } from '@/shared/ui/primitives';
import { testId } from '@/shared/ui/testIds';

const THUMBNAIL_SIZE = 44;

export default function AppIconScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const current = useAppIcon();

  return (
    <SettingsSubscreen testID={testId('appIconScreen')}>
      <ListSection footer={t('settings.appIconFooter')}>
        {APP_ICONS.map((name) => (
          <ListRow
            key={name}
            leading={<AppIconImage name={name} size={THUMBNAIL_SIZE} />}
            title={t(APP_ICON_LABELS[name])}
            subtitle={name === DEFAULT_APP_ICON ? t('settings.appIconDefault') : undefined}
            accessory="check"
            selected={current === name}
            onPress={() => chooseAppIcon(name)}
          />
        ))}
      </ListSection>
    </SettingsSubscreen>
  );
}
