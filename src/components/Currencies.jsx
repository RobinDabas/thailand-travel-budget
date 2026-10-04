import { useState } from 'react'
import { CURRENCIES } from '../currencies'

const RATES_URL = 'https://open.er-api.com/v6/latest/THB'

export default function Currencies({ trip, onChange }) {
  const { rates, selected, ratesUpdated } = trip
  const [status, setStatus] = useState('idle') // idle | loading | error

  const toggle = (code) => {
    const set = new Set(selected)
    if (set.has(code)) set.delete(code)
    else set.add(code)
    if (set.size === 0) return // always keep at least one currency
    // keep the same order as the master list
    onChange({ selected: CURRENCIES.map((c) => c.code).filter((c) => set.has(c)) })
  }

  const setRate = (code, value) =>
    onChange({ rates: { ...rates, [code]: value === '' ? 0 : Number(value) } })

  const fetchLiveRates = async () => {
    setStatus('loading')
    try {
      const res = await fetch(RATES_URL)
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      if (data.result !== 'success') throw new Error('Bad response')

      const next = { ...rates }
      CURRENCIES.forEach((c) => {
        if (data.rates[c.code]) next[c.code] = data.rates[c.code]
      })
      onChange({ rates: next, ratesUpdated: new Date().toISOString().slice(0, 10) })
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="card">
      <h2>Currencies</h2>
      <p className="hint">Pick the currencies you want to see.</p>

      <div className="chips">
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            type="button"
            className={`chip ${selected.includes(c.code) ? 'on' : ''}`}
            onClick={() => toggle(c.code)}
            aria-pressed={selected.includes(c.code)}
            title={c.name}
          >
            {c.code}
          </button>
        ))}
      </div>

      <h3>Exchange rates (per 1 THB)</h3>
      <div className="grid">
        {CURRENCIES.filter((c) => selected.includes(c.code)).map((c) => (
          <label key={c.code}>
            {c.name} ({c.code})
            <input
              type="number"
              min="0"
              step="any"
              value={rates[c.code]}
              onChange={(e) => setRate(c.code, e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className="rate-actions">
        <button type="button" className="secondary" onClick={fetchLiveRates} disabled={status === 'loading'}>
          {status === 'loading' ? 'Fetching…' : 'Fetch live rates'}
        </button>
        {ratesUpdated && <span className="hint">Rates updated {ratesUpdated}</span>}
        {status === 'error' && (
          <span className="error">Couldn't fetch rates. Enter them manually.</span>
        )}
      </div>
      <p className="hint">
        Starting rates are rough estimates. Fetch live rates or edit them yourself before relying on the totals.
        Live rates by <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">Exchange Rate API</a>.
      </p>
    </section>
  )
}
