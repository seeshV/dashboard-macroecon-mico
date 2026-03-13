import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function MacroChart({ title, series }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">{title}</h2>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <XAxis dataKey="data" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #3f3f46' }}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Legend />
            <Line type="monotone" dataKey="selic" name="SELIC" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ipca" name="IPCA" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
