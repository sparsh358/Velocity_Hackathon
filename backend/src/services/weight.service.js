function getDynamicWeights(riskTolerance, duration) {
  let travelWeight = 0.33;
  let healthWeight = 0.33;
  let environmentalWeight = 0.34;

  if (riskTolerance === "Low") {
    travelWeight += 0.15;
    healthWeight += 0.05;
    environmentalWeight -= 0.20;
  }

  if (riskTolerance === "High") {
    travelWeight -= 0.15;
    environmentalWeight += 0.15;
  }

  if (duration === "Long-term") {
    healthWeight += 0.15;
    travelWeight -= 0.05;
    environmentalWeight -= 0.10;
  }

  if (duration === "Short-term") {
    environmentalWeight += 0.10;
    healthWeight -= 0.10;
  }

  const total =
    travelWeight + healthWeight + environmentalWeight;

  return {
    travelWeight: parseFloat((travelWeight / total).toFixed(4)),
    healthWeight: parseFloat((healthWeight / total).toFixed(4)),
    environmentalWeight: parseFloat((environmentalWeight / total).toFixed(4))
  };
}

module.exports = { getDynamicWeights };