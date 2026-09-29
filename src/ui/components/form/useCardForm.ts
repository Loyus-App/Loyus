import { useEffect, useRef, useState } from 'react';
import type { TextInputInstance } from 'react-native';
import { type Brand, brandById, matchBrand } from '@/domain/brand';
import { BarcodeFormat, type CardPhotos } from '@/domain/card';
import { deviceRegion } from '@/infra/platform/region';
import { useUiStore } from '@/state/stores/uiStore';
import { haptics } from '@/ui/utils/haptics';
import { usePhotoDraft } from './usePhotoDraft';
import { type FormIssues, findIssues } from './validation';

export type CardFormValues = {
  readonly name: string;
  readonly code: string;
  readonly format: BarcodeFormat;
  readonly color?: string | undefined;
  readonly brandId?: string | undefined;
  readonly owner?: string | undefined;
  readonly note?: string | undefined;
  readonly photos?: CardPhotos | undefined;
  readonly isPinned: boolean;
};

export type CardFormInitial = Partial<CardFormValues>;

type Draft = {
  readonly name: string;
  readonly code: string;
  readonly owner: string;
  readonly note: string;
};

type TextField = keyof Draft;

const FOCUS_AFTER_SHEET_MS = 450;

function draftOf(initial: CardFormInitial | undefined): Draft {
  return {
    name: initial?.name ?? '',
    code: initial?.code ?? '',
    owner: initial?.owner ?? '',
    note: initial?.note ?? '',
  };
}

function valuesOf(
  draft: Draft,
  choices: Pick<CardFormValues, 'format' | 'color' | 'brandId' | 'photos' | 'isPinned'>,
): CardFormValues {
  const owner = draft.owner.trim();
  const note = draft.note.trim();
  return {
    name: draft.name.trim(),
    code: draft.code.trim(),
    format: choices.format,
    color: choices.color,
    brandId: choices.brandId,
    owner: owner || undefined,
    note: note || undefined,
    photos: choices.photos,
    isPinned: choices.isPinned,
  };
}

export function useCardForm(
  initial: CardFormInitial | undefined,
  { autoLinkBrand }: { readonly autoLinkBrand: boolean },
) {
  const [start] = useState(() => draftOf(initial));
  const text = useRef<Draft>(start);
  const nameRef = useRef<TextInputInstance>(null);
  const codeRef = useRef<TextInputInstance>(null);
  const [draft, setDraft] = useState<Draft>(start);
  const [format, setFormat] = useState<BarcodeFormat>(initial?.format ?? BarcodeFormat.CODE128);
  const [color, setColor] = useState<string | undefined>(initial?.color);
  const [brandId, setBrandId] = useState<string | undefined>(initial?.brandId);
  const [brandDismissed, setBrandDismissed] = useState(false);
  const [nameField, setNameField] = useState({ key: 0, value: start.name });
  const [region] = useState(deviceRegion);
  const [isPinned, setPinned] = useState(initial?.isPinned ?? false);
  const [attempted, setAttempted] = useState(false);
  const submitting = useRef(false);
  const photoDraft = usePhotoDraft(initial?.photos);

  const change = (field: TextField) => (value: string) => {
    text.current = { ...text.current, [field]: value };
    setDraft(text.current);
  };

  const pickBrand = (brand: Brand): void => {
    haptics.selection();
    text.current = { ...text.current, name: brand.name };
    setDraft(text.current);
    setNameField((field) => ({ key: field.key + 1, value: brand.name }));
    setBrandId(brand.id);
    setBrandDismissed(false);
    setColor(undefined);
  };

  const clearBrand = (): void => {
    haptics.selection();
    setBrandId(undefined);
    setBrandDismissed(true);
  };

  const chooseOtherStore = (): void => {
    if (text.current.name === brandById(brandId)?.name) {
      text.current = { ...text.current, name: '' };
      setDraft(text.current);
      setNameField((field) => ({ key: field.key + 1, value: '' }));
    }
    clearBrand();
    setTimeout(() => nameRef.current?.focus(), FOCUS_AFTER_SHEET_MS);
  };

  const onPick = useRef({ pickBrand, chooseOtherStore });
  onPick.current = { pickBrand, chooseOtherStore };
  const brandPick = useUiStore((state) => state.brandPick);

  useEffect(() => {
    if (!brandPick) return;
    const pick = useUiStore.getState().takeBrandPick();
    const brand = brandById(pick?.brandId ?? undefined);
    if (brand) {
      onPick.current.pickBrand(brand);
      return;
    }
    onPick.current.chooseOtherStore();
  }, [brandPick]);

  const linkedBrand = (name: string): string | undefined => {
    if (brandId || !autoLinkBrand || brandDismissed) return brandId;
    return matchBrand(name, region)?.id;
  };

  const issues: FormIssues = attempted ? findIssues(draft.name, draft.code, format) : {};

  const submit = (onValid: (values: CardFormValues) => void): void => {
    if (submitting.current) return;
    const current = text.current;
    const found = findIssues(current.name, current.code, format);
    setDraft(current);
    setAttempted(true);
    if (found.name || found.code) {
      haptics.warning();
      (found.name ? nameRef : codeRef).current?.focus();
      return;
    }
    submitting.current = true;
    const choices = { format, color, brandId: linkedBrand(current.name), isPinned };
    photoDraft
      .settled()
      .then((photos) => {
        onValid(valuesOf(current, { ...choices, photos }));
        photoDraft.commit();
      })
      .finally(() => {
        submitting.current = false;
      });
  };

  return {
    start,
    draft,
    format,
    color,
    brandId: linkedBrand(draft.name),
    region,
    nameField,
    isPinned,
    issues,
    nameRef,
    codeRef,
    onNameChange: change('name'),
    onCodeChange: change('code'),
    onOwnerChange: change('owner'),
    onNoteChange: change('note'),
    photos: photoDraft.photos,
    addPhoto: photoDraft.addPhoto,
    removePhoto: photoDraft.removePhoto,
    setFormat,
    setColor,
    pickBrand,
    clearBrand,
    setPinned,
    submit,
  };
}
