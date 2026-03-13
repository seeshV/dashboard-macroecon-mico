export default function InsightCard({ title, items }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-zinc-400">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
