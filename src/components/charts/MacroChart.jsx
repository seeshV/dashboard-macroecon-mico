import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const LINE_MAP = {
  selic: { label: 'SELIC', color: '#34d399' },
  ipca: { label: 'IPCA', color: '#f97316' },
  dolar: { label: 'Dólar', color: '#22d3ee' },
};

export default function MacroChart({ title, series, visibleIndicators }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">{title}</h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="4 4" stroke="#27272a" />
            <XAxis dataKey="data" stroke="#71717a" tick={{ fontSize: 11 }} />
            <YAxis stroke="#71717a" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #3f3f46' }}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Legend />
            {visibleIndicators.map((indicator) => (
              <Line
                key={indicator}
                type="monotone"
                dataKey={indicator}
                name={LINE_MAP[indicator].label}
                stroke={LINE_MAP[indicator].color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
