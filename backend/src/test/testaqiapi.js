require("dotenv").config();

const { fetchAQI } = require('../services/api/aqi.service');

(async () => {
  try {
    console.log("Testing AQI API...");

    // Example: Tokyo coordinates
    const lat = 35.6895;
    const lon = 139.6917;

    const data = await fetchAQI(lat, lon);
    console.log(data);

  } catch (error) {
    console.error("AQI Test Failed:", error.message);
  }
})();