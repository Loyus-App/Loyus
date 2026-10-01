import { isLiquidGlassAvailable } from 'expo-glass-effect';
import type { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

type StackScreenOptions = NonNullable<ComponentProps<typeof Stack>['screenOptions']>;

const glassSheets = isLiquidGlassAvailable();

export function sheetBottomInset(safeAreaBottom: number): number {
  return glassSheets ? 0 : safeAreaBottom;
}

export const sheetOptions = {
  presentation: 'formSheet',
  headerShown: false,
  sheetGrabberVisible: true,
  ...(glassSheets ? { contentStyle: { backgroundColor: 'transparent' } } : {}),
} satisfies StackScreenOptions;

export const tabStackOptions = {
  headerLargeTitle: true,
  headerTransparent: Platform.OS === 'ios',
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal',
} satisfies StackScreenOptions;

export const modalOptions = {
  presentation: 'modal',
  headerShadowVisible: false,
  headerTransparent: Platform.OS === 'ios',
} satisfies StackScreenOptions;
