function computeFinalScore(scores, weights) {
  if (scores.error) return -1;
  return (
    scores.travelScore * weights.travelWeight +
    scores.healthScore * weights.healthWeight +
    scores.environmentalScore * weights.environmentalWeight
  );
}

function rankCountries(countries, weights) {
  // Separate valid from errored
  const valid = countries.filter(c => !c.error);
  const errored = countries.filter(c => c.error);

  const withFinal = valid.map(c => ({
    ...c,
    finalScore: computeFinalScore(c, weights)
  }));

  withFinal.sort((a, b) => b.finalScore - a.finalScore);

  const ranked = withFinal.map((c, index) => ({
    rank: index + 1,
    country: c.country,
    finalScore: parseFloat(c.finalScore.toFixed(2)),
    scoreBreakdown: {
      travelScore: parseFloat(c.travelScore.toFixed(2)),
      healthScore: parseFloat(c.healthScore.toFixed(2)),
      environmentalScore: parseFloat(c.environmentalScore.toFixed(2))
    },
    individualScores: c.individualScores,
    dataQuality: c.dataQuality || {}
  }));

  // Append errored countries at bottom with error marker
  errored.forEach(c => {
    ranked.push({ rank: null, country: c.country, error: c.error });
  });

  return ranked;
}

module.exports = { rankCountries };