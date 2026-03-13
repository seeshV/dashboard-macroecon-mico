import { useMemo, useState } from 'react';
import { estimateScenario, formatCurrency, formatNumber, PERIODS } from '../../utils/indicators';

const INVESTMENT_OPTIONS = [
  { key: 'titulos', label: 'Títulos' },
  { key: 'fiis', label: 'FIIs' },
  { key: 'acoes', label: 'Ações' },
  { key: 'crypto', label: 'Crypto' },
];

export default function ProfitCalculator({ rates }) {
  const [amount, setAmount] = useState(5000);
  const [investmentType, setInvestmentType] = useState('titulos');

  const rows = useMemo(() => {
    const annualRate = rates[investmentType] ?? 0;

    return Object.entries(PERIODS).map(([label, months]) => {
      const projected = estimateScenario({
        amount: Number(amount),
        annualRate,
        months,
      });

      return {
        label,
        projected,
        profit: projected - Number(amount),
      };
    });
  }, [amount, investmentType, rates]);

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Calculadora de cenários</h2>
      <p className="mt-1 text-xs text-zinc-400">Estimativas educacionais, não recomendação de investimento.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-zinc-400">
          Valor inicial (R$)
          <input
            type="number"
            value={amount}
            min={100}
            step={100}
            onChange={(event) => setAmount(event.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-zinc-400">
          Tipo de investimento
          <select
            value={investmentType}
            onChange={(event) => setInvestmentType(event.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          >
            {INVESTMENT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
          <p className="text-xs text-zinc-400">Taxa anual estimada</p>
          <p className="text-xl font-semibold text-cyan-300">{formatNumber(rates[investmentType] ?? 0)}%</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-4">
        {rows.map((row) => (
          <article key={row.label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            <p className="text-xs uppercase tracking-wider text-zinc-400">{row.label}</p>
            <p className="mt-2 text-sm text-zinc-200">{formatCurrency(row.projected)}</p>
            <p className="text-xs text-emerald-400">+ {formatCurrency(row.profit)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
