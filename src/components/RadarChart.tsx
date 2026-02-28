import { Team } from '../lib/types';

interface TeamRadarChartProps {
  homeTeam: Team;
  awayTeam: Team;
}

// Custom SVG Radar Chart Component
const TeamRadarChart: React.FC<TeamRadarChartProps> = ({ homeTeam, awayTeam }) => {
  const stats = [
    { label: 'Атака', home: (homeTeam.xG / 3) * 100, away: (awayTeam.xG / 3) * 100 },
    { label: 'Защита', home: (1 - homeTeam.xGA / 3) * 100, away: (1 - awayTeam.xGA / 3) * 100 },
    { label: 'Контроль', home: homeTeam.possession, away: awayTeam.possession },
    { label: 'Форма', home: calculateFormPercentage(homeTeam.form), away: calculateFormPercentage(awayTeam.form) },
    { label: 'Удары', home: (homeTeam.shotsOnTarget / 10) * 100, away: (awayTeam.shotsOnTarget / 10) * 100 },
    { label: 'Рейтинг', home: (homeTeam.elo / 2200) * 100, away: (awayTeam.elo / 2200) * 100 }
  ];

  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (2 * Math.PI) / stats.length;

  const getPoint = (index: number, value: number) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const homePath = stats.map((stat, i) => {
    const point = getPoint(i, stat.home);
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  const awayPath = stats.map((stat, i) => {
    const point = getPoint(i, stat.away);
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-56 mx-auto">
        {/* Background circles */}
        {[25, 50, 75, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
        ))}

        {/* Axis lines */}
        {stats.map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#334155"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Labels */}
        {stats.map((stat, i) => {
          const point = getPoint(i, 115);
          return (
            <text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94A3B8"
              fontSize="10"
            >
              {stat.label}
            </text>
          );
        })}

        {/* Home team polygon */}
        <path
          d={homePath}
          fill="rgba(0, 255, 133, 0.2)"
          stroke="#00FF85"
          strokeWidth="2"
        />

        {/* Away team polygon */}
        <path
          d={awayPath}
          fill="rgba(255, 0, 85, 0.2)"
          stroke="#FF0055"
          strokeWidth="2"
        />

        {/* Data points - Home */}
        {stats.map((stat, i) => {
          const point = getPoint(i, stat.home);
          return (
            <circle
              key={`home-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#00FF85"
            />
          );
        })}

        {/* Data points - Away */}
        {stats.map((stat, i) => {
          const point = getPoint(i, stat.away);
          return (
            <circle
              key={`away-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#FF0055"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-slate-400">{homeTeam.shortName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-sm text-slate-400">{awayTeam.shortName}</span>
        </div>
      </div>
    </div>
  );
};

function calculateFormPercentage(form: ('W' | 'D' | 'L')[]): number {
  const points = form.reduce((acc, result) => {
    if (result === 'W') return acc + 3;
    if (result === 'D') return acc + 1;
    return acc;
  }, 0);
  return (points / 15) * 100;
}

export default TeamRadarChart;
