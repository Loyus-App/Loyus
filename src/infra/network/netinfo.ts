import NetInfo, {
  type NetInfoState,
  type NetInfoSubscription,
} from '@react-native-community/netinfo';
import { e2eOffline, isE2E } from '../env';

const FAKE_OFFLINE = {
  type: 'none',
  isConnected: false,
  isInternetReachable: false,
  details: null,
} as unknown as NetInfoState;

const FAKE_ONLINE = {
  type: 'wifi',
  isConnected: true,
  isInternetReachable: true,
  details: null,
} as unknown as NetInfoState;

/**
 * Fetch current connectivity. In E2E mode, reads EXPO_PUBLIC_E2E_OFFLINE
 * to simulate offline state deterministically.
 */
export async function fetchNetInfo(): Promise<NetInfoState> {
  if (isE2E) {
    return e2eOffline ? FAKE_OFFLINE : FAKE_ONLINE;
  }
  return await NetInfo.fetch();
}

/**
 * Subscribe to connectivity changes. In E2E mode, fires once with the
 * faked state and returns a no-op unsubscribe.
 */
export function subscribeNetInfo(callback: (state: NetInfoState) => void): NetInfoSubscription {
  if (isE2E) {
    callback(e2eOffline ? FAKE_OFFLINE : FAKE_ONLINE);
    return () => undefined;
  }
  return NetInfo.addEventListener(callback);
}
