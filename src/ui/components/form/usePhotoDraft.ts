import { useCallback, useEffect, useRef, useState } from 'react';
import { type CardPhotos, compactPhotos, photoFileNames } from '@/domain/card';
import { deletePhotos, photoExists, savePhoto } from '@/infra/photos/cardPhotos';

export type PhotoSide = keyof CardPhotos;

export type PhotoDraft = {
  readonly photos: CardPhotos;
  readonly addPhoto: (side: PhotoSide, sourceUri: string) => Promise<void>;
  readonly removePhoto: (side: PhotoSide) => void;
  readonly result: () => CardPhotos | undefined;
  readonly commit: () => void;
};

function presentPhotos(photos: CardPhotos | undefined): CardPhotos {
  const keep = (name: string | undefined) => (name && photoExists(name) ? name : undefined);
  return { front: keep(photos?.front), back: keep(photos?.back) };
}

export function usePhotoDraft(initial: CardPhotos | undefined): PhotoDraft {
  const [original] = useState(() => photoFileNames(initial));
  const [photos, setPhotos] = useState<CardPhotos>(() => presentPhotos(initial));
  const latest = useRef(photos);
  const added = useRef<readonly string[]>([]);
  const mounted = useRef(true);
  const committed = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (!committed.current) deletePhotos(added.current);
    };
  }, []);

  const replace = useCallback((side: PhotoSide, fileName: string | undefined) => {
    const previous = latest.current[side];
    latest.current = { ...latest.current, [side]: fileName };
    setPhotos(latest.current);
    if (previous && added.current.includes(previous)) {
      deletePhotos([previous]);
      added.current = added.current.filter((name) => name !== previous);
    }
  }, []);

  const addPhoto = useCallback(
    async (side: PhotoSide, sourceUri: string) => {
      const fileName = await savePhoto(sourceUri);
      if (!mounted.current || committed.current) {
        deletePhotos([fileName]);
        return;
      }
      added.current = [...added.current, fileName];
      replace(side, fileName);
    },
    [replace],
  );

  const removePhoto = useCallback((side: PhotoSide) => replace(side, undefined), [replace]);

  const result = useCallback(() => compactPhotos(latest.current), []);

  const commit = useCallback(() => {
    committed.current = true;
    const kept = new Set(photoFileNames(latest.current));
    deletePhotos(original.filter((name) => !kept.has(name)));
  }, [original]);

  return { photos, addPhoto, removePhoto, result, commit };
}
