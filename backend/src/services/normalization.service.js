function normalizeAQI(rawAQI) {
  if (rawAQI == null || rawAQI < 1 || rawAQI > 5) return 50; // neutral fallback
  return ((rawAQI - 1) / 4) * 100;
}

function normalizeAdvisory(advisoryScore) {
  if (advisoryScore == null) return 50; // neutral — neither good nor bad
  const val = parseFloat(advisoryScore);
  if (isNaN(val)) return 50;
  // advisoryScore 0–100 where higher = safer → danger level
  return Math.max(0, Math.min(100, 100 - val));
}

function normalizeTemperature(temp) {
  if (temp == null || isNaN(temp)) return 50; // neutral fallback

  const idealMin = 18;
  const idealMax = 28;

  if (temp >= idealMin && temp <= idealMax) return 100;

  const diff = temp < idealMin
    ? idealMin - temp
    : temp - idealMax;

  return Math.max(0, 100 - diff * 5);
}

function normalizePopulation(pop) {
  if (!pop || isNaN(pop)) return 50; // neutral fallback
  const maxPopulation = 1_500_000_000;
  return Math.min(100, (pop / maxPopulation) * 100);
}

function normalizeCountryData(raw) {
  // Guard: if aggregation returned error object, pass through
  if (raw.error) return { country: raw.country, error: raw.error };

  return {
    country: raw.country,
    normalizedAQI: normalizeAQI(raw.rawAQI),
    normalizedAdvisory: normalizeAdvisory(raw.advisoryScore),
    temperatureScore: normalizeTemperature(raw.temperature),
    populationPressure: normalizePopulation(raw.population),
    dataQuality: raw.dataQuality || {},
    raw
  };
}

module.exports = { normalizeCountryData };