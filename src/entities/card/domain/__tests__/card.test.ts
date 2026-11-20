import { BarcodeFormat } from '@/entities/barcode/domain/barcodeFormat';
import { makeCard } from '../../testing/makeCard';
import {
  type CardId,
  cardInitials,
  cardSubtitle,
  compactPhotos,
  createCard,
  droppedPhotos,
  findDuplicate,
  photoFileNames,
} from '../card';

describe('createCard', () => {
  const baseInput = {
    id: 'test-uuid-1234' as CardId,
    name: 'Carrefour',
    code: '4006381333931',
    format: BarcodeFormat.EAN13,
  };

  it('returns a Card with correct fields', () => {
    const card = createCard(baseInput);

    expect(card.id).toBe('test-uuid-1234');
    expect(card.name).toBe('Carrefour');
    expect(card.code).toBe('4006381333931');
    expect(card.format).toBe(BarcodeFormat.EAN13);
  });

  it('starts unpinned and never opened', () => {
    const card = createCard(baseInput);
    expect(card.isPinned).toBe(false);
    expect(card.openCount).toBe(0);
    expect(card.lastOpenedAt).toBeUndefined();
  });

  it('trims text fields and drops blank optional ones', () => {
    const card = createCard({ ...baseInput, name: '  Carrefour ', owner: '  ', note: ' Léa ' });
    expect(card.name).toBe('Carrefour');
    expect(card.owner).toBeUndefined();
    expect(card.note).toBe('Léa');
  });

  it('keeps the owner and pinned flag when provided', () => {
    const card = createCard({ ...baseInput, owner: 'Léa', isPinned: true });
    expect(card.owner).toBe('Léa');
    expect(card.isPinned).toBe(true);
  });

  it('sets timestamps as numbers > 0', () => {
    const card = createCard(baseInput);
    expect(typeof card.createdAt).toBe('number');
    expect(typeof card.updatedAt).toBe('number');
    expect(card.createdAt).toBeGreaterThan(0);
    expect(card.updatedAt).toBeGreaterThan(0);
  });

  it('sets createdAt and updatedAt to the same value', () => {
    const card = createCard(baseInput);
    expect(card.createdAt).toBe(card.updatedAt);
  });

  it('preserves optional color when provided', () => {
    const card = createCard({ ...baseInput, color: '#FF0000' });
    expect(card.color).toBe('#FF0000');
  });

  it('preserves optional note when provided', () => {
    const card = createCard({ ...baseInput, note: 'Weekly shopping' });
    expect(card.note).toBe('Weekly shopping');
  });

  it('omits color when not provided', () => {
    const card = createCard(baseInput);
    expect(card.color).toBeUndefined();
  });

  it('omits note when not provided', () => {
    const card = createCard(baseInput);
    expect(card.note).toBeUndefined();
  });

  it('keeps photo file names and drops empty sides', () => {
    const card = createCard({ ...baseInput, photos: { front: 'front.jpg', back: '' } });
    expect(card.photos).toEqual({ front: 'front.jpg' });
  });

  it('omits photos when none are set', () => {
    const card = createCard({ ...baseInput, photos: { front: undefined } });
    expect(card).not.toHaveProperty('photos');
  });
});

describe('compactPhotos', () => {
  it('returns undefined without any photo', () => {
    expect(compactPhotos(undefined)).toBeUndefined();
    expect(compactPhotos({})).toBeUndefined();
    expect(compactPhotos({ front: '', back: undefined })).toBeUndefined();
  });

  it('keeps only the sides that are set', () => {
    expect(compactPhotos({ front: undefined, back: 'b.jpg' })).toEqual({ back: 'b.jpg' });
    expect(compactPhotos({ front: 'a.jpg', back: 'b.jpg' })).toEqual({
      front: 'a.jpg',
      back: 'b.jpg',
    });
  });
});

describe('photoFileNames', () => {
  it('lists the file names front first', () => {
    expect(photoFileNames({ front: 'a.jpg', back: 'b.jpg' })).toEqual(['a.jpg', 'b.jpg']);
    expect(photoFileNames({ back: 'b.jpg' })).toEqual(['b.jpg']);
  });

  it('is empty without photos', () => {
    expect(photoFileNames(undefined)).toEqual([]);
    expect(photoFileNames({ front: '' })).toEqual([]);
  });
});

describe('droppedPhotos', () => {
  it('lists the files an edit no longer keeps', () => {
    const before = { front: 'a.jpg', back: 'b.jpg' };
    expect(droppedPhotos(before, { front: 'c.jpg', back: 'b.jpg' })).toEqual(['a.jpg']);
    expect(droppedPhotos(before, undefined)).toEqual(['a.jpg', 'b.jpg']);
    expect(droppedPhotos(undefined, before)).toEqual([]);
  });
});

describe('cardSubtitle', () => {
  it('shows the owner before the format when there is one', () => {
    expect(cardSubtitle({ owner: 'Sam', format: BarcodeFormat.EAN13 })).toBe('Sam · EAN-13');
    expect(cardSubtitle({ format: BarcodeFormat.ITF })).toBe('ITF');
  });
});

describe('cardInitials', () => {
  it.each([
    ['Carrefour', 'CA'],
    ['Leroy Merlin', 'LM'],
    ['Petal & Stem', 'PS'],
    ['H&M', 'HM'],
    ['  décathlon  sport ', 'DS'],
    ['Ö', 'Ö'],
    ['', '?'],
  ])('%s -> %s', (name, initials) => {
    expect(cardInitials(name)).toBe(initials);
  });
});

describe('findDuplicate', () => {
  const cards = [
    makeCard({ id: 'a', name: 'A', code: '111' }),
    makeCard({ id: 'b', name: 'B', code: '222' }),
  ];

  it('finds a card with the same code', () => {
    expect(findDuplicate(cards, ' 222 ')?.id).toBe('b');
  });

  it('ignores the card being edited', () => {
    expect(findDuplicate(cards, '222', 'b' as CardId)).toBeUndefined();
  });

  it('returns undefined for a blank code', () => {
    expect(findDuplicate(cards, '  ')).toBeUndefined();
  });
});
