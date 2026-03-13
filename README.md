O que foi implementado

- Integração com API pública de corretora via Binance (src/api/broker.js) para snapshot de cripto com fallback local.
- Pré-análise macro para opiniões de cenário com base em SELIC, IPCA, dólar e momentum de cripto.
- Botões de categorias de investimento (Ações, FIIs, Títulos, Crypto) no estilo de navegação por tipo.
- Card de recomendação dinâmica por categoria, com disclaimer educacional.
- Filtro de período 1M / 6M / 1A / 5A aplicado aos dados e ao gráfico.
- Comparação de múltiplos indicadores no mesmo gráfico (SELIC/IPCA/Dólar) com toggle de visibilidade.
- Calculadora de cenários: usuário escolhe valor + tipo de ativo e vê projeções para 1M, 6M, 1A e 5A.
- Atualização dos scripts de execução para facilitar acesso em ambiente local/WSL (--host 0.0.0.0).

Testes
- Estrutura de testes adicionada com Vitest + Testing Library.
- Testes criados para utilitários críticos (indicators) e componente crítico (ProfitCalculator).

Documentação
- README atualizado com novas funcionalidades, arquitetura expandida, instruções de execução/teste e explicação do propósito da camada de testes.

Limitações do ambiente
- npm install continua bloqueado por 403 Forbidden no registry, impedindo validação de execução e testes nesta sessão.
- Tentativa de screenshot automatizada falhou por indisponibilidade do servidor local no ambiente (ERR_EMPTY_RESPONSE).



# Dashboard Macroeconômico (Vite + React + Tailwind + Recharts)

Projeto organizado para evoluir com segurança antes de qualquer refatoração pesada, com separação clara entre API, hooks, componentes e páginas.

## Stack

- **Build:** Vite
- **UI:** React
- **Estilo:** TailwindCSS
- **Gráficos:** Recharts
- **Ícones:** Lucide React
- **Data fetching/cache:** TanStack React Query

## Arquitetura

```text
src
 ├─ api
 │   ├─ bcb.js
 │   └─ tesouro.js
 ├─ components
 │   ├─ cards
 │   │   ├─ MetricCard.jsx
 │   │   └─ InsightCard.jsx
 │   ├─ charts
 │   │   ├─ MacroChart.jsx
 │   │   └─ Sparkline.jsx
 │   └─ layout
 │       ├─ Navbar.jsx
 │       └─ Container.jsx
 ├─ hooks
 │   ├─ useBCBSeries.js
 │   └─ useTesouro.js
 ├─ pages
 │   └─ Dashboard.jsx
 ├─ utils
 │   └─ indicators.js
 ├─ App.jsx
 └─ main.jsx
```

## O que já está pronto

- Layout moderno de dashboard em tema escuro.
- Cards principais com **SELIC, IPCA e Dólar**.
- Gráfico principal com comparação **SELIC vs IPCA**.
- Sparkline por card para tendência rápida.
- Bloco de insights e bloco de Tesouro Direto.
- Cache e atualização automática usando React Query.
- Fallback local de dados para manter a interface funcional mesmo sem API externa.

## Como rodar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## Próximos passos recomendados

- Filtro de período: `1M`, `6M`, `1A`, `5A`.
- Comparação de múltiplos indicadores no mesmo gráfico.
- Heatmap macroeconômico.
- Exportação CSV/Excel.
- Camada de testes para hooks e componentes críticos.
