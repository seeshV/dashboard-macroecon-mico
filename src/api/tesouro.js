const TESOURO_FALLBACK = [
  { nome: 'Tesouro Selic 2029', taxaCompra: '11.08', vencimento: '01/03/2029' },
  { nome: 'Tesouro Prefixado 2027', taxaCompra: '12.44', vencimento: '01/01/2027' },
  { nome: 'Tesouro IPCA+ 2035', taxaCompra: '6.61', vencimento: '15/05/2035' },
];

export async function fetchTesouroTitles() {
  return TESOURO_FALLBACK;
}
