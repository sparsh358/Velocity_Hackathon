import { useState } from 'react'

const DEFAULT_COUNTRIES = ['Japan', 'Germany', 'Australia']

export default function SearchForm({ onAnalyze, loading }) {
  const [countryInput, setCountryInput] = useState(DEFAULT_COUNTRIES.join(', '))
  const [riskTolerance, setRiskTolerance] = useState('Low')
  const [duration, setDuration] = useState('Long-term')
  const [inputError, setInputError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const countries = countryInput.split(',').map(c => c.trim()).filter(Boolean)
    if (countries.length < 3) {
      setInputError('Please enter at least 3 countries separated by commas.')
      return
    }
    setInputError('')
    onAnalyze({ countries, riskTolerance, duration })
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Compare Countries for Relocation</h2>
      <p className="form-subtitle">Enter at least 3 countries to get ranked recommendations based on live data</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Countries <span className="hint">(comma separated, min 3)</span></label>
          <input
            type="text"
            value={countryInput}
            onChange={e => setCountryInput(e.target.value)}
            placeholder="e.g. Japan, Germany, Australia, Canada"
            className="input"
          />
          {inputError && <p className="field-error">{inputError}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Risk Tolerance</label>
            <select value={riskTolerance} onChange={e => setRiskTolerance(e.target.value)} className="select">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Stay Duration</label>
            <select value={duration} onChange={e => setDuration(e.target.value)} className="select">
              <option value="Short-term">Short-term</option>
              <option value="Long-term">Long-term</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-analyze" disabled={loading}>
          {loading ? 'Analyzing...' : '🔍 Analyze Countries'}
        </button>
      </form>
    </div>
  )
}
