import { BarChart3, CalendarClock } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-2 text-zinc-100">
          <BarChart3 className="h-5 w-5 text-brand-500" />
          <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">Macro Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <CalendarClock className="h-4 w-4" />
          Atualização contínua com cache
        </div>
      </div>
    </header>
  );
}
