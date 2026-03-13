import { useState } from 'react';
import InsightCard from '../components/cards/InsightCard';
import MetricCard from '../components/cards/MetricCard';
import ProfitCalculator from '../components/cards/ProfitCalculator';
import RecommendationCard from '../components/cards/RecommendationCard';
import MacroChart from '../components/charts/MacroChart';
import Sparkline from '../components/charts/Sparkline';
import CategoryButtons from '../components/layout/CategoryButtons';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import PeriodFilter from '../components/layout/PeriodFilter';
import { useBCBSeries } from '../hooks/useBCBSeries';
import { useBrokerSnapshot } from '../hooks/useBrokerSnapshot';
import { useTesouro } from '../hooks/useTesouro';
import {
  buildMacroOpinion,
  formatDelta,
  formatNumber,
  getAssetRecommendations,
  getLatestValue,
  getScenarioRates,
  sliceByPeriod,
} from '../utils/indicators';

function buildComparisonSeries({ selic, ipca, dolar }) {
  return selic.map((item, index) => ({
    data: item.data,
    selic: item.valor,
    ipca: ipca[index]?.valor ?? null,
    dolar: dolar[index]?.valor ?? null,
  }));
}

export default function Dashboard() {
  const [period, setPeriod] = useState('1A');
  const [activeCategory, setActiveCategory] = useState('titulos');
  const [visibleIndicators, setVisibleIndicators] = useState(['selic', 'ipca', 'dolar']);

  const macroQuery = useBCBSeries();
  const tesouroQuery = useTesouro();
  const brokerQuery = useBrokerSnapshot();

  if (macroQuery.isLoading) {
    return <div className="p-10 text-center text-zinc-300">Carregando dashboard...</div>;
  }

  if (macroQuery.isError) {
    return <div className="p-10 text-center text-red-400">Erro ao carregar séries macroeconômicas.</div>;
  }

  const rawData = macroQuery.data;
  const scopedData = {
    selic: sliceByPeriod(rawData.selic, period),
    ipca: sliceByPeriod(rawData.ipca, period),
    dolar: sliceByPeriod(rawData.dolar, period),
  };

  const cards = [
    { title: 'Selic', series: scopedData.selic, unit: '%' },
    { title: 'IPCA', series: scopedData.ipca, unit: '%' },
    { title: 'Dólar', series: scopedData.dolar, unit: 'BRL' },
  ];

  const chartData = buildComparisonSeries(scopedData);
  const recommendations = getAssetRecommendations({
    ...scopedData,
    crypto: brokerQuery.data,
  });
  const activeRecommendation = recommendations[activeCategory];
  const scenarioRates = getScenarioRates({
    ...scopedData,
    crypto: brokerQuery.data,
  });

  const macroOpinion = buildMacroOpinion({
    ...scopedData,
    crypto: brokerQuery.data,
  });

  const insights = [
    macroOpinion,
    'Use o filtro de período (1M, 6M, 1A, 5A) para visualizar cenários de curto e longo prazo.',
    'A calculadora projeta cenários com base em taxas atuais e não representa promessa de retorno.',
  ];

  const toggleIndicator = (indicator) => {
    setVisibleIndicators((current) => {
      if (current.includes(indicator)) {
        return current.length === 1 ? current : current.filter((item) => item !== indicator);
      }

      return [...current, indicator];
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <Container>
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <PeriodFilter active={period} onChange={setPeriod} />
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              ['selic', 'SELIC'],
              ['ipca', 'IPCA'],
              ['dolar', 'Dólar'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleIndicator(key)}
                className={`rounded-full border px-3 py-1 ${
                  visibleIndicators.includes(key)
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                    : 'border-zinc-700 text-zinc-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

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
          <MacroChart
            title="Comparação de múltiplos indicadores"
            series={chartData}
            visibleIndicators={visibleIndicators}
          />
        </section>

        <section className="mt-6">
          <CategoryButtons active={activeCategory} onChange={setActiveCategory} />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <RecommendationCard
            title={activeRecommendation.titulo}
            items={activeRecommendation.items}
            disclaimer="Aviso: conteúdo educacional e de simulação. Não é recomendação de compra ou venda."
          />

          <InsightCard
            title="Tesouro Direto (referência)"
            items={
              tesouroQuery.data?.map(
                (item) => `${item.nome} • Taxa: ${item.taxaCompra}% • Venc: ${item.vencimento}`,
              ) ?? ['Carregando títulos...']
            }
          />
        </section>

        <section className="mt-6">
          <ProfitCalculator rates={scenarioRates} />
        </section>
      </Container>
    </div>
  );
}
