const { getDynamicWeights } = require('../services/weight.service');
const { rankCountries } = require('../services/ranking.service');

const countries = [
  {
    country: "Japan",
    travelScore: 76,
    healthScore: 70,
    environmentalScore: 84
  },
  {
    country: "Germany",
    travelScore: 82,
    healthScore: 75,
    environmentalScore: 80
  },
  {
    country: "Brazil",
    travelScore: 60,
    healthScore: 65,
    environmentalScore: 55
  }
];

const weights = getDynamicWeights("Low", "Long-term");

console.log("Dynamic Weights:", weights);

const ranked = rankCountries(countries, weights);

console.log("Final Ranking:");
console.log(ranked);