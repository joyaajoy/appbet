import { Standing } from '../lib/types';

interface StandingsTableProps {
  standings: Standing[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  const getZoneColor = (zone: 'top8' | 'playoff' | 'eliminated') => {
    switch (zone) {
      case 'top8':
        return 'bg-emerald-500/20 border-emerald-500/50';
      case 'playoff':
        return 'bg-amber-500/20 border-amber-500/50';
      case 'eliminated':
        return 'bg-rose-500/20 border-rose-500/50';
    }
  };

  const getZoneText = (zone: 'top8' | 'playoff' | 'eliminated') => {
    switch (zone) {
      case 'top8':
        return 'Выход в 1/8';
      case 'playoff':
        return 'Плей-офф';
      case 'eliminated':
        return 'Выбывание';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-400 border-b border-slate-700">
            <th className="text-left py-3 px-3 font-medium">#</th>
            <th className="text-left py-3 px-3 font-medium">Команда</th>
            <th className="text-center py-3 px-3 font-medium">И</th>
            <th className="text-center py-3 px-3 font-medium">В</th>
            <th className="text-center py-3 px-3 font-medium">Н</th>
            <th className="text-center py-3 px-3 font-medium">П</th>
            <th className="text-center py-3 px-3 font-medium">М</th>
            <th className="text-center py-3 px-3 font-medium">О</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr
              key={standing.team.id}
              className={`
                border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors
                ${index < 8 ? 'bg-emerald-500/5' : index < 24 ? 'bg-amber-500/5' : 'bg-rose-500/5'}
              `}
            >
              <td className="py-3 px-3">
                <span className={`
                  inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold text-sm
                  ${standing.position <= 8 ? 'text-emerald-400' :
                    standing.position <= 24 ? 'text-amber-400' : 'text-rose-400'}
                `}>
                  {standing.position}
                </span>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                    <img
                      src={standing.team.logo}
                      alt={standing.team.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24?text=' + standing.team.shortName;
                      }}
                    />
                  </div>
                  <span className="font-medium text-slate-200 text-sm">
                    {standing.team.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-3 text-center text-slate-400 text-sm">
                {standing.played}
              </td>
              <td className="py-3 px-3 text-center text-emerald-400 text-sm font-medium">
                {standing.won}
              </td>
              <td className="py-3 px-3 text-center text-amber-400 text-sm font-medium">
                {standing.drawn}
              </td>
              <td className="py-3 px-3 text-center text-rose-400 text-sm font-medium">
                {standing.lost}
              </td>
              <td className="py-3 px-3 text-center text-slate-300 text-sm">
                {standing.goalsFor}:{standing.goalsAgainst}
              </td>
              <td className="py-3 px-3 text-center">
                <span className={`
                  inline-block px-3 py-1 rounded-lg text-sm font-bold
                  ${standing.position <= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                    standing.position <= 24 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}
                `}>
                  {standing.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
