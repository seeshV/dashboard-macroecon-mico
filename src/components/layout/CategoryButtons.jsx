const CATEGORIES = [
  { key: 'acoes', label: 'Ações' },
  { key: 'fiis', label: 'FIIs' },
  { key: 'titulos', label: 'Títulos' },
  { key: 'crypto', label: 'Crypto' },
];

export default function CategoryButtons({ active, onChange }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Categorias de recomendação</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => onChange(category.key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === category.key
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}
