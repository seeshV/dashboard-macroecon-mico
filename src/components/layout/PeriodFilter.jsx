const PERIOD_OPTIONS = ['1M', '6M', '1A', '5A'];

export default function PeriodFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PERIOD_OPTIONS.map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => onChange(period)}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            active === period
              ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
              : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
