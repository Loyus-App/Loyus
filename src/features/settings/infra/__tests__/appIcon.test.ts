import { getAppIconName, setAlternateAppIcon } from 'expo-alternate-app-icons';
import { readAppIcon, writeAppIcon } from '../appIcon';

const getName = getAppIconName as jest.Mock;
const setIcon = setAlternateAppIcon as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('readAppIcon', () => {
  it('reads the active alternate icon', () => {
    getName.mockReturnValueOnce('Sunset');
    expect(readAppIcon()).toBe('sunset');
  });

  it('reads the primary icon as the default one', () => {
    getName.mockReturnValueOnce(null);
    expect(readAppIcon()).toBe('night');
  });
});

describe('writeAppIcon', () => {
  it('switches to the native alternate icon', async () => {
    await writeAppIcon('gold');
    expect(setIcon).toHaveBeenCalledWith('Gold');
  });

  it('resets to the primary icon for the default one', async () => {
    await writeAppIcon('night');
    expect(setIcon).toHaveBeenCalledWith(null);
  });

  it('passes native failures on', async () => {
    setIcon.mockRejectedValueOnce(new Error('unsupported'));
    await expect(writeAppIcon('mint')).rejects.toThrow('unsupported');
  });
});
