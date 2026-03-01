require("dotenv").config();

const { fetchCompleteCountryData } = require("../services/aggregation.service");

async function test() {
  const countries = ["Japan", "Germany", "Brazil", "Australia", "India"];

  for (const country of countries) {
    console.log(`\nFetching data for: ${country}`);
    const result = await fetchCompleteCountryData(country);
    console.log(`  Country: ${result.country} (${result.countryCode})`);
    console.log(`  Capital: ${result.capital}`);
    console.log(`  Population: ${result.population?.toLocaleString()}`);
    console.log(`  Temperature: ${result.temperature}°C`);
    console.log(`  AQI: ${result.rawAQI}`);
    console.log(`  Advisory Score: ${result.advisoryScore?.toFixed(2)}`);
    console.log(`  Currency: ${result.currency}`);
  }
}

test();