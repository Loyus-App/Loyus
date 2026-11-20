import { Alert } from 'react-native';
import { exportCards } from '@/infra/export/cardExport';
import { useCardStore } from '@/state/stores/cardStore';
import { useSettingsStore } from '@/state/stores/settingsStore';
import { makeCard } from '@/testing/makeCard';
import { exportBackup } from '../backup';

jest.mock('@/infra/export/cardExport', () => ({ exportCards: jest.fn() }));
jest.mock('@/infra/export/cardImport', () => ({ pickBackupCards: jest.fn() }));
jest.mock('@/infra/i18n', () => ({ i18n: { t: (key: string) => key } }));

const mockExportCards = jest.mocked(exportCards);
const card = makeCard({ id: 'c1', name: 'Alpha' });

beforeEach(() => {
  jest.clearAllMocks();
  useSettingsStore.setState({ lastBackupAt: null });
  useCardStore.setState({ cards: { [card.id]: card } });
});

describe('exportBackup', () => {
  it('records the backup once the file was shared', async () => {
    mockExportCards.mockResolvedValue(true);
    await exportBackup();
    expect(useSettingsStore.getState().lastBackupAt).toEqual(expect.any(Number));
  });

  it('records nothing when the share sheet was dismissed', async () => {
    mockExportCards.mockResolvedValue(false);
    await exportBackup();
    expect(useSettingsStore.getState().lastBackupAt).toBeNull();
  });

  it('records nothing for an empty wallet', async () => {
    useCardStore.setState({ cards: {} });
    mockExportCards.mockResolvedValue(true);
    await exportBackup();
    expect(useSettingsStore.getState().lastBackupAt).toBeNull();
  });

  it('explains a failed export', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
    mockExportCards.mockRejectedValue(new Error('disk full'));
    await exportBackup();
    expect(alert).toHaveBeenCalledWith('settings.exportFailedTitle', 'settings.exportFailedBody');
    expect(useSettingsStore.getState().lastBackupAt).toBeNull();
  });
});
