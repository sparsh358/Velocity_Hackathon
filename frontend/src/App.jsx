import { useState } from 'react'
import SearchForm from './components/SearchForm'
import ResultsSection from './components/ResultsSection'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async ({ countries, riskTolerance, duration }) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const params = new URLSearchParams({
        countries: countries.join(','),
        riskTolerance,
        duration
      })
      const res = await fetch(`/analyze?${params}`)
      if (!res.ok) throw new Error('Analysis failed. Check your inputs.')
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">GloBar <span className="logo-accent">Relocation</span></span>
          </div>
          <p className="tagline">AI-powered country ranking for smart relocation decisions</p>
        </div>
      </header>

      <main className="main">
        <SearchForm onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <p>Analyzing countries with live data...</p>
          </div>
        )}

        {results && <ResultsSection data={results} />}
      </main>

      <footer className="footer">
        <p>GloBar Relocation Intelligence © 2026 · Powered by live weather, AQI & advisory APIs</p>
      </footer>
    </div>
  )
}

export default App
