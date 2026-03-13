export function getLatestValue(series) {
  if (!series?.length) return '-';
  return series[series.length - 1].valor;
}

export function formatNumber(value, decimals = 2) {
  if (typeof value !== 'number') return value;

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatDelta(series) {
  if (!series?.length || series.length < 2) return '0,00';
  const first = series[0].valor;
  const last = series[series.length - 1].valor;
  return formatNumber(last - first);
}
