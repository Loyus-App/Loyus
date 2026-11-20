import * as WebBrowser from 'expo-web-browser';
import { ignore } from '@/shared/lib/ignore';

export function openLink(url: string): void {
  WebBrowser.openBrowserAsync(url).catch(ignore);
}
