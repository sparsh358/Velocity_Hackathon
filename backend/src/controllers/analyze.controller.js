const { generateExplanation } = require("../services/rag.services");
const { fetchCompleteCountryData } = require("../services/aggregation.service");
const { normalizeCountryData } = require("../services/normalization.service");
const { computeCountryScores } = require("../services/scoring.service");
const { getDynamicWeights } = require("../services/weight.service");
const { rankCountries } = require("../services/ranking.service");

async function analyzeCountries(req, res) {
  try {
    // 🔥 GET request → use req.query
    let { countries, riskTolerance, duration } = req.query;

    // --- Input Sanitization ---
    if (!countries) {
      return res.status(400).json({ error: "Provide at least 3 countries" });
    }

    // Clean: trim each name, remove empty entries, remove duplicates
    const rawList = countries.split(',').map(c => c.trim()).filter(Boolean);
    const uniqueCountries = [...new Set(rawList.map(c =>
      c.toLowerCase().replace(/\b\w/g, ch => ch.toUpperCase()) // Title Case
    ))];

    if (uniqueCountries.length < 3) {
      return res.status(400).json({ error: "Provide at least 3 unique countries" });
    }

    // Sanitize options with allowed values
    const validRisk = ['Low', 'Medium', 'High'];
    const validDuration = ['Short-term', 'Long-term'];
    const cleanRisk = validRisk.includes(riskTolerance) ? riskTolerance : 'Medium';
    const cleanDuration = validDuration.includes(duration) ? duration : 'Long-term';

    // 1️⃣ Aggregation
    const rawResults = await Promise.all(
      uniqueCountries.map(c => fetchCompleteCountryData(c))
    );

    // 2️⃣ Normalization
    const normalized = rawResults.map(normalizeCountryData);

    // 3️⃣ Scoring
    const scored = normalized.map(computeCountryScores);

    // 4️⃣ Dynamic Weights
    const weights = getDynamicWeights(cleanRisk, cleanDuration);

    // 5️⃣ Ranking (error countries are separated automatically)
    const ranked = rankCountries(scored, weights);
    const validRanked = ranked.filter(c => !c.error);
    const failedCountries = ranked.filter(c => c.error);

    const bestCountry = validRanked[0];
    const worstCountry = validRanked[validRanked.length - 1];

    // 6️⃣ RAG Layer (AI Explanation — only for valid ranked countries)
    const enrichedResults = await Promise.all(
      validRanked.map(async (country) => {
        const context = `
Country: ${country.country}
Final Score: ${country.finalScore}
Travel Score: ${country.scoreBreakdown?.travelScore}
Health Score: ${country.scoreBreakdown?.healthScore}
Environmental Score: ${country.scoreBreakdown?.environmentalScore}
Risk Tolerance: ${cleanRisk}
Duration: ${cleanDuration}
`;

        let explanation = null;
        try {
          explanation = await generateExplanation(context);
        } catch (aiErr) {
          console.warn(`AI explanation failed for ${country.country}: ${aiErr.message}`);
        }

        return {
          ...country,
          ...(explanation ? { aiExplanation: explanation } : {})
        };
      })
    );

    // Summary — only from valid countries
    const summary = bestCountry ? {
      bestCountry: bestCountry.country,
      bestScore: bestCountry.finalScore,
      worstCountry: worstCountry.country,
      worstScore: worstCountry.finalScore
    } : null;

    // Metadata
    const metadata = {
      totalRequested: uniqueCountries.length,
      totalAnalyzed: validRanked.length,
      totalFailed: failedCountries.length,
      timestamp: new Date().toISOString(),
      modelVersion: "1.0"
    };

    const responsePayload = {
      metadata,
      input: {
        countries: uniqueCountries,
        riskTolerance: cleanRisk,
        duration: cleanDuration
      },
      weights,
      ranked: [...enrichedResults, ...failedCountries],
      summary
    };

    res.json(responsePayload);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
}

module.exports = {
  analyzeCountries
};