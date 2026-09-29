import type { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

type StackScreenOptions = NonNullable<ComponentProps<typeof Stack>['screenOptions']>;

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
