import { Team, Prediction } from './types';

// Poisson probability distribution
const poisson = (lambda: number, k: number): number => {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
};

// Factorial helper
const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Calculate expected goals for a team based on various factors
const calculateExpectedGoals = (
  team: Team,
  opponent: Team,
  isHome: boolean
): number => {
  // Base xG from team stats
  let expectedGoals = team.xG;

  // Home advantage factor (5-10% increase)
  if (isHome) {
    expectedGoals *= 1.08;
  } else {
    expectedGoals *= 0.92;
  }

  // Elo rating adjustment
  const eloDiff = (team.elo - opponent.elo) / 100;
  expectedGoals *= 1 + (eloDiff * 0.02);

  // Opponent defensive strength
  expectedGoals *= 1 - (opponent.xGA / 3);

  // Recent form adjustment
  const formBonus = calculateFormBonus(team.form);
  expectedGoals *= (1 + formBonus * 0.05);

  // Injury factor (reduce by 3% per injured key player)
  expectedGoals *= (1 - team.injuredPlayers.length * 0.03);

  // Clamp to reasonable range
  return Math.max(0.3, Math.min(4.5, expectedGoals));
};

// Calculate form bonus from last 5 matches
const calculateFormBonus = (form: ('W' | 'D' | 'L')[]): number => {
  const points = form.reduce((acc, result) => {
    if (result === 'W') return acc + 3;
    if (result === 'D') return acc + 1;
    return acc;
  }, 0);
  return (points / 15) - 0.5; // Normalize to -0.5 to 0.5
};

// Main prediction function
export const predictMatch = (homeTeam: Team, awayTeam: Team): Prediction => {
  // Calculate expected goals for both teams
  const homeExpectedGoals = calculateExpectedGoals(homeTeam, awayTeam, true);
  const awayExpectedGoals = calculateExpectedGoals(awayTeam, homeTeam, false);

  // Calculate probability of each possible score
  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;
  let totalHomeGoals = 0;
  let totalAwayGoals = 0;

  // Calculate up to 6 goals for each team
  const maxGoals = 6;
  for (let homeGoals = 0; homeGoals <= maxGoals; homeGoals++) {
    for (let awayGoals = 0; awayGoals <= maxGoals; awayGoals++) {
      const homeProb = poisson(homeExpectedGoals, homeGoals);
      const awayProb = poisson(awayExpectedGoals, awayGoals);
      const jointProb = homeProb * awayProb;

      totalHomeGoals += homeGoals * jointProb;
      totalAwayGoals += awayGoals * jointProb;

      if (homeGoals > awayGoals) {
        homeWins += jointProb;
      } else if (homeGoals === awayGoals) {
        draws += jointProb;
      } else {
        awayWins += jointProb;
      }
    }
  }

  // Normalize probabilities
  const total = homeWins + draws + awayWins;
  homeWins = (homeWins / total) * 100;
  draws = (draws / total) * 100;
  awayWins = (awayWins / total) * 100;

  // Calculate confidence based on data quality and match predictability
  const eloDiff = Math.abs(homeTeam.elo - awayTeam.elo);
  const confidence = Math.min(95, 60 + (eloDiff / 50));

  return {
    homeWin: Math.round(homeWins * 10) / 10,
    draw: Math.round(draws * 10) / 10,
    awayWin: Math.round(awayWins * 10) / 10,
    homeGoals: Math.round(totalHomeGoals * 10) / 10,
    awayGoals: Math.round(totalAwayGoals * 10) / 10,
    confidence: Math.round(confidence)
  };
};

// Get prediction with odds format
export const getPredictionWithOdds = (prediction: Prediction) => {
  // Convert probability to decimal odds
  const homeOdds = prediction.homeWin > 0 ? (100 / prediction.homeWin).toFixed(2) : '-';
  const drawOdds = prediction.draw > 0 ? (100 / prediction.draw).toFixed(2) : '-';
  const awayOdds = prediction.awayWin > 0 ? (100 / prediction.awayWin).toFixed(2) : '-';

  return {
    ...prediction,
    homeOdds,
    drawOdds,
    awayOdds
  };
};

// Get favorite team
export const getFavorite = (prediction: Prediction): 'home' | 'draw' | 'away' => {
  if (prediction.homeWin >= prediction.draw && prediction.homeWin >= prediction.awayWin) {
    return 'home';
  } else if (prediction.draw >= prediction.awayWin) {
    return 'draw';
  }
  return 'away';
};

// Get prediction color
export const getPredictionColor = (prediction: Prediction): string => {
  const favorite = getFavorite(prediction);
  if (favorite === 'home') return '#00FF85';
  if (favorite === 'away') return '#FF0055';
  return '#FFB800';
};
