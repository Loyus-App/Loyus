import { useTranslation } from 'react-i18next';

export type SectionTitles = {
  readonly pinned: string;
  readonly others: string;
};

export function useSectionTitles(hasPinned: boolean, othersCount: number): SectionTitles {
  const { t } = useTranslation();
  return {
    pinned: t('home.sectionPinned'),
    others: hasPinned
      ? t('home.sectionOthers', { count: othersCount })
      : t('home.sectionAll', { count: othersCount }),
  };
}
