import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const resolvedLabel = label ?? t('copy.copyNumber');

  const handlePress = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(text);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fire-and-forget: clipboard access may fail on some platforms
    }
  }, [text]);

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      accessibilityLabel={copied ? t('copy.copiedLabel') : resolvedLabel}
      accessibilityRole="button"
      {...tid('copyNumberButton')}
    >
      <Ionicons
        name={copied ? 'checkmark' : 'copy-outline'}
        size={16}
        color={copied ? theme.colors.primary : theme.colors.textTertiary}
      />
      <Text style={[styles.label, copied && styles.labelCopied]}>
        {copied ? t('common.copied') : resolvedLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.containerLow,
    borderRadius: theme.radius.full,
    marginTop: theme.spacing.xs,
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
  },
  labelCopied: {
    color: theme.colors.primary,
  },
}));
