import { useCallback, useEffect, useRef, useState } from 'react';
import { type CardPhotos, compactPhotos } from '@/domain/card';
import { deletePhotos, photoExists, savePhoto } from '@/infra/persistence/cardPhotos';
import type { PhotoSide } from '@/ui/constants/photoSides';

export type PhotoDraft = {
  readonly photos: CardPhotos;
  readonly addPhoto: (side: PhotoSide, sourceUri: string) => Promise<void>;
  readonly removePhoto: (side: PhotoSide) => void;
  readonly settled: () => Promise<CardPhotos | undefined>;
  readonly commit: () => void;
};

function presentPhotos(photos: CardPhotos | undefined): CardPhotos {
  const keep = (name: string | undefined) => (name && photoExists(name) ? name : undefined);
  return { front: keep(photos?.front), back: keep(photos?.back) };
}

export function usePhotoDraft(initial: CardPhotos | undefined): PhotoDraft {
  const [photos, setPhotos] = useState<CardPhotos>(() => presentPhotos(initial));
  const latest = useRef(photos);
  const added = useRef<readonly string[]>([]);
  const pending = useRef(new Set<Promise<void>>());
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
    (side: PhotoSide, sourceUri: string) => {
      const task = savePhoto(sourceUri).then((fileName) => {
        if (!mounted.current || committed.current) {
          deletePhotos([fileName]);
          return;
        }
        added.current = [...added.current, fileName];
        replace(side, fileName);
      });
      pending.current.add(task);
      return task.finally(() => pending.current.delete(task));
    },
    [replace],
  );

  const removePhoto = useCallback((side: PhotoSide) => replace(side, undefined), [replace]);

  const settled = useCallback(async () => {
    await Promise.allSettled(pending.current);
    return compactPhotos(latest.current);
  }, []);

  const commit = useCallback(() => {
    committed.current = true;
  }, []);

  return { photos, addPhoto, removePhoto, settled, commit };
}
