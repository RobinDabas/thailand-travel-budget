import { formatMoney } from '../currencies'

export default function ExpenseList({
  expenses,
  rates,
  selected,
  displayCurrency,
  onDisplayChange,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <section className="card">
        <h2>Expenses</h2>
        <p className="hint">No expenses yet. Add your first one above.</p>
      </section>
    )
  }

  return (
    <section className="card">
      <div className="list-header">
        <h2>Expenses ({expenses.length})</h2>
        <label className="inline">
          Show in
          <select value={displayCurrency} onChange={(e) => onDisplayChange(e.target.value)}>
            {selected.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </label>
      </div>
      <ul className="expenses">
        {expenses.map((e) => (
          <li key={e.id}>
            <div>
              <strong>{e.description}</strong>
              <span className="meta">
                {e.category} · {e.date}
              </span>
            </div>
            <div className="right">
              <span>฿{e.amount.toLocaleString()}</span>
              <span className="meta">
                {formatMoney(e.amount * rates[displayCurrency], displayCurrency)}
              </span>
            </div>
            <button
              className="delete"
              onClick={() => onDelete(e.id)}
              aria-label={`Delete ${e.description}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
