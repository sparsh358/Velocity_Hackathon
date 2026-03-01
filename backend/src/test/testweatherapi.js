require("dotenv").config();

const { fetchWeatherByCity } = require("../services/api/weather.service");

async function test() {
  console.log("Fetching London weather...");
  const data = await fetchWeatherByCity("London");
  console.log(data);
}

test();

console.log("API KEY:", process.env.OPENWEATHER_API_KEY);