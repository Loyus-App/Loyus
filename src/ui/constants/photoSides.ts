import type { CardPhotos } from '@/domain/card';

export type PhotoSide = keyof CardPhotos;

export const PHOTO_SIDES: readonly PhotoSide[] = ['front', 'back'];

export const PHOTO_SIDE_TEXT = {
  front: { name: 'photos.front', label: 'photos.frontLabel' },
  back: { name: 'photos.back', label: 'photos.backLabel' },
} as const satisfies Record<PhotoSide, { name: string; label: string }>;
