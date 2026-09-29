const MARKS = /\p{M}+/gu;

export function foldText(value: string): string {
  return value.normalize('NFD').replace(MARKS, '').toLowerCase();
}
