import { backupStatus } from '../backup';

const at = (year: number, month: number, day: number, hour = 12): number =>
  new Date(year, month - 1, day, hour).getTime();

describe('backupStatus', () => {
  const now = at(2026, 9, 30, 18);

  it('reports that no backup was ever made', () => {
    expect(backupStatus(null, now)).toEqual({ kind: 'never' });
  });

  it('reports a backup made earlier the same day', () => {
    expect(backupStatus(at(2026, 9, 30, 0), now)).toEqual({ kind: 'today' });
  });

  it('dates an older backup from this year', () => {
    const last = at(2026, 9, 18);
    expect(backupStatus(last, now)).toEqual({ kind: 'earlier', at: last, sameYear: true });
  });

  it('flags a backup from a previous year', () => {
    const last = at(2025, 12, 31, 23);
    expect(backupStatus(last, now)).toEqual({ kind: 'earlier', at: last, sameYear: false });
  });

  it('does not mistake the same day of another month for today', () => {
    expect(backupStatus(at(2026, 8, 30), now).kind).toBe('earlier');
  });
});
