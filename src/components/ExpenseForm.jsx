import { useState } from 'react'
import { CATEGORIES } from '../categories'

const today = () => new Date().toISOString().slice(0, 10)

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(today())
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = Number(amount)

    if (!description.trim()) return setError('Add a short description.')
    if (!value || value <= 0) return setError('Enter an amount greater than 0.')

    onAdd({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: value,
      category,
      date,
    })

    setDescription('')
    setAmount('')
    setError('')
  }

  return (
    <section className="card">
      <h2>Add an expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Pad thai on Khao San Road"
            />
          </label>
          <label>
            Amount (THB)
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add expense</button>
      </form>
    </section>
  )
}
