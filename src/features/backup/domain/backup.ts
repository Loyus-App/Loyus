export type BackupStatus =
  | { readonly kind: 'never' }
  | { readonly kind: 'today' }
  | { readonly kind: 'earlier'; readonly at: number; readonly sameYear: boolean };

function sameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear();
}

function sameDay(a: Date, b: Date): boolean {
  return sameYear(a, b) && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function backupStatus(lastBackupAt: number | null, now: number): BackupStatus {
  if (lastBackupAt === null) return { kind: 'never' };
  const last = new Date(lastBackupAt);
  const today = new Date(now);
  if (sameDay(last, today)) return { kind: 'today' };
  return { kind: 'earlier', at: lastBackupAt, sameYear: sameYear(last, today) };
}
