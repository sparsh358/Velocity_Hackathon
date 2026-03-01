const { computeCountryScores } = require('../services/scoring.service');

const normalizedSample = {
  country: "Japan",
  normalizedLifeExpectancy: 97,
  normalizedHealthcareExpenditure: 54,
  normalizedAQI: 24,
  temperatureStabilityScore: 96,
  advisoryRiskScore: 66,
  populationPressureScore: 70
};

console.log("Running Scoring Test...");

const result = computeCountryScores(normalizedSample);

console.log(result);