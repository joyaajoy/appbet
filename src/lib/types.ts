// Team interface for Champions League teams
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  elo: number;
  xG: number; // Expected goals
  xGA: number; // Expected goals against
  possession: number; // Average possession %
  shotsOnTarget: number; // Average shots on target
  form: ('W' | 'D' | 'L')[]; // Last 5 matches
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  played: number;
  injuredPlayers: string[];
}

// Match interface
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  venue: string;
  round: number;
  status: 'scheduled' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  prediction?: Prediction;
}

// Prediction interface
export interface Prediction {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeGoals: number;
  awayGoals: number;
  confidence: number;
}

// Standings entry
export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  zone: 'top8' | 'playoff' | 'eliminated';
}

// Round matches
export interface Round {
  round: number;
  name: string;
  matches: Match[];
}
