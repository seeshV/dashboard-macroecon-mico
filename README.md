# Dashboard Macroeconômico (Vite + React + Tailwind + Recharts)

Dashboard educacional com cenários de investimento baseados em indicadores macro (SELIC, IPCA, dólar), integração com API pública de corretora para cripto, recomendações por categoria e calculadora de projeção.

> **Importante:** todo conteúdo é apenas simulação/educação financeira. Não é recomendação de investimento.

## Stack

- **Build:** Vite
- **UI:** React
- **Estilo:** TailwindCSS
- **Gráficos:** Recharts
- **Ícones:** Lucide React
- **Data fetching/cache:** TanStack React Query
- **Testes:** Vitest + Testing Library

## Arquitetura

```text
src
 ├─ api
 │   ├─ bcb.js
 │   ├─ broker.js
 │   └─ tesouro.js
 ├─ components
 │   ├─ cards
 │   │   ├─ InsightCard.jsx
 │   │   ├─ MetricCard.jsx
 │   │   ├─ ProfitCalculator.jsx
 │   │   └─ RecommendationCard.jsx
 │   ├─ charts
 │   │   ├─ MacroChart.jsx
 │   │   └─ Sparkline.jsx
 │   └─ layout
 │       ├─ CategoryButtons.jsx
 │       ├─ Container.jsx
 │       ├─ Navbar.jsx
 │       └─ PeriodFilter.jsx
 ├─ hooks
 │   ├─ useBCBSeries.js
 │   ├─ useBrokerSnapshot.js
 │   └─ useTesouro.js
 ├─ pages
 │   └─ Dashboard.jsx
 ├─ test
 │   └─ setup.js
 ├─ utils
 │   └─ indicators.js
 ├─ App.jsx
 ├─ index.css
 └─ main.jsx
```

## Funcionalidades

- Filtro de período: **1M / 6M / 1A / 5A**.
- Comparação de múltiplos indicadores no mesmo gráfico (SELIC/IPCA/Dólar).
- API pública de corretora (Binance, endpoint público) para enriquecer cenário de cripto.
- Botões por classe de ativo: **Ações, FIIs, Títulos, Crypto**.
- Card de pré-análise com opinião macro e visão por categoria.
- Calculadora de cenários: usuário escolhe valor + tipo de ativo e vê projeção para 1M, 6M, 1A e 5A.
- Fallback local quando API externa falha.

## Como rodar

```bash
npm install
npm run dev
```

Abra: `http://localhost:5173`

Se estiver em WSL/VM, o projeto já sobe com `--host 0.0.0.0` no script `dev`.

## Testes

```bash
npm test
```

### Para que serve a camada de testes?

- Evita quebrar regras de negócio críticas (ex.: cálculo de projeção, seleção de período, regras de recomendação).
- Garante estabilidade de componentes importantes (ex.: calculadora e filtros).
- Reduz regressões quando o projeto crescer.

## Observação regulatória

O dashboard não faz indicação formal de investimentos. As taxas, cenários e opiniões são aproximações educacionais e podem divergir de resultados reais.
