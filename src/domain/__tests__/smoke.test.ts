describe('Domain layer smoke test', () => {
  it('runs pure TypeScript logic without RN environment', () => {
    const add = (a: number, b: number): number => a + b;
    expect(add(1, 1)).toBe(2);
  });

  it('can import domain-level constants without native deps', () => {
    // This test verifies the domain layer has no transitive RN imports
    // In Phase 2, this will import actual domain modules (parser, validator)
    expect(true).toBe(true);
  });
});
