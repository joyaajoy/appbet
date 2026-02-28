import { Team, Match, Standing, Round } from './types';

// Mock Champions League 2025-2026 teams with realistic stats
export const teams: Team[] = [
  {
    id: 'mci',
    name: 'Manchester City',
    shortName: 'MCI',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    country: 'England',
    elo: 2085,
    xG: 2.8,
    xGA: 0.9,
    possession: 68,
    shotsOnTarget: 7.2,
    form: ['W', 'W', 'W', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Kevin De Bruyne']
  },
  {
    id: 'rma',
    name: 'Real Madrid',
    shortName: 'RMA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    country: 'Spain',
    elo: 2075,
    xG: 2.6,
    xGA: 1.0,
    possession: 62,
    shotsOnTarget: 6.8,
    form: ['W', 'W', 'L', 'W', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'bay',
    name: 'Bayern Munich',
    shortName: 'BAY',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    country: 'Germany',
    elo: 2065,
    xG: 2.9,
    xGA: 1.1,
    possession: 65,
    shotsOnTarget: 7.0,
    form: ['W', 'W', 'W', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Manuel Neuer']
  },
  {
    id: 'psg',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_French.svg',
    country: 'France',
    elo: 2035,
    xG: 2.5,
    xGA: 1.2,
    possession: 64,
    shotsOnTarget: 6.5,
    form: ['W', 'D', 'W', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Presnel Kimpembe']
  },
  {
    id: 'liv',
    name: 'Liverpool',
    shortName: 'LIV',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    country: 'England',
    elo: 2045,
    xG: 2.4,
    xGA: 1.0,
    possession: 60,
    shotsOnTarget: 6.2,
    form: ['W', 'W', 'D', 'W', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'int',
    name: 'Inter Milan',
    shortName: 'INT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/FC_Internazionale_Milano_2021.svg',
    country: 'Italy',
    elo: 2025,
    xG: 2.2,
    xGA: 0.9,
    possession: 58,
    shotsOnTarget: 5.8,
    form: ['D', 'W', 'W', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Nicolo Barella']
  },
  {
    id: 'fcb',
    name: 'Barcelona',
    shortName: 'FCB',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    country: 'Spain',
    elo: 2030,
    xG: 2.6,
    xGA: 1.3,
    possession: 66,
    shotsOnTarget: 6.6,
    form: ['L', 'W', 'W', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Ronald Araujo']
  },
  {
    id: 'atm',
    name: 'Atletico Madrid',
    shortName: 'ATM',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/03/Atletico_Madrid_2017.svg',
    country: 'Spain',
    elo: 1995,
    xG: 2.0,
    xGA: 1.1,
    possession: 54,
    shotsOnTarget: 5.2,
    form: ['W', 'W', 'L', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'ars',
    name: 'Arsenal',
    shortName: 'ARS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    country: 'England',
    elo: 2010,
    xG: 2.3,
    xGA: 1.0,
    possession: 62,
    shotsOnTarget: 6.0,
    form: ['D', 'W', 'W', 'L', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Bukayo Saka']
  },
  {
    id: 'dort',
    name: 'Borussia Dortmund',
    shortName: 'BVB',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/67/Borussia_Dortmund_logo.svg',
    country: 'Germany',
    elo: 1985,
    xG: 2.4,
    xGA: 1.4,
    possession: 58,
    shotsOnTarget: 6.0,
    form: ['W', 'L', 'W', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'juve',
    name: 'Juventus',
    shortName: 'JUV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg',
    country: 'Italy',
    elo: 1975,
    xG: 2.0,
    xGA: 1.0,
    possession: 56,
    shotsOnTarget: 5.0,
    form: ['W', 'D', 'L', 'W', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    shortName: 'CHE',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    country: 'England',
    elo: 1970,
    xG: 2.2,
    xGA: 1.3,
    possession: 60,
    shotsOnTarget: 5.8,
    form: ['L', 'W', 'D', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: ['Reece James']
  },
  {
    id: 'milan',
    name: 'AC Milan',
    shortName: 'MIL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    country: 'Italy',
    elo: 1965,
    xG: 2.1,
    xGA: 1.2,
    possession: 57,
    shotsOnTarget: 5.4,
    form: ['W', 'L', 'W', 'D', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'atlb',
    name: 'Atalanta',
    shortName: 'ATA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Atalanta_2017.svg',
    country: 'Italy',
    elo: 1955,
    xG: 2.3,
    xGA: 1.5,
    possession: 55,
    shotsOnTarget: 5.6,
    form: ['W', 'W', 'L', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'benfica',
    name: 'Benfica',
    shortName: 'BEN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/SL_Benfica_2022.svg',
    country: 'Portugal',
    elo: 1940,
    xG: 2.0,
    xGA: 1.3,
    possession: 54,
    shotsOnTarget: 5.0,
    form: ['W', 'W', 'L', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'porto',
    name: 'Porto',
    shortName: 'POR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/fc/FC_Porto.svg',
    country: 'Portugal',
    elo: 1935,
    xG: 1.9,
    xGA: 1.2,
    possession: 53,
    shotsOnTarget: 4.8,
    form: ['D', 'W', 'W', 'L', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'sporting',
    name: 'Sporting CP',
    shortName: 'SCP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Sporting_Club_de_Portugal_%28新版%29.svg',
    country: 'Portugal',
    elo: 1930,
    xG: 2.0,
    xGA: 1.4,
    possession: 55,
    shotsOnTarget: 5.0,
    form: ['W', 'L', 'W', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'ajax',
    name: 'Ajax',
    shortName: 'AJA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/07/AFC_Ajax.svg',
    country: 'Netherlands',
    elo: 1925,
    xG: 2.2,
    xGA: 1.4,
    possession: 60,
    shotsOnTarget: 5.6,
    form: ['W', 'D', 'L', 'W', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'feyenoord',
    name: 'Feyenoord',
    shortName: 'FEY',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Feyenoord_logo.svg',
    country: 'Netherlands',
    elo: 1905,
    xG: 2.0,
    xGA: 1.5,
    possession: 54,
    shotsOnTarget: 4.8,
    form: ['L', 'W', 'W', 'D', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'leverkusen',
    name: 'Bayer Leverkusen',
    shortName: 'LEV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Bayer_04_Leverkusen.svg',
    country: 'Germany',
    elo: 1945,
    xG: 2.2,
    xGA: 1.1,
    possession: 60,
    shotsOnTarget: 5.6,
    form: ['W', 'W', 'D', 'W', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'rb-leipzig',
    name: 'RB Leipzig',
    shortName: 'RBL',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/FC_Red_Bull_Leipzig_2021.svg',
    country: 'Germany',
    elo: 1920,
    xG: 2.1,
    xGA: 1.4,
    possession: 56,
    shotsOnTarget: 5.2,
    form: ['D', 'W', 'L', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'shakhtar',
    name: 'Shakhtar Donetsk',
    shortName: 'SHK',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/FC_Shakhtar_Donetsk_%282%29.svg',
    country: 'Ukraine',
    elo: 1870,
    xG: 1.8,
    xGA: 1.5,
    possession: 50,
    shotsOnTarget: 4.2,
    form: ['W', 'L', 'W', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'dinamo',
    name: 'Dinamo Zagreb',
    shortName: 'DZG',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/GNK_Dinamo_Zagreb.svg',
    country: 'Croatia',
    elo: 1820,
    xG: 1.6,
    xGA: 1.6,
    possession: 48,
    shotsOnTarget: 3.8,
    form: ['W', 'D', 'L', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'crvena',
    name: 'Red Star Belgrade',
    shortName: 'RSB',
    logo: 'https://upload.wikimedia.org/wikipedia/sq/6/62/Red_Star_Belgrade.svg',
    country: 'Serbia',
    elo: 1805,
    xG: 1.5,
    xGA: 1.7,
    possession: 45,
    shotsOnTarget: 3.5,
    form: ['L', 'W', 'D', 'L', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'sparta',
    name: 'Sparta Prague',
    shortName: 'SPA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/AC_Sparta_Prague_logo.svg',
    country: 'Czech Republic',
    elo: 1810,
    xG: 1.6,
    xGA: 1.6,
    possession: 46,
    shotsOnTarget: 3.6,
    form: ['W', 'L', 'W', 'D', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'galatasaray',
    name: 'Galatasaray',
    shortName: 'GAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Galatasaray_Sports_Club_Logo.svg',
    country: 'Turkey',
    elo: 1835,
    xG: 1.7,
    xGA: 1.5,
    possession: 50,
    shotsOnTarget: 4.0,
    form: ['W', 'W', 'L', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'fenerbahce',
    name: 'Fenerbahçe',
    shortName: 'FEN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Fenerbah%C3%A7e_SK_logo.svg',
    country: 'Turkey',
    elo: 1840,
    xG: 1.8,
    xGA: 1.4,
    possession: 52,
    shotsOnTarget: 4.2,
    form: ['D', 'W', 'W', 'L', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'celtic',
    name: 'Celtic',
    shortName: 'CEL',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/55/Celtic_FC.svg',
    country: 'Scotland',
    elo: 1785,
    xG: 1.6,
    xGA: 1.7,
    possession: 55,
    shotsOnTarget: 4.0,
    form: ['W', 'D', 'W', 'L', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'rangers',
    name: 'Rangers',
    shortName: 'RGR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Rangers_FC_logo.svg',
    country: 'Scotland',
    elo: 1775,
    xG: 1.5,
    xGA: 1.6,
    possession: 50,
    shotsOnTarget: 3.6,
    form: ['L', 'W', 'D', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'brugges',
    name: 'Club Brugge',
    shortName: 'BRU',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Club_Brugge_logo.svg',
    country: 'Belgium',
    elo: 1815,
    xG: 1.6,
    xGA: 1.5,
    possession: 48,
    shotsOnTarget: 3.8,
    form: ['W', 'D', 'L', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'lille',
    name: 'Lille',
    shortName: 'LIL',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Lille_OSC_logo.svg',
    country: 'France',
    elo: 1860,
    xG: 1.7,
    xGA: 1.3,
    possession: 52,
    shotsOnTarget: 4.2,
    form: ['D', 'W', 'W', 'L', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'psv',
    name: 'PSV Eindhoven',
    shortName: 'PSV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/PSV_Eindhoven_logo.svg',
    country: 'Netherlands',
    elo: 1880,
    xG: 2.0,
    xGA: 1.4,
    possession: 58,
    shotsOnTarget: 5.0,
    form: ['W', 'W', 'L', 'D', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'monaco',
    name: 'Monaco',
    shortName: 'MON',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/AS_Monaco_FC.svg',
    country: 'France',
    elo: 1875,
    xG: 1.9,
    xGA: 1.4,
    possession: 54,
    shotsOnTarget: 4.6,
    form: ['L', 'W', 'D', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'sturm',
    name: 'Sturm Graz',
    shortName: 'STG',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/SK_Sturm_Graz.svg',
    country: 'Austria',
    elo: 1755,
    xG: 1.4,
    xGA: 1.8,
    possession: 42,
    shotsOnTarget: 3.2,
    form: ['W', 'L', 'D', 'W', 'L'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'salzberg',
    name: 'Red Bull Salzburg',
    shortName: 'RBS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Red_Bull_Salzburg_logo.svg',
    country: 'Austria',
    elo: 1790,
    xG: 1.6,
    xGA: 1.6,
    possession: 48,
    shotsOnTarget: 3.8,
    form: ['D', 'W', 'L', 'W', 'D'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  },
  {
    id: 'young-boys',
    name: 'Young Boys',
    shortName: 'YB',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/BSC_Young_Boys_Logo.svg',
    country: 'Switzerland',
    elo: 1760,
    xG: 1.5,
    xGA: 1.7,
    possession: 46,
    shotsOnTarget: 3.4,
    form: ['L', 'W', 'D', 'L', 'W'],
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    played: 0,
    injuredPlayers: []
  }
];

// Generate mock matches for the league phase
export const generateMatches = (): Match[] => {
  const matches: Match[] = [];
  const rounds = 8;

  // Generate matches for each round (Swiss system - 8 matches per round)
  for (let round = 1; round <= rounds; round++) {
    // Create pairs for this round (first 16 teams get home matches in alternating rounds)
    const homeTeams = teams.slice(0, 16);
    const awayTeams = teams.slice(16, 32);

    // Shuffle for variety
    const shuffledHome = [...homeTeams].sort(() => Math.random() - 0.5);
    const shuffledAway = [...awayTeams].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 16; i++) {
      const baseDate = new Date('2025-09-17');
      baseDate.setDate(baseDate.getDate() + (round - 1) * 7 + (i % 2));

      const month = String(baseDate.getMonth() + 1).padStart(2, '0');
      const day = String(baseDate.getDate()).padStart(2, '0');

      const hours = 18 + Math.floor(i / 4) * 3;
      const time = `${String(hours).padStart(2, '0')}:00`;

      const homeTeam = i % 2 === 0 ? shuffledHome[i % shuffledHome.length] : shuffledAway[i % shuffledAway.length];
      const awayTeam = i % 2 === 0 ? shuffledAway[i % shuffledAway.length] : shuffledHome[i % shuffledHome.length];

      matches.push({
        id: `match-${round}-${i}`,
        homeTeam,
        awayTeam,
        date: `2025-${month}-${day}`,
        time,
        venue: `${homeTeam.name} Stadium`,
        round,
        status: 'scheduled'
      });
    }
  }

  return matches;
};

export const matches = generateMatches();

// Generate standings
export const generateStandings = (): Standing[] => {
  // Generate random but realistic standings
  const standings: Standing[] = teams.slice(0, 36).map((team, index) => {
    const played = Math.floor(Math.random() * 8);
    const rawPoints = Math.floor(played * (3 - index * 0.08)) + Math.floor(Math.random() * 3);
    const clampedPoints = Math.max(0, Math.min(rawPoints, played * 3));
    const won = Math.min(Math.floor(clampedPoints / 3), played);
    const drawn = Math.min(clampedPoints - won * 3, played - won);
    const lost = played - won - drawn;
    const points = won * 3 + drawn;
    const goalsFor = won * 2 + drawn + Math.floor(Math.random() * 3);
    const goalsAgainst = lost + Math.floor(Math.random() * 2);

    let zone: 'top8' | 'playoff' | 'eliminated';
    if (index < 8) zone = 'top8';
    else if (index < 24) zone = 'playoff';
    else zone = 'eliminated';

    return {
      position: index + 1,
      team,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points,
      zone
    };
  });

  return standings.sort((a, b) =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor
  ).map((standing, index) => ({
    ...standing,
    position: index + 1,
    zone: index < 8 ? 'top8' : index < 24 ? 'playoff' : 'eliminated'
  }));
};

export const standings = generateStandings();

// Get matches by round
export const getMatchesByRound = (round: number): Match[] => {
  return matches.filter(m => m.round === round);
};

// Get upcoming matches
export const getUpcomingMatches = (): Match[] => {
  return matches
    .filter(m => m.status === 'scheduled')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 8);
};

// Get match of the day
export const getMatchOfTheDay = (): Match | null => {
  const upcoming = getUpcomingMatches();
  return upcoming.length > 0 ? upcoming[0] : null;
};

// Get team by ID
export const getTeamById = (id: string): Team | undefined => {
  return teams.find(t => t.id === id);
};

// Get match by ID
export const getMatchById = (id: string): Match | undefined => {
  return matches.find(m => m.id === id);
};
