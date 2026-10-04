# Thailand Travel Budget

A small React app for planning a trip to Thailand. Set a total budget in Thai baht (THB), log expenses by category, and see what you've spent, what's left, and your daily target, and view totals in 14 major traveler currencies (USD, EUR, GBP, CAD, AUD, SAR, AED, CNY, INR, MYR, SGD, JPY, KRW, RUB).

## Features
- Set total budget and trip length
- Choose which currencies to display, with editable exchange rates (or fetch live rates)
- Summary table showing budget, spent, remaining, and daily target in every selected currency
- Add and delete expenses with description, amount, category, and date
- Live summary: total spent, remaining (or over budget), daily target, % of budget used
- Spending breakdown by category
- Data saved in the browser with `localStorage`, so it persists between visits

## Built with
React 18, Vite, plain CSS

## Run locally
```bash
npm install
npm run dev
```
Then open the URL shown in the terminal (usually http://localhost:5173).

## What I practiced
- Component structure and passing props
- State with `useState` and side effects with `useEffect`
- Controlled form inputs and basic validation
- Derived values (totals, percentages) computed from state
- Persisting data with `localStorage`
- Fetching data from an API with `fetch` and handling errors

## Ideas for next steps
- Edit existing expenses
- Filter expenses by category or date
- Add a chart for category spending

## Exchange rates
Starting rates are rough placeholders. The "Fetch live rates" button uses the free [Exchange Rate API](https://www.exchangerate-api.com) open endpoint.
