import MetricCard from '../components/cards/MetricCard';
import InsightCard from '../components/cards/InsightCard';
import MacroChart from '../components/charts/MacroChart';
import Sparkline from '../components/charts/Sparkline';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import { useBCBSeries } from '../hooks/useBCBSeries';
import { useTesouro } from '../hooks/useTesouro';
import { formatDelta, formatNumber, getLatestValue } from '../utils/indicators';

function buildComparisonSeries(selic, ipca) {
  return selic.map((item, index) => ({
    data: item.data,
    selic: item.valor,
    ipca: ipca[index]?.valor ?? null,
  }));
}

export default function Dashboard() {
  const macroQuery = useBCBSeries();
  const tesouroQuery = useTesouro();

  if (macroQuery.isLoading) {
    return <div className="p-10 text-center text-zinc-300">Carregando dashboard...</div>;
  }

  if (macroQuery.isError) {
    return <div className="p-10 text-center text-red-400">Erro ao carregar séries macroeconômicas.</div>;
  }

  const { selic, ipca, dolar } = macroQuery.data;

  const cards = [
    { title: 'Selic', series: selic, unit: '%' },
    { title: 'IPCA', series: ipca, unit: '%' },
    { title: 'Dólar', series: dolar, unit: 'BRL' },
  ];

  const chartData = buildComparisonSeries(selic, ipca);

  const insights = [
    'Selic segue acima de 10%, mantendo política monetária contracionista.',
    'IPCA acumulado desacelerou frente aos picos recentes.',
    'Dólar permanece em faixa lateral, com sensibilidade ao cenário externo.',
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <Container>
        <section className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="space-y-3">
              <MetricCard
                title={card.title}
                value={formatNumber(getLatestValue(card.series))}
                unit={card.unit}
                delta={formatDelta(card.series)}
              />
              <Sparkline data={card.series} />
            </div>
          ))}
        </section>

        <section className="mt-6">
          <MacroChart title="SELIC vs IPCA" series={chartData} />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <InsightCard title="Insights Macro" items={insights} />

          <InsightCard
            title="Tesouro Direto"
            items={
              tesouroQuery.data?.map(
                (item) => `${item.nome} • Taxa: ${item.taxaCompra}% • Venc: ${item.vencimento}`,
              ) ?? ['Carregando títulos...']
            }
          />
        </section>
      </Container>
    </div>
  );
}
