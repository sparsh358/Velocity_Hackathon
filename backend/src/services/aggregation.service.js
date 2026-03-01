const { fetchCountryProfile } = require("./api/country.service");
const { fetchWeatherByCity } = require("./api/weather.service");
const { fetchAQI } = require("./api/aqi.service");
const { fetchAdvisoryScore } = require("./api/advisory.service");

async function fetchCompleteCountryData(countryName) {
  // --- Input Sanitization ---
  const cleanName = (countryName || '').trim();
  if (!cleanName) {
    return { country: countryName, error: "Empty country name" };
  }

  try {
    // 1. Fetch country profile (capital + ISO code)
    const countryProfile = await fetchCountryProfile(cleanName);

    if (!countryProfile || !countryProfile.capital) {
      throw new Error("Country profile or capital not found");
    }

    const capital = countryProfile.capital.trim();
    const countryCode = countryProfile.cca2;

    // 2. Fetch weather (lat/lon) — with fallback
    let weatherData = { temperature: null, latitude: null, longitude: null };
    try {
      weatherData = await fetchWeatherByCity(capital);
    } catch (e) {
      console.warn(`Weather fallback for ${cleanName}: ${e.message}`);
    }

    // 3. Fetch AQI — graceful (never throws now)
    let aqiData = { rawAQI: null, fallback: true };
    if (weatherData.latitude != null && weatherData.longitude != null) {
      aqiData = await fetchAQI(weatherData.latitude, weatherData.longitude);
    }

    // 4. Fetch Advisory score — with fallback
    let advisoryData = { advisoryScore: null };
    try {
      advisoryData = await fetchAdvisoryScore(countryCode);
    } catch (e) {
      console.warn(`Advisory fallback for ${cleanName}: ${e.message}`);
    }

    // 5. Merge — clamp and validate all numeric fields
    return {
      country: countryProfile.country,
      countryCode,
      capital,
      population: countryProfile.population || null,
      region: countryProfile.region || null,
      currency: countryProfile.currency || null,
      temperature: typeof weatherData.temperature === 'number' ? parseFloat(weatherData.temperature.toFixed(2)) : null,
      latitude: weatherData.latitude || null,
      longitude: weatherData.longitude || null,
      rawAQI: (aqiData?.rawAQI >= 1 && aqiData?.rawAQI <= 5) ? aqiData.rawAQI : null,
      advisoryScore: (typeof advisoryData?.advisoryScore === 'number') ? parseFloat(advisoryData.advisoryScore.toFixed(2)) : null,
      dataQuality: {
        weatherLive: !weatherData.fallback,
        aqiFallback: aqiData?.fallback === true,
        advisoryLive: !!advisoryData?.advisoryScore
      }
    };

  } catch (error) {
    console.error(`Aggregation Error [${cleanName}]:`, error.message);
    return { country: cleanName, error: error.message };
  }
}

module.exports = {
  fetchCompleteCountryData
};