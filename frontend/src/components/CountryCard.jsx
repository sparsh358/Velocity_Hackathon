function ScoreBar({ label, value, color }) {
  return (
    <div className="score-bar-row">
      <span className="score-bar-label">{label}</span>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="score-bar-value">{value}</span>
    </div>
  )
}

export default function CountryCard({ country, medal }) {
  const { rank, country: name, finalScore, scoreBreakdown, individualScores, aiExplanation, error } = country

  // Error card for failed countries
  if (error) {
    return (
      <div className="country-card error-card">
        <div className="card-header">
          <div className="card-rank"><span className="medal">⚠️</span></div>
          <div className="card-title">
            <h3 className="country-name">{name}</h3>
          </div>
        </div>
        <p className="error-reason">Could not load data: {error}</p>
      </div>
    )
  }

  const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : ''

  return (
    <div className={`country-card ${rankClass}`}>
      {/* Card Header */}
      <div className="card-header">
        <div className="card-rank">
          <span className="medal">{medal}</span>
          <span className="rank-text">Rank #{rank}</span>
        </div>
        <div className="card-title">
          <h3 className="country-name">{name}</h3>
          <div className="final-score-badge">{finalScore}</div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="card-section">
        <p className="section-title">Score Breakdown</p>
        <ScoreBar label="Travel" value={scoreBreakdown.travelScore} color="var(--travel-color)" />
        <ScoreBar label="Health" value={scoreBreakdown.healthScore} color="var(--health-color)" />
        <ScoreBar label="Environment" value={scoreBreakdown.environmentalScore} color="var(--env-color)" />
      </div>

      {/* Individual Scores */}
      <div className="card-section">
        <p className="section-title">Individual Metrics</p>
        <div className="metrics-grid">
          <div className="metric-chip">
            <span className="metric-icon">💨</span>
            <span className="metric-label">Air Quality</span>
            <span className="metric-value">{individualScores.airQualityScore}</span>
          </div>
          <div className="metric-chip">
            <span className="metric-icon">🛡️</span>
            <span className="metric-label">Safety</span>
            <span className="metric-value">{individualScores.safetyScore}</span>
          </div>
          <div className="metric-chip">
            <span className="metric-icon">🌡️</span>
            <span className="metric-label">Climate</span>
            <span className="metric-value">{individualScores.climateScore}</span>
          </div>
          <div className="metric-chip">
            <span className="metric-icon">👥</span>
            <span className="metric-label">Density</span>
            <span className="metric-value">{individualScores.populationScore}</span>
          </div>
        </div>
        {individualScores.rawAdvisory != null && (
          <p className="advisory-note">World Bank Advisory Index: <strong>{individualScores.rawAdvisory}/100</strong></p>
        )}
      </div>

      {/* AI Explanation */}
      {aiExplanation && aiExplanation !== 'AI explanation unavailable.' && (
        <div className="card-section ai-section">
          <p className="section-title">🤖 AI Insight</p>
          <p className="ai-text">{aiExplanation}</p>
        </div>
      )}
    </div>
  )
}
