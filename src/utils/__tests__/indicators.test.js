import { describe, expect, it } from 'vitest';
import { estimateScenario, getScenarioRates, sliceByPeriod } from '../indicators';

describe('indicators utils', () => {
  it('sliceByPeriod should return the last N points', () => {
    const series = Array.from({ length: 12 }).map((_, i) => ({ valor: i }));
    const result = sliceByPeriod(series, '6M');

    expect(result).toHaveLength(6);
    expect(result[0].valor).toBe(6);
  });

  it('estimateScenario should project compound growth', () => {
    const projection = estimateScenario({ amount: 1000, annualRate: 12, months: 12 });

    expect(projection).toBeGreaterThan(1100);
  });

  it('getScenarioRates should return positive rates', () => {
    const rates = getScenarioRates({
      selic: [{ valor: 11.25 }],
      ipca: [{ valor: 4.5 }],
      dolar: [{ valor: 5.2 }],
      crypto: [{ priceChangePercent: 2.1 }],
    });

    expect(rates.titulos).toBeGreaterThan(0);
    expect(rates.fiis).toBeGreaterThan(0);
    expect(rates.acoes).toBeGreaterThan(0);
    expect(rates.crypto).toBeGreaterThan(0);
  });
});
