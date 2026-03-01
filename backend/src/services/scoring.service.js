function clamp(value, min = 0, max = 100) {
  if (value == null || isNaN(value)) return (min + max) / 2;
  return Math.min(max, Math.max(min, value));
}

function computeCountryScores(data) {
  // Guard: pass through error countries
  if (data.error) return { country: data.country, error: data.error };

  const normAQI = data.normalizedAQI ?? 50;   // 0=best air, 100=worst
  const normAdvisory = data.normalizedAdvisory ?? 50; // 0=safe, 100=dangerous
  const tempScore = data.temperatureScore ?? 50;
  const popPressure = data.populationPressure ?? 50;

  const safeAQI = 100 - normAQI;         // higher = cleaner air
  const safeAdvisory = 100 - normAdvisory; // higher = safer country

  const travelScore =
    safeAQI * 0.2 +
    safeAdvisory * 0.5 +
    tempScore * 0.3;

  const healthScore =
    (100 - popPressure) * 0.1 +
    safeAdvisory * 0.9;

  const environmentalScore =
    tempScore * 0.6 +
    safeAQI * 0.4;

  // Raw advisory score for display (0–100, higher = safer)
  const rawAdvisory = data.raw?.advisoryScore ?? null;

  return {
    country: data.country,
    travelScore: parseFloat(clamp(travelScore).toFixed(2)),
    healthScore: parseFloat(clamp(healthScore).toFixed(2)),
    environmentalScore: parseFloat(clamp(environmentalScore).toFixed(2)),
    individualScores: {
      airQualityScore: parseFloat(clamp(safeAQI).toFixed(2)),         // 100=clean, 0=polluted
      safetyScore: parseFloat(clamp(safeAdvisory).toFixed(2)),        // 100=safe, 0=dangerous
      climateScore: parseFloat(clamp(tempScore).toFixed(2)),          // 100=ideal temp
      populationScore: parseFloat(clamp(100 - popPressure).toFixed(2)), // 100=uncrowded
      rawAdvisory: rawAdvisory !== null ? parseFloat(rawAdvisory.toFixed(2)) : null
    },
    dataQuality: data.dataQuality || {}
  };
}

module.exports = {
  computeCountryScores
};