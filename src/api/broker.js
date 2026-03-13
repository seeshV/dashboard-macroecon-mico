const BINANCE_TICKERS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

const FALLBACK = {
  BTCUSDT: { symbol: 'BTCUSDT', lastPrice: 68000, priceChangePercent: 2.8 },
  ETHUSDT: { symbol: 'ETHUSDT', lastPrice: 3500, priceChangePercent: 1.7 },
  BNBUSDT: { symbol: 'BNBUSDT', lastPrice: 610, priceChangePercent: -0.6 },
};

async function fetchTicker(symbol) {
  const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);

  if (!response.ok) {
    throw new Error(`Erro ao consultar Binance para ${symbol}`);
  }

  const payload = await response.json();

  return {
    symbol: payload.symbol,
    lastPrice: Number(payload.lastPrice),
    priceChangePercent: Number(payload.priceChangePercent),
  };
}

export async function fetchBrokerSnapshot() {
  try {
    const result = await Promise.all(BINANCE_TICKERS.map(fetchTicker));
    return result;
  } catch {
    return BINANCE_TICKERS.map((symbol) => FALLBACK[symbol]);
  }
}
