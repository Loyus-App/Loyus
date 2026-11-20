import { isLikelyRotatingCode } from '../rotatingCode';

describe('isLikelyRotatingCode', () => {
  it('returns true for JWT pattern', () => {
    expect(isLikelyRotatingCode('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0')).toBe(true);
  });

  it('returns true for URL with token= param', () => {
    expect(isLikelyRotatingCode('https://example.com?token=abc123')).toBe(true);
  });

  it('returns true for URL with session= param', () => {
    expect(isLikelyRotatingCode('https://example.com?session=xyz')).toBe(true);
  });

  it('returns true for URL with auth= param', () => {
    expect(isLikelyRotatingCode('https://example.com?auth=secret')).toBe(true);
  });

  it('returns false for normal EAN-13', () => {
    expect(isLikelyRotatingCode('3250390000112')).toBe(false);
  });

  it('returns false for normal alphanumeric code', () => {
    expect(isLikelyRotatingCode('LOYALTY-CARD-123')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isLikelyRotatingCode('')).toBe(false);
  });
});
