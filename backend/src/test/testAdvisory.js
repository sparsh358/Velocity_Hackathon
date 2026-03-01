const { fetchAdvisoryScore } = require('../services/api/advisory.service');

(async () => {
  console.log("Testing Advisory API with multiple countries...\n");

  const countries = ["USA", "GBR", "IND", "BRA", "AUS", "DEU"];
  
  for (const country of countries) {
    const result = await fetchAdvisoryScore(country);
    console.log(`${country}: Score=${result.advisoryScore}, Homicide=${result.homicideRate}, Stability=${result.politicalStability}`);
  }
})();