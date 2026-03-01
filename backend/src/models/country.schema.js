class CountryData {
  constructor({
    country,
    capital,
    population,
    lifeExpectancy,
    healthcareExpenditure,
    temperature,
    aqi,
    advisoryLevel
  }) {
    this.country = country;
    this.capital = capital;
    this.population = population;
    this.lifeExpectancy = lifeExpectancy;
    this.healthcareExpenditure = healthcareExpenditure;
    this.temperature = temperature;
    this.aqi = aqi;
    this.advisoryLevel = advisoryLevel;
  }
}

module.exports = CountryData;

class NormalizedCountryData {
  constructor({
    country,
    normalizedLifeExpectancy,
    normalizedHealthcareExpenditure,
    normalizedAQI,
    temperatureStabilityScore,
    advisoryRiskScore,
    populationPressureScore
  }) {
    this.country = country;
    this.normalizedLifeExpectancy = normalizedLifeExpectancy;
    this.normalizedHealthcareExpenditure = normalizedHealthcareExpenditure;
    this.normalizedAQI = normalizedAQI;
    this.temperatureStabilityScore = temperatureStabilityScore;
    this.advisoryRiskScore = advisoryRiskScore;
    this.populationPressureScore = populationPressureScore;
  }
}

module.exports = {
  CountryData,
  NormalizedCountryData
};

class CountryScore {
  constructor({
    country,
    travelScore,
    healthScore,
    environmentalScore,
    finalScore
  }) {
    this.country = country;
    this.travelScore = travelScore;
    this.healthScore = healthScore;
    this.environmentalScore = environmentalScore;
    this.finalScore = finalScore;
  }
}

module.exports = CountryScore;