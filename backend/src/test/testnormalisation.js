try {
  console.log("Starting test...");
} catch (err) {
  console.error(err);
}

const { normalizeCountryData } = require('../services/normalization.service');

const sampleCountry = {
  country: "Japan",
  lifeExpectancy: 22,
  healthcareExpenditure: 10.9,
  aqi: 400,
  temperature: 21,
  advisoryLevel: 2,
  population: 125000000
};

console.log("Before normalization");

const result = normalizeCountryData(sampleCountry);

console.log("After normalization");
console.log(result);