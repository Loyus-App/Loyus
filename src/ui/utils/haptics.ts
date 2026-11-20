import * as Haptics from 'expo-haptics';
import { ignore } from './ignore';

function play(feedback: () => Promise<void>): () => void {
  return () => {
    feedback().catch(ignore);
  };
}

export const haptics = {
  selection: play(() => Haptics.selectionAsync()),
  impact: play(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  light: play(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  success: play(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  warning: play(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
};
