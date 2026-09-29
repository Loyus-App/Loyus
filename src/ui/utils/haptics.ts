import * as Haptics from 'expo-haptics';

const ignore = (): undefined => undefined;

export const haptics = {
  selection: () => Haptics.selectionAsync().catch(ignore),
  impact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(ignore),
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(ignore),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(ignore),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(ignore),
};
