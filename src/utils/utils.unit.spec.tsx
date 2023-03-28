import { formatPrice } from '.';

describe('Unit file (Unit)', () => {
  it('should format a number in currency ptBr format', () => {
    expect(formatPrice(400)).toBe('R$400.00');
  });

  it('should format a number with decimals in currency ptBr format', () => {
    expect(formatPrice(150.64999)).toBe('R$150.65');
  });
});
