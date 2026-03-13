export default function MetricCard({ title, value, unit, delta }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm shadow-black/30">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-emerald-400">
        {value} <span className="text-sm font-medium text-zinc-500">{unit}</span>
      </p>
      <p className="mt-2 text-xs text-zinc-400">Variação no período: {delta}</p>
    </article>
  );
}
