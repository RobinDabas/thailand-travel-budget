import { useEffect, useState } from 'react'
import TripSettings from './components/TripSettings'
import Currencies from './components/Currencies'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import { DEFAULT_RATES, DEFAULT_SELECTED } from './currencies'

const STORAGE_KEY = 'thailand-budget-v2'

const DEFAULT_TRIP = {
  budget: 60000, // total budget in Thai baht (THB)
  days: 14,
  rates: DEFAULT_RATES, // units of each currency per 1 THB
  selected: DEFAULT_SELECTED, // currencies shown in the app
  displayCurrency: 'CAD', // currency shown next to each expense
  ratesUpdated: '',
  expenses: [],
}

function loadTrip() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_TRIP
    const parsed = JSON.parse(saved)
    return {
      ...DEFAULT_TRIP,
      ...parsed,
      rates: { ...DEFAULT_RATES, ...parsed.rates },
    }
  } catch {
    return DEFAULT_TRIP
  }
}

export default function App() {
  const [trip, setTrip] = useState(loadTrip)

  // Save to localStorage whenever the trip changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
    } catch {
      // storage can fail (private mode, full); the app still works in memory
    }
  }, [trip])

  const update = (changes) => setTrip((t) => ({ ...t, ...changes }))

  const addExpense = (expense) =>
    setTrip((t) => ({ ...t, expenses: [expense, ...t.expenses] }))

  const deleteExpense = (id) =>
    setTrip((t) => ({ ...t, expenses: t.expenses.filter((e) => e.id !== id) }))

  const reset = () => {
    if (window.confirm('Clear all expenses and reset settings?')) {
      setTrip(DEFAULT_TRIP)
    }
  }

  // Make sure the display currency is always one of the selected ones
  const displayCurrency = trip.selected.includes(trip.displayCurrency)
    ? trip.displayCurrency
    : trip.selected[0]

  return (
    <main className="app">
      <header>
        <h1>🇹🇭 Thailand Travel Budget</h1>
        <p className="subtitle">Plan your trip in baht and see it in your own currency.</p>
      </header>

      <TripSettings trip={trip} onChange={update} />
      <Currencies trip={trip} onChange={update} />
      <Summary trip={trip} />
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={trip.expenses}
        rates={trip.rates}
        selected={trip.selected}
        displayCurrency={displayCurrency}
        onDisplayChange={(code) => update({ displayCurrency: code })}
        onDelete={deleteExpense}
      />

      <button className="link-button" onClick={reset}>
        Reset everything
      </button>
    </main>
  )
}
