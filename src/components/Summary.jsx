import { CATEGORIES } from '../categories'
import { CURRENCIES, formatMoney } from '../currencies'

export default function Summary({ trip }) {
  const { budget, days, rates, selected, expenses } = trip

  const spent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget - spent
  const perDay = days > 0 ? budget / days : 0
  const percentUsed = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const over = remaining < 0

  const byCategory = CATEGORIES.map((name) => ({
    name,
    total: expenses
      .filter((e) => e.category === name)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((c) => c.total > 0)

  return (
    <section className="card">
      <h2>Summary</h2>

      <div className="stats">
        <div>
          <span className="label">Spent</span>
          <strong>฿{spent.toLocaleString()}</strong>
        </div>
        <div>
          <span className="label">{over ? 'Over budget' : 'Remaining'}</span>
          <strong className={over ? 'bad' : 'good'}>
            ฿{Math.abs(remaining).toLocaleString()}
          </strong>
        </div>
        <div>
          <span className="label">Daily target</span>
          <strong>฿{Math.round(perDay).toLocaleString()}</strong>
        </div>
      </div>

      <div
        className="bar"
        role="progressbar"
        aria-valuenow={Math.round(percentUsed)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className={`bar-fill ${over ? 'bad-bg' : ''}`} style={{ width: `${percentUsed}%` }} />
      </div>
      <p className="hint">{Math.round(percentUsed)}% of budget used</p>

      <h3>In your currency</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>{over ? 'Over' : 'Left'}</th>
              <th>Per day</th>
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.filter((c) => selected.includes(c.code)).map((c) => {
              const r = rates[c.code]
              return (
                <tr key={c.code}>
                  <td>{c.code}</td>
                  <td>{formatMoney(budget * r, c.code)}</td>
                  <td>{formatMoney(spent * r, c.code)}</td>
                  <td className={over ? 'bad' : 'good'}>
                    {formatMoney(Math.abs(remaining) * r, c.code)}
                  </td>
                  <td>{formatMoney(perDay * r, c.code)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {byCategory.length > 0 && (
        <>
          <h3>By category</h3>
          <ul className="categories">
            {byCategory.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                <span>
                  ฿{c.total.toLocaleString()} ({Math.round((c.total / spent) * 100)}%)
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
