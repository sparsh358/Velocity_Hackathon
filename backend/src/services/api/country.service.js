const axios = require("axios");

// Common aliases → official REST-Countries name
const NAME_ALIASES = {
  'usa': 'United States',
  'us': 'United States',
  'united states of america': 'United States',
  'uk': 'United Kingdom',
  'britain': 'United Kingdom',
  'great britain': 'United Kingdom',
  'england': 'United Kingdom',
  'south korea': 'South Korea',
  'north korea': 'North Korea',
  'czech republic': 'Czechia',
  'czechia': 'Czechia',
  'ivory coast': "Côte d'Ivoire",
  'cote divoire': "Côte d'Ivoire",
  'the gambia': 'Gambia',
  'uae': 'United Arab Emirates',
  'russia': 'Russia',
  'iran': 'Iran',
  'syria': 'Syria',
  'laos': 'Laos',
  'vietnam': 'Vietnam',
  'taiwan': 'Taiwan',
  'palestine': 'Palestine',
  'congo': 'DR Congo',
  'democratic republic of congo': 'DR Congo',
  'drc': 'DR Congo',
  'trinidad': 'Trinidad and Tobago',
  'myanmar': 'Myanmar',
  'burma': 'Myanmar',
  'turkey': 'Turkey',
  'turkiye': 'Turkey',
  'cape verde': 'Cape Verde',
  'swaziland': 'Eswatini',
  'new zealand': 'New Zealand',
  'saudi': 'Saudi Arabia',
  'ksa': 'Saudi Arabia',
};

/**
 * Fetch country profile data from REST Countries API
 * Tries alias lookup first, then exact match (fullText), then partial match.
 */
async function fetchCountryProfile(countryName) {
  const lower = countryName.toLowerCase().trim();
  const resolvedName = NAME_ALIASES[lower] || countryName;

  // Helper: extract profile from a REST Countries record
  const extract = (country) => ({
    country: country.name.common,
    capital: country.capital?.[0] || null,
    population: country.population,
    region: country.region,
    currency: Object.values(country.currencies || {})[0]?.name || null,
    cca2: country.cca2
  });

  // Helper: pick best match from array (prefer exact common name match)
  const bestMatch = (list, query) => {
    const q = query.toLowerCase();
    return (
      list.find(c => c.name.common.toLowerCase() === q) ||
      list.find(c => c.name.official.toLowerCase() === q) ||
      list[0]
    );
  };

  // 1. Try fullText=true first (exact match, avoids false positives)
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(resolvedName)}`,
      { params: { fullText: true }, timeout: 7000 }
    );
    if (res.data?.length) {
      const c = bestMatch(res.data, resolvedName);
      if (c.capital?.[0]) return extract(c);
    }
  } catch (_) { /* fall through to partial search */ }

  // 2. Partial search fallback
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(resolvedName)}`,
      { timeout: 7000 }
    );
    if (res.data?.length) {
      const c = bestMatch(res.data, resolvedName);
      if (c) return extract(c);
    }
  } catch (error) {
    console.error(`Country lookup failed for "${countryName}":`, error.response?.data?.message || error.message);
  }

  throw new Error(`Country "${countryName}" not found. Check spelling or try the full official name.`);
}

module.exports = {
  fetchCountryProfile
};