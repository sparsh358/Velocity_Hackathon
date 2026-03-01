import CountryCard from './CountryCard'

const medalColors = ['🥇', '🥈', '🥉']

export default function ResultsSection({ data }) {
  const { metadata, input, weights, ranked, summary } = data

  return (
    <div className="results-section">
      {/* Summary Banner */}
      <div className="summary-banner">
        <div className="summary-item best">
          <span className="summary-label">Best Choice</span>
          <span className="summary-country">🏆 {summary.bestCountry}</span>
          <span className="summary-score">{summary.bestScore}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-meta">
          <p>📊 {metadata.totalAnalyzed} of {metadata.totalRequested} countries analyzed</p>
          <p>🎯 Risk: {input.riskTolerance} · {input.duration}</p>
          <p>🕐 {new Date(metadata.timestamp).toLocaleTimeString()}</p>
          {metadata.totalFailed > 0 && <p className="failed-note">⚠️ {metadata.totalFailed} country failed to load</p>}
        </div>
        <div className="summary-divider" />
        <div className="summary-item worst">
          <span className="summary-label">Least Recommended</span>
          <span className="summary-country">📍 {summary.worstCountry}</span>
          <span className="summary-score">{summary.worstScore}</span>
        </div>
      </div>

      {/* Weights Used */}
      <div className="weights-bar">
        <span className="weights-label">Weights Applied:</span>
        <span className="weight-pill travel">Travel {(weights.travelWeight * 100).toFixed(0)}%</span>
        <span className="weight-pill health">Health {(weights.healthWeight * 100).toFixed(0)}%</span>
        <span className="weight-pill env">Environment {(weights.environmentalWeight * 100).toFixed(0)}%</span>
      </div>

      {/* Country Cards */}
      <div className="cards-grid">
        {ranked.map((country, i) => (
          <CountryCard key={country.country} country={country} medal={medalColors[i] || `#${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
