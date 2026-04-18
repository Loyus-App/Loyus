import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Alert, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { exportCards } from '../../src/infra/export/cardExport';
import { i18n, type LanguageCode, resolveLanguage } from '../../src/infra/i18n';
import { useSettingsStore } from '../../src/state/stores/settingsStore';
import { ScreenShell } from '../../src/ui/components/ScreenShell';
import { tid } from '../../src/ui/testIds';
import { StyleSheet, useUnistyles } from '../../src/ui/theme/unistyles';

const appVersion = Constants.expoConfig?.version ?? '0.1.0';

type ThemeOption = 'light' | 'dark' | 'system';

function getThemeKey(
  option: ThemeOption,
): 'settings.themeSystem' | 'settings.themeLight' | 'settings.themeDark' {
  if (option === 'system') return 'settings.themeSystem';
  if (option === 'light') return 'settings.themeLight';
  return 'settings.themeDark';
}

function applyTheme(option: ThemeOption): void {
  if (option === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(option);
  }
}

export default function SettingsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const currentTheme = useSettingsStore((s) => s.theme);
  const currentLanguage = useSettingsStore((s) => s.language);

  const languageOptions: { code: LanguageCode; label: string }[] = [
    { code: 'auto', label: t('settings.languageAuto') },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'de', label: 'Deutsch' },
  ];

  const currentLanguageLabel =
    languageOptions.find((o) => o.code === currentLanguage)?.label ?? 'English';

  function handleTheme(option: ThemeOption) {
    useSettingsStore.getState().setTheme(option);
    applyTheme(option);
  }

  function applyLanguage(lang: LanguageCode) {
    useSettingsStore.getState().setLanguage(lang);
    i18n.changeLanguage(resolveLanguage(lang)).catch(() => undefined);
  }

  function handleLanguagePicker() {
    const sheetOptions = [...languageOptions.map((l) => l.label), t('common.cancel')];
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: sheetOptions,
          cancelButtonIndex: sheetOptions.length - 1,
          title: t('settings.languageTitle'),
        },
        (idx) => {
          if (idx < languageOptions.length) {
            const option = languageOptions[idx];
            if (option) applyLanguage(option.code);
          }
        },
      );
    } else {
      Alert.alert(t('settings.languageTitle'), undefined, [
        ...languageOptions.map((l) => ({ text: l.label, onPress: () => applyLanguage(l.code) })),
        { text: t('common.cancel'), style: 'cancel' },
      ]);
    }
  }

  const themeSubtitle = t(getThemeKey(currentTheme));

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenShell {...tid('settingsScreen')}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('home.title')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Page Title */}
          <Text style={styles.pageTitle}>{t('settings.title')}</Text>
          <Text style={styles.pageSubtitle}>{t('settings.subtitle')}</Text>

          {/* VISUAL ENVIRONMENT */}
          <Text style={styles.sectionLabel}>{t('settings.sectionVisual')}</Text>
          <View style={styles.card}>
            <View style={styles.appearanceRow}>
              <View style={styles.appearanceLeft}>
                <View style={styles.appearanceIconBox}>
                  <Ionicons name="contrast-outline" size={22} color={theme.colors.text} />
                </View>
                <View>
                  <Text style={styles.appearanceTitle}>{t('settings.appearanceTitle')}</Text>
                  <Text style={styles.appearanceSub}>{themeSubtitle}</Text>
                </View>
              </View>
              <View style={styles.themePills}>
                <Pressable
                  onPress={() => handleTheme('light')}
                  style={[styles.pill, currentTheme === 'light' && styles.pillActive]}
                  accessibilityLabel={t('settings.themeLight')}
                  accessibilityRole="button"
                  {...tid('themeLight')}
                >
                  <Text
                    style={[styles.pillText, currentTheme === 'light' && styles.pillTextActive]}
                  >
                    {t('settings.pillLight')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleTheme('dark')}
                  style={[styles.pill, currentTheme === 'dark' && styles.pillActive]}
                  accessibilityLabel={t('settings.themeDark')}
                  accessibilityRole="button"
                  {...tid('themeDark')}
                >
                  <Text style={[styles.pillText, currentTheme === 'dark' && styles.pillTextActive]}>
                    {t('settings.pillDark')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* LANGUAGE */}
          <Text style={styles.sectionLabel}>{t('settings.sectionLanguage')}</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.appearanceRow}
              onPress={handleLanguagePicker}
              accessibilityLabel={t('settings.languageTitle')}
              accessibilityRole="button"
              {...tid('languageRow')}
            >
              <View style={styles.appearanceLeft}>
                <View style={styles.appearanceIconBox}>
                  <Ionicons name="language-outline" size={22} color={theme.colors.text} />
                </View>
                <View>
                  <Text style={styles.appearanceTitle}>{t('settings.languageTitle')}</Text>
                  <Text style={styles.appearanceSub}>{currentLanguageLabel}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
            </Pressable>
          </View>

          {/* SYNCHRONIZATION */}
          <Text style={styles.sectionLabel}>{t('settings.sectionSync')}</Text>

          {/* Cloud Sync Card */}
          <View style={styles.card}>
            <View style={styles.syncHeader}>
              <View style={styles.syncIconBox}>
                <Ionicons name="cloud-outline" size={22} color={theme.colors.primary} />
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{t('settings.cloudSyncBadge')}</Text>
              </View>
            </View>
            <Text style={styles.syncTitle}>{t('settings.cloudSyncTitle')}</Text>
            <Text style={styles.syncDesc}>{t('settings.cloudSyncDesc')}</Text>
            <Pressable
              style={styles.iCloudButton}
              accessibilityLabel={t('settings.configureIcloud')}
              accessibilityRole="button"
            >
              <Text style={styles.iCloudButtonText}>{t('settings.configureIcloud')}</Text>
            </Pressable>
          </View>

          {/* Privacy First Card */}
          <View style={[styles.card, styles.cardTopMargin]}>
            <View style={styles.privacyIconBox}>
              <Ionicons name="shield-outline" size={22} color={theme.colors.primary} />
            </View>
            <Text style={styles.syncTitle}>{t('settings.privacyTitle')}</Text>
            <Text style={styles.syncDesc}>{t('settings.privacyDesc')}</Text>
            <Pressable accessibilityLabel={t('settings.privacyLink')} accessibilityRole="link">
              <Text style={styles.privacyLink}>{t('settings.privacyLink')}</Text>
            </Pressable>
          </View>

          {/* DATA PORTABILITY */}
          <Text style={styles.sectionLabel}>{t('settings.sectionData')}</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.dataRow}
              onPress={() => {
                exportCards().catch((err: unknown) => {
                  Alert.alert(
                    t('settings.exportFailedTitle'),
                    err instanceof Error ? err.message : t('settings.errorUnexpected'),
                  );
                });
              }}
              accessibilityLabel={t('settings.exportLabel')}
              accessibilityRole="button"
              {...tid('exportCardsRow')}
            >
              <View style={styles.dataRowLeft}>
                <View style={styles.dataIconBox}>
                  <Ionicons name="document-outline" size={18} color={theme.colors.textSecondary} />
                </View>
                <View style={styles.dataRowText}>
                  <Text style={styles.dataRowTitle}>{t('settings.exportTitle')}</Text>
                  <Text style={styles.dataRowDesc}>{t('settings.exportDesc')}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textTertiary} />
            </Pressable>

            <View style={styles.dataDivider} />

            <Pressable
              style={styles.dataRow}
              accessibilityLabel={t('settings.importLabel')}
              accessibilityRole="button"
            >
              <View style={styles.dataRowLeft}>
                <View style={styles.dataIconBox}>
                  <Ionicons name="arrow-up-outline" size={18} color={theme.colors.textSecondary} />
                </View>
                <View style={styles.dataRowText}>
                  <Text style={styles.dataRowTitle}>{t('settings.importTitle')}</Text>
                  <Text style={styles.dataRowDesc}>{t('settings.importDesc')}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textTertiary} />
            </Pressable>
          </View>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <Pressable accessibilityLabel={t('settings.footerTerms')} accessibilityRole="link">
              <Text style={styles.footerLink}>{t('settings.footerTerms')}</Text>
            </Pressable>
            <Text style={styles.footerDivider}> </Text>
            <Pressable accessibilityLabel={t('settings.footerPrivacy')} accessibilityRole="link">
              <Text style={styles.footerLink}>{t('settings.footerPrivacy')}</Text>
            </Pressable>
            <Text style={styles.footerDivider}> </Text>
            <Pressable accessibilityLabel={t('settings.footerSecurity')} accessibilityRole="link">
              <Text style={styles.footerLink}>{t('settings.footerSecurity')}</Text>
            </Pressable>
          </View>
          <Text style={styles.footerVersion}>{t('settings.version', { version: appVersion })}</Text>
        </ScrollView>
      </ScreenShell>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.extraBold,
    fontSize: 20,
    color: theme.colors.text,
  },
  scroll: {
    paddingBottom: theme.spacing.xxl,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.extraBold,
    fontSize: theme.typography.fontSize.display,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  pageSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.md,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 1.5,
    paddingHorizontal: theme.spacing.md + 4,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  card: {
    marginHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    ...theme.subtleShadow,
  },
  cardTopMargin: {
    marginTop: theme.spacing.sm,
  },
  // Appearance
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appearanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  appearanceIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appearanceTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  appearanceSub: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  themePills: {
    flexDirection: 'row',
    backgroundColor: theme.colors.containerLow,
    borderRadius: theme.radius.md,
    padding: 3,
    gap: 2,
  },
  pill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.radius.sm,
  },
  pillActive: {
    backgroundColor: theme.colors.containerLowest,
  },
  pillText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  pillTextActive: {
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
  },
  // Cloud Sync
  syncHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  syncIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    backgroundColor: theme.colors.containerHigh,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  syncTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  syncDesc: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  iCloudButton: {
    backgroundColor: theme.colors.containerLow,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.sm + 2,
    alignItems: 'center',
  },
  iCloudButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  // Privacy
  privacyIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  privacyLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    textDecorationLine: 'underline',
  },
  // Data
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  dataRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  dataIconBox: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.containerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataRowText: {
    flex: 1,
  },
  dataRowTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  dataRowDesc: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  dataDivider: {
    height: 1,
    backgroundColor: theme.colors.containerHigh,
    marginVertical: theme.spacing.xs,
  },
  // Footer
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    flexWrap: 'wrap',
    gap: 4,
  },
  footerLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    letterSpacing: 0.5,
  },
  footerDivider: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  footerVersion: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
}));
