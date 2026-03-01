
const axios = require("axios");

/**
 * Fetch current weather by city name
 */
async function fetchWeatherByCity(city) {
  // Read API key dynamically to avoid caching issues
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  try {
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      console.warn("No valid OpenWeather API key configured, using mock data");
      return getMockWeatherData(city);
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric"
        },
        timeout: 5000
      }
    );

    const data = response.data;

    return {
      temperature: data.main.temp,
      latitude: data.coord.lat,
      longitude: data.coord.lon
    };

  } catch (error) {
    console.error("Weather API Error:", error.response?.data?.message || error.message);
    
    // If API key is invalid or API fails, return mock data
    if (error.response?.status === 401) {
      console.warn("Invalid API key detected. Please get a valid key from https://openweathermap.org/api");
      console.warn("Using mock weather data as fallback");
    }
    
    return getMockWeatherData(city);
  }
}

/**
 * Provides mock weather data as fallback
 */
function getMockWeatherData(city) {
  // Expanded capital city mock data (used only when API key is missing/invalid)
  const mockData = {
    // Asia
    'tokyo': { temperature: 15, latitude: 35.6895, longitude: 139.6917 },
    'beijing': { temperature: 12, latitude: 39.9042, longitude: 116.4074 },
    'delhi': { temperature: 25, latitude: 28.6139, longitude: 77.2090 },
    'new delhi': { temperature: 25, latitude: 28.6139, longitude: 77.2090 },
    'islamabad': { temperature: 22, latitude: 33.6844, longitude: 73.0479 },
    'dhaka': { temperature: 28, latitude: 23.8103, longitude: 90.4125 },
    'kabul': { temperature: 12, latitude: 34.5553, longitude: 69.2075 },
    'kathmandu': { temperature: 18, latitude: 27.7172, longitude: 85.3240 },
    'colombo': { temperature: 28, latitude: 6.9271, longitude: 79.8612 },
    'bangkok': { temperature: 30, latitude: 13.7563, longitude: 100.5018 },
    'hanoi': { temperature: 23, latitude: 21.0285, longitude: 105.8542 },
    'jakarta': { temperature: 28, latitude: -6.2088, longitude: 106.8456 },
    'kuala lumpur': { temperature: 28, latitude: 3.1390, longitude: 101.6869 },
    'singapore': { temperature: 27, latitude: 1.3521, longitude: 103.8198 },
    'manila': { temperature: 29, latitude: 14.5995, longitude: 120.9842 },
    'seoul': { temperature: 13, latitude: 37.5665, longitude: 126.9780 },
    'taipei': { temperature: 22, latitude: 25.0320, longitude: 121.5654 },
    'ulaanbaatar': { temperature: -1, latitude: 47.8864, longitude: 106.9057 },
    'tehran': { temperature: 17, latitude: 35.6892, longitude: 51.3890 },
    'riyadh': { temperature: 28, latitude: 24.7136, longitude: 46.6753 },
    'dubai': { temperature: 28, latitude: 25.2048, longitude: 55.2708 },
    'abu dhabi': { temperature: 28, latitude: 24.4539, longitude: 54.3773 },
    'doha': { temperature: 28, latitude: 25.2854, longitude: 51.5310 },
    'kuwait city': { temperature: 30, latitude: 29.3759, longitude: 47.9774 },
    'baghdad': { temperature: 25, latitude: 33.3152, longitude: 44.3661 },
    'ankara': { temperature: 12, latitude: 39.9208, longitude: 32.8541 },
    'jerusalem': { temperature: 18, latitude: 31.7683, longitude: 35.2137 },
    'amman': { temperature: 17, latitude: 31.9539, longitude: 35.9106 },
    'beirut': { temperature: 20, latitude: 33.8938, longitude: 35.5018 },
    'damascus': { temperature: 18, latitude: 33.5138, longitude: 36.2765 },
    'tashkent': { temperature: 14, latitude: 41.2995, longitude: 69.2401 },
    'astana': { temperature: 5, latitude: 51.1801, longitude: 71.4460 },
    'baku': { temperature: 15, latitude: 40.4093, longitude: 49.8671 },
    'yerevan': { temperature: 12, latitude: 40.1872, longitude: 44.5152 },
    'tbilisi': { temperature: 14, latitude: 41.6938, longitude: 44.8015 },
    // Europe
    'london': { temperature: 10, latitude: 51.5074, longitude: -0.1278 },
    'paris': { temperature: 11, latitude: 48.8566, longitude: 2.3522 },
    'berlin': { temperature: 9, latitude: 52.5200, longitude: 13.4050 },
    'madrid': { temperature: 15, latitude: 40.4168, longitude: -3.7038 },
    'rome': { temperature: 16, latitude: 41.9028, longitude: 12.4964 },
    'amsterdam': { temperature: 10, latitude: 52.3676, longitude: 4.9041 },
    'brussels': { temperature: 10, latitude: 50.8503, longitude: 4.3517 },
    'vienna': { temperature: 10, latitude: 48.2082, longitude: 16.3738 },
    'warsaw': { temperature: 8, latitude: 52.2297, longitude: 21.0122 },
    'prague': { temperature: 9, latitude: 50.0755, longitude: 14.4378 },
    'budapest': { temperature: 11, latitude: 47.4979, longitude: 19.0402 },
    'bucharest': { temperature: 11, latitude: 44.4268, longitude: 26.1025 },
    'kyiv': { temperature: 9, latitude: 50.4501, longitude: 30.5234 },
    'moscow': { temperature: 6, latitude: 55.7558, longitude: 37.6173 },
    'stockholm': { temperature: 7, latitude: 59.3293, longitude: 18.0686 },
    'oslo': { temperature: 6, latitude: 59.9139, longitude: 10.7522 },
    'copenhagen': { temperature: 8, latitude: 55.6761, longitude: 12.5683 },
    'helsinki': { temperature: 6, latitude: 60.1699, longitude: 24.9384 },
    'lisbon': { temperature: 17, latitude: 38.7223, longitude: -9.1393 },
    'athens': { temperature: 18, latitude: 37.9838, longitude: 23.7275 },
    'bern': { temperature: 9, latitude: 46.9480, longitude: 7.4474 },
    'zurich': { temperature: 9, latitude: 47.3769, longitude: 8.5417 },
    'reykjavik': { temperature: 5, latitude: 64.1265, longitude: -21.8174 },
    'dublin': { temperature: 10, latitude: 53.3498, longitude: -6.2603 },
    'nicosia': { temperature: 19, latitude: 35.1856, longitude: 33.3823 },
    'valletta': { temperature: 19, latitude: 35.8997, longitude: 14.5147 },
    'minsk': { temperature: 8, latitude: 53.9045, longitude: 27.5615 },
    'chisinau': { temperature: 11, latitude: 47.0105, longitude: 28.8638 },
    'belgrade': { temperature: 12, latitude: 44.7866, longitude: 20.4489 },
    'sarajevo': { temperature: 11, latitude: 43.8476, longitude: 18.3564 },
    'tirana': { temperature: 15, latitude: 41.3275, longitude: 19.8187 },
    'skopje': { temperature: 13, latitude: 41.9973, longitude: 21.4280 },
    'podgorica': { temperature: 15, latitude: 42.4304, longitude: 19.2594 },
    'zagreb': { temperature: 12, latitude: 45.8150, longitude: 15.9819 },
    'ljubljana': { temperature: 11, latitude: 46.0569, longitude: 14.5058 },
    'bratislava': { temperature: 10, latitude: 48.1486, longitude: 17.1077 },
    'riga': { temperature: 7, latitude: 56.9496, longitude: 24.1052 },
    'tallinn': { temperature: 7, latitude: 59.4370, longitude: 24.7536 },
    'vilnius': { temperature: 7, latitude: 54.6872, longitude: 25.2797 },
    // Americas
    'washington': { temperature: 13, latitude: 38.9072, longitude: -77.0369 },
    'washington d.c.': { temperature: 13, latitude: 38.9072, longitude: -77.0369 },
    'ottawa': { temperature: 7, latitude: 45.4215, longitude: -75.6972 },
    'mexico city': { temperature: 18, latitude: 19.4326, longitude: -99.1332 },
    'brasilia': { temperature: 22, latitude: -15.7975, longitude: -47.8919 },
    'buenos aires': { temperature: 17, latitude: -34.6037, longitude: -58.3816 },
    'santiago': { temperature: 14, latitude: -33.4489, longitude: -70.6693 },
    'lima': { temperature: 19, latitude: -12.0464, longitude: -77.0428 },
    'bogota': { temperature: 14, latitude: 4.7110, longitude: -74.0721 },
    'caracas': { temperature: 23, latitude: 10.4806, longitude: -66.9036 },
    'quito': { temperature: 13, latitude: -0.1807, longitude: -78.4678 },
    'la paz': { temperature: 8, latitude: -16.5000, longitude: -68.1193 },
    'asuncion': { temperature: 24, latitude: -25.2867, longitude: -57.6471 },
    'montevideo': { temperature: 16, latitude: -34.9011, longitude: -56.1645 },
    'georgetown': { temperature: 27, latitude: 6.8013, longitude: -58.1553 },
    'paramaribo': { temperature: 27, latitude: 5.8520, longitude: -55.2038 },
    'havana': { temperature: 25, latitude: 23.1136, longitude: -82.3666 },
    'kingston': { temperature: 27, latitude: 17.9970, longitude: -76.7936 },
    'port-au-prince': { temperature: 28, latitude: 18.5944, longitude: -72.3074 },
    'santo domingo': { temperature: 27, latitude: 18.4861, longitude: -69.9312 },
    'panama city': { temperature: 27, latitude: 8.9936, longitude: -79.5197 },
    'san jose': { temperature: 22, latitude: 9.9281, longitude: -84.0907 },
    'managua': { temperature: 29, latitude: 12.1364, longitude: -86.2514 },
    'tegucigalpa': { temperature: 22, latitude: 14.0818, longitude: -87.2068 },
    'san salvador': { temperature: 24, latitude: 13.6929, longitude: -89.2182 },
    'guatemala city': { temperature: 18, latitude: 14.6349, longitude: -90.5069 },
    'belmopan': { temperature: 26, latitude: 17.2510, longitude: -88.7590 },
    // Africa
    'cairo': { temperature: 22, latitude: 30.0444, longitude: 31.2357 },
    'nairobi': { temperature: 19, latitude: -1.2921, longitude: 36.8219 },
    'addis ababa': { temperature: 16, latitude: 9.0320, longitude: 38.7469 },
    'lagos': { temperature: 28, latitude: 6.5244, longitude: 3.3792 },
    'abuja': { temperature: 27, latitude: 9.0765, longitude: 7.3986 },
    'accra': { temperature: 28, latitude: 5.6037, longitude: -0.1870 },
    'dakar': { temperature: 26, latitude: 14.7167, longitude: -17.4677 },
    'johannesburg': { temperature: 16, latitude: -26.2041, longitude: 28.0473 },
    'pretoria': { temperature: 18, latitude: -25.7479, longitude: 28.2293 },
    'cape town': { temperature: 17, latitude: -33.9249, longitude: 18.4241 },
    'luanda': { temperature: 26, latitude: -8.8368, longitude: 13.2343 },
    'kinshasa': { temperature: 25, latitude: -4.4419, longitude: 15.2663 },
    'khartoum': { temperature: 30, latitude: 15.5007, longitude: 32.5599 },
    'tripoli': { temperature: 20, latitude: 32.8872, longitude: 13.1913 },
    'tunis': { temperature: 19, latitude: 36.8065, longitude: 10.1815 },
    'algiers': { temperature: 17, latitude: 36.7372, longitude: 3.0865 },
    'rabat': { temperature: 18, latitude: 33.9716, longitude: -6.8498 },
    'casablanca': { temperature: 18, latitude: 33.5731, longitude: -7.5898 },
    'kampala': { temperature: 22, latitude: 0.3476, longitude: 32.5825 },
    'dar es salaam': { temperature: 27, latitude: -6.7924, longitude: 39.2083 },
    'harare': { temperature: 19, latitude: -17.8252, longitude: 31.0335 },
    'lusaka': { temperature: 22, latitude: -15.3875, longitude: 28.3228 },
    'maputo': { temperature: 24, latitude: -25.9692, longitude: 32.5732 },
    'antananarivo': { temperature: 19, latitude: -18.8792, longitude: 47.5079 },
    'mogadishu': { temperature: 28, latitude: 2.0469, longitude: 45.3182 },
    'djibouti': { temperature: 30, latitude: 11.8251, longitude: 42.5903 },
    'asmara': { temperature: 16, latitude: 15.3229, longitude: 38.9251 },
    'bamako': { temperature: 30, latitude: 12.6392, longitude: -8.0029 },
    'ouagadougou': { temperature: 29, latitude: 12.3714, longitude: -1.5197 },
    'niamey': { temperature: 32, latitude: 13.5137, longitude: 2.1098 },
    'ndjamena': { temperature: 31, latitude: 12.1048, longitude: 15.0445 },
    'yaounde': { temperature: 23, latitude: 3.8480, longitude: 11.5021 },
    'bangui': { temperature: 26, latitude: 4.3613, longitude: 18.5550 },
    'brazzaville': { temperature: 24, latitude: -4.2634, longitude: 15.2429 },
    'libreville': { temperature: 26, latitude: 0.4162, longitude: 9.4673 },
    // Oceania
    'sydney': { temperature: 22, latitude: -33.8688, longitude: 151.2093 },
    'canberra': { temperature: 13, latitude: -35.2809, longitude: 149.1300 },
    'wellington': { temperature: 12, latitude: -41.2866, longitude: 174.7756 },
    'auckland': { temperature: 16, latitude: -36.8485, longitude: 174.7633 },
    'suva': { temperature: 26, latitude: -18.1248, longitude: 178.4501 },
    'port moresby': { temperature: 27, latitude: -9.4438, longitude: 147.1803 },
    'honiara': { temperature: 27, latitude: -9.4319, longitude: 160.0570 },
    'default': { temperature: 20, latitude: 0, longitude: 0 }
  };

  const cityLower = city.toLowerCase();
  const data = mockData[cityLower] || mockData['default'];
  if (data.latitude === 0 && data.longitude === 0) {
    console.warn(`No mock data for capital "${city}" — using neutral defaults`);
  } else {
    console.log(`Using mock data for ${city}`);
  }
  return { ...data, fallback: true };
}

module.exports = {
  fetchWeatherByCity
};