const axios = require('axios');

/**
 * Fetch indicator from World Bank API
 */
async function fetchWorldBankIndicator(countryCode, indicator) {
  try {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&per_page=100`;

    const response = await axios.get(url);

    const data = response.data[1];

    // Find the most recent non-null value
    if (!data || data.length === 0) {
      return null;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].value != null) {
        return parseFloat(data[i].value);
      }
    }

    return null;

  } catch (error) {
    console.error("World Bank API Error:", error.message);
    return null;
  }
}

function normalizeHomicideRate(value) {
  if (value == null) return 50; // neutral fallback

  const normalized = (value / 50) * 100;
  const safeScore = 100 - normalized;

  return Math.max(0, Math.min(100, safeScore));
}

/**
 * Normalize political stability index
 * Range approx: -2.5 to +2.5
 */
function normalizePoliticalStability(value) {
  if (value == null) return 50;

  const normalized = ((value + 2.5) / 5) * 100;

  return Math.max(0, Math.min(100, normalized));
}

async function fetchAdvisoryScore(countryCode) {

  // World Bank indicators
  const HOMICIDE_INDICATOR = "VC.IHR.PSRC.P5";
  const POLITICAL_STABILITY_INDICATOR = "PV.EST";

  const [homicideRate, politicalStability] = await Promise.all([
    fetchWorldBankIndicator(countryCode, HOMICIDE_INDICATOR),
    fetchWorldBankIndicator(countryCode, POLITICAL_STABILITY_INDICATOR)
  ]);

  const homicideScore = normalizeHomicideRate(homicideRate);
  const stabilityScore = normalizePoliticalStability(politicalStability);

  // Weighted average
  const advisoryScore =
    homicideScore * 0.5 +
    stabilityScore * 0.5;

  return {
    advisoryScore,
    homicideRate,
    politicalStability
  };
}

module.exports = {
  fetchAdvisoryScore
};