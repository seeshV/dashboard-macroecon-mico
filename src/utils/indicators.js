export const PERIODS = {
  '1M': 1,
  '6M': 6,
  '1A': 12,
  '5A': 60,
};

export function getLatestValue(series) {
  if (!series?.length) return '-';
  return series[series.length - 1].valor;
}

export function formatNumber(value, decimals = 2) {
  if (typeof value !== 'number' || Number.isNaN(value)) return value;

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDelta(series) {
  if (!series?.length || series.length < 2) return '0,00';
  const first = series[0].valor;
  const last = series[series.length - 1].valor;
  return formatNumber(last - first);
}

export function sliceByPeriod(series, periodLabel) {
  const size = PERIODS[periodLabel] ?? 12;
  return series.slice(-size);
}

export function buildMacroOpinion({ selic, ipca, dolar, crypto }) {
  const lastSelic = getLatestValue(selic);
  const lastIpca = getLatestValue(ipca);
  const lastDolar = getLatestValue(dolar);
  const btcMomentum = crypto?.[0]?.priceChangePercent ?? 0;

  if (lastSelic >= 10 && lastIpca <= 5.5) {
    return 'Cenário favorece renda fixa pós-fixada (Tesouro Selic / CDB DI), mantendo parcela menor em risco.';
  }

  if (btcMomentum > 2 && lastDolar > 5.3) {
    return 'Momentum em cripto está positivo, mas dólar pressionado sugere diversificação e exposição gradual.';
  }

  return 'Cenário misto: combinar títulos atrelados à inflação, FIIs defensivos e pequena fatia em ações/cripto.';
}

export function getAssetRecommendations({ selic, ipca, dolar, crypto }) {
  const lastSelic = getLatestValue(selic);
  const lastIpca = getLatestValue(ipca);
  const lastDolar = getLatestValue(dolar);
  const btc = crypto?.[0];

  return {
    acoes: {
      titulo: 'Ações (perfil moderado/agressivo)',
      items: [
        lastSelic > 10
          ? 'Priorizar empresas resilientes e pagadoras de dividendos (energia/saneamento/bancos).'
          : 'Aumentar exposição em crescimento com gestão de risco.',
        `Dólar em ${formatNumber(lastDolar)} indica atenção para empresas exportadoras e hedge cambial.`,
      ],
    },
    fiis: {
      titulo: 'FIIs (renda mensal)',
      items: [
        lastSelic > 10
          ? 'Foco em FIIs de papel indexados ao CDI/IPCA e tijolo com contratos longos.'
          : 'Com queda de juros, tende a melhorar preço de FIIs de tijolo de qualidade.',
        `Com IPCA em ${formatNumber(lastIpca)}%, reequilibre entre papel e tijolo para reduzir volatilidade.`,
      ],
    },
    titulos: {
      titulo: 'Títulos (renda fixa)',
      items: [
        `Selic atual em ${formatNumber(lastSelic)}% favorece Tesouro Selic e CDB pós-fixado para caixa.`,
        'Para horizonte longo, combinar com Tesouro IPCA+ para proteção inflacionária.',
      ],
    },
    crypto: {
      titulo: 'Crypto (alto risco)',
      items: [
        btc
          ? `BTC ${btc.symbol} com variação de ${formatNumber(btc.priceChangePercent)}% em 24h: entrar em parcelas (DCA).`
          : 'Sem dados de corretora no momento; usar exposição pequena e parcelada.',
        'Manter limite de alocação e rebalancear para não concentrar risco.',
      ],
    },
  };
}

export function estimateScenario({ amount, annualRate, months }) {
  const monthly = annualRate / 12;
  const projected = amount * (1 + monthly / 100) ** months;
  return Number(projected.toFixed(2));
}

export function getScenarioRates({ selic, ipca, dolar, crypto }) {
  const lastSelic = getLatestValue(selic);
  const lastIpca = getLatestValue(ipca);
  const lastDolar = getLatestValue(dolar);
  const btcMomentum = crypto?.[0]?.priceChangePercent ?? 0;

  return {
    titulos: Math.max(lastSelic - 0.8, 0),
    fiis: Math.max(lastIpca + 6.5, 0),
    acoes: Math.max(8 + (5.2 - Math.min(lastDolar, 6)), 0),
    crypto: Math.max(12 + btcMomentum, 0),
  };
}
