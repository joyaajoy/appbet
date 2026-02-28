import { useState, useMemo } from 'react';
import { Table2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import StandingsTable from '../components/StandingsTable';
import { standings as initialStandings } from '../lib/data';

type SortKey = 'position' | 'points' | 'goalsFor' | 'goalDifference';
type SortOrder = 'asc' | 'desc';

const Standings: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const standings = useMemo(() => {
    const sorted = [...initialStandings].sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'points':
          comparison = a.points - b.points;
          break;
        case 'goalsFor':
          comparison = a.goalsFor - b.goalsFor;
          break;
        case 'goalDifference':
          comparison = a.goalDifference - b.goalDifference;
          break;
        default:
          comparison = a.position - b.position;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return sorted;
  }, [sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <Minus className="w-3 h-3 opacity-30" />;
    return sortOrder === 'desc' ? (
      <TrendingDown className="w-3 h-3 text-blue-400" />
    ) : (
      <TrendingUp className="w-3 h-3 text-blue-400" />
    );
  };

  const top8 = standings.filter(s => s.position <= 8);
  const playoff = standings.filter(s => s.position > 8 && s.position <= 24);
  const eliminated = standings.filter(s => s.position > 24);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <Table2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Турнирная таблица</h1>
            <p className="text-slate-400 text-sm">Лига Чемпионов 2025-2026</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500/40 border border-emerald-500/60" />
          <span className="text-sm text-slate-300">Выход в 1/8 финала</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500/40 border border-amber-500/60" />
          <span className="text-sm text-slate-300">Плей-офф за выход</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-rose-500/40 border border-rose-500/60" />
          <span className="text-sm text-slate-300">Выбывание</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-emerald-500/30">
          <div className="text-sm text-emerald-400 font-medium mb-1">Лидеры</div>
          <div className="text-2xl font-bold text-white">{top8.length} команд</div>
          <div className="text-xs text-slate-400 mt-1">Топ-8 мест</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/30">
          <div className="text-sm text-amber-400 font-medium mb-1">Зона плей-офф</div>
          <div className="text-2xl font-bold text-white">{playoff.length} команд</div>
          <div className="text-xs text-slate-400 mt-1">9-24 места</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/10 to-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-rose-500/30">
          <div className="text-sm text-rose-400 font-medium mb-1">Выбывание</div>
          <div className="text-2xl font-bold text-white">{eliminated.length} команд</div>
          <div className="text-xs text-slate-400 mt-1">25-36 места</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-700 bg-slate-800/50">
                <th className="text-left py-4 px-4 font-medium">
                  <button
                    onClick={() => handleSort('position')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    #
                    <SortIcon column="position" />
                  </button>
                </th>
                <th className="text-left py-4 px-4 font-medium">Команда</th>
                <th className="text-center py-4 px-4 font-medium">
                  <button
                    onClick={() => handleSort('points')}
                    className="flex items-center gap-1 hover:text-white transition-colors mx-auto"
                  >
                    О
                    <SortIcon column="points" />
                  </button>
                </th>
                <th className="text-center py-4 px-4 font-medium hidden sm:table-cell">И</th>
                <th className="text-center py-4 px-4 font-medium hidden sm:table-cell">В</th>
                <th className="text-center py-4 px-4 font-medium hidden sm:table-cell">Н</th>
                <th className="text-center py-4 px-4 font-medium hidden sm:table-cell">П</th>
                <th className="text-center py-4 px-4 font-medium">
                  <button
                    onClick={() => handleSort('goalsFor')}
                    className="flex items-center gap-1 hover:text-white transition-colors mx-auto"
                  >
                    М
                    <SortIcon column="goalsFor" />
                  </button>
                </th>
                <th className="text-center py-4 px-4 font-medium hidden md:table-cell">
                  <button
                    onClick={() => handleSort('goalDifference')}
                    className="flex items-center gap-1 hover:text-white transition-colors mx-auto"
                  >
                    ±
                    <SortIcon column="goalDifference" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr
                  key={standing.team.id}
                  className={`
                    border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors
                    ${standing.position <= 8 ? 'bg-emerald-500/5' :
                      standing.position <= 24 ? 'bg-amber-500/5' : 'bg-rose-500/5'}
                  `}
                >
                  <td className="py-4 px-4">
                    <span className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm
                      ${standing.position <= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                        standing.position <= 24 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}
                    `}>
                      {standing.position}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center overflow-hidden">
                        <img
                          src={standing.team.logo}
                          alt={standing.team.name}
                          className="w-7 h-7 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/28?text=' + standing.team.shortName;
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-medium text-white text-sm block">
                          {standing.team.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {standing.team.country}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`
                      inline-block px-3 py-1.5 rounded-lg text-sm font-bold
                      ${standing.position <= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                        standing.position <= 24 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}
                    `}>
                      {standing.points}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400 text-sm hidden sm:table-cell">
                    {standing.played}
                  </td>
                  <td className="py-4 px-4 text-center text-emerald-400 text-sm font-medium hidden sm:table-cell">
                    {standing.won}
                  </td>
                  <td className="py-4 px-4 text-center text-amber-400 text-sm font-medium hidden sm:table-cell">
                    {standing.drawn}
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 text-sm font-medium hidden sm:table-cell">
                    {standing.lost}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-300 text-sm">
                    {standing.goalsFor}:{standing.goalsAgainst}
                  </td>
                  <td className="py-4 px-4 text-center hidden md:table-cell">
                    <span className={`
                      text-sm font-medium
                      ${standing.goalDifference > 0 ? 'text-emerald-400' :
                        standing.goalDifference < 0 ? 'text-rose-400' : 'text-slate-400'}
                    `}>
                      {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Standings;
