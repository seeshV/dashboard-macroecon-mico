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
