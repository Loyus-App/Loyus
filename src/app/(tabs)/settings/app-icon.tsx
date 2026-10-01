import { useTranslation } from 'react-i18next';
import { APP_ICONS, DEFAULT_APP_ICON } from '@/domain/appIcon';
import { AppIconImage } from '@/ui/components/AppIconImage';
import { SettingsSubscreen } from '@/ui/components/SettingsSubscreen';
import { APP_ICON_LABELS } from '@/ui/constants/appIcons';
import { useAppIcon } from '@/ui/hooks/useAppIcon';
import { ListRow, ListSection } from '@/ui/primitives';
import { testId } from '@/ui/testIds';
import { chooseAppIcon } from '@/ui/utils/appIcon';

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
