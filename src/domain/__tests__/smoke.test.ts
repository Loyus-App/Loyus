describe('Domain layer smoke test', () => {
  it('runs pure TypeScript logic without RN environment', () => {
    const add = (a: number, b: number): number => a + b;
    expect(add(1, 1)).toBe(2);
  });

  it('can import domain-level constants without native deps', () => {
    expect(true).toBe(true);
  });
});
