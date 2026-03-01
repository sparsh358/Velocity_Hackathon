const axios = require("axios");

async function fetchAQI(lat, lon) {
  const API_KEY = process.env.OPENWEATHER_API_KEY; // read dynamically after dotenv

  try {
    if (lat == null || lon == null || lat === 0 && lon === 0) {
      console.warn("AQI: Invalid coordinates, using neutral fallback");
      return { rawAQI: 3, fallback: true }; // neutral AQI
    }

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      console.warn("AQI: No API key, using neutral fallback");
      return { rawAQI: 3, fallback: true };
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: { lat, lon, appid: API_KEY },
        timeout: 5000
      }
    );

    const rawAQI = response.data.list[0].main.aqi;
    return { rawAQI, fallback: false };

  } catch (error) {
    console.warn("AQI Error (using neutral fallback):", error.response?.data?.message || error.message);
    return { rawAQI: 3, fallback: true }; // neutral fallback instead of throwing
  }
}

module.exports = {
  fetchAQI
};