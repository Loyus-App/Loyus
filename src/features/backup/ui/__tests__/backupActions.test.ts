import { Alert } from 'react-native';
import { useCardStore } from '@/entities/card/state/cardStore';
import { makeCard } from '@/entities/card/testing/makeCard';
import { useSettingsStore } from '@/entities/settings/state/settingsStore';
import { exportCards } from '../../infra/cardExport';
import { exportBackup } from '../backupActions';

jest.mock('../../infra/cardExport', () => ({ exportCards: jest.fn() }));
jest.mock('../../infra/cardImport', () => ({ pickBackupCards: jest.fn() }));
jest.mock('@/shared/i18n', () => ({ i18n: { t: (key: string) => key } }));

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
