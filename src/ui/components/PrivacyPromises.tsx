import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon, type IconName, icons, Text } from '../primitives';

const PRIVACY_PROMISES = [
  { icon: icons.offline, label: 'promises.offline' },
  { icon: icons.person, label: 'promises.noAccount' },
  { icon: icons.hand, label: 'promises.noTracking' },
] as const satisfies readonly { readonly icon: IconName; readonly label: string }[];

type Layout = 'inline' | 'list' | 'section';

const ICON_SIZE = { inline: 13, list: 18, section: 16 } as const satisfies Record<Layout, number>;

const TEXT_VARIANT = {
  inline: 'caption',
  list: 'callout',
  section: 'body',
} as const satisfies Record<Layout, string>;

export function PrivacyPromises({ layout }: { readonly layout: Layout }): React.JSX.Element {
  const { t } = useTranslation();
  styles.useVariants({ layout });

  return (
    <View style={styles.list}>
      {PRIVACY_PROMISES.map(({ icon, label }) => (
        <View key={label} style={styles.item}>
          <Icon name={icon} size={ICON_SIZE[layout]} tone="muted" />
          <Text variant={TEXT_VARIANT[layout]} style={styles.label}>
            {t(label)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: {
    variants: {
      layout: {
        inline: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: theme.space(4),
          rowGap: theme.space(1.5),
        },
        list: {
          alignSelf: 'center',
          gap: theme.space(3),
        },
        section: {
          gap: theme.space(2.5),
          paddingHorizontal: theme.space(4),
          paddingVertical: theme.space(3.5),
        },
      },
    },
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    variants: {
      layout: {
        inline: { gap: theme.space(1.5) },
        list: { gap: theme.space(3) },
        section: { gap: theme.space(2.5) },
      },
    },
  },
  label: {
    flexShrink: 1,
  },
}));
