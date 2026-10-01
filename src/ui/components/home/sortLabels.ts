import type { SortMode } from '@/domain/sort';

export const SORT_LABEL_KEY = {
  mostUsed: 'home.sortMostUsed',
  recent: 'home.sortRecent',
  alphabetical: 'home.sortAlphabetical',
  manual: 'home.sortManual',
} as const satisfies Record<SortMode, string>;

export const SORT_A11Y_KEY = {
  ...SORT_LABEL_KEY,
  alphabetical: 'home.sortAlphabeticalLabel',
} as const satisfies Record<SortMode, string>;
