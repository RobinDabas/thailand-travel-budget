export default function TripSettings({ trip, onChange }) {
  // Convert the input text to a number, falling back to 0 if it is empty
  const num = (value) => (value === '' ? 0 : Number(value))

  return (
    <section className="card">
      <h2>Trip settings</h2>
      <div className="grid">
        <label>
          Total budget (THB)
          <input
            type="number"
            min="0"
            value={trip.budget}
            onChange={(e) => onChange({ budget: num(e.target.value) })}
          />
        </label>
        <label>
          Trip length (days)
          <input
            type="number"
            min="1"
            value={trip.days}
            onChange={(e) => onChange({ days: num(e.target.value) })}
          />
        </label>
      </div>
    </section>
  )
}
