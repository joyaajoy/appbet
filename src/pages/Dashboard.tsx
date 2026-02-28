import { useState } from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MatchCard from '../components/MatchCard';
import { getUpcomingMatches, getMatchOfTheDay, matches } from '../lib/data';
import { predictMatch } from '../lib/predictions';

const Dashboard: React.FC = () => {
  const upcomingMatches = getUpcomingMatches();
  const matchOfTheDay = getMatchOfTheDay();
  const [selectedRound, setSelectedRound] = useState(1);

  const rounds = Array.from({ length: 8 }, (_, i) => i + 1);
  const roundMatches = matches.filter(m => m.round === selectedRound);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const prediction = matchOfTheDay ? predictMatch(matchOfTheDay.homeTeam, matchOfTheDay.awayTeam) : null;

  return (
    <div className="space-y-8">
      {/* Hero Section - Match of the Day */}
      {matchOfTheDay && prediction && (
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent rounded-3xl" />
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50 overflow-hidden">
            {/* Star decoration */}
            <div className="absolute top-4 right-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Match Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                    МАТЧ ДНЯ
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(matchOfTheDay.date)}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {matchOfTheDay.time}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between lg:justify-start lg:gap-12 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-2xl bg-slate-800/80 flex items-center justify-center overflow-hidden shadow-xl shadow-black/20">
                      <img
                        src={matchOfTheDay.homeTeam.logo}
                        alt={matchOfTheDay.homeTeam.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=' + matchOfTheDay.homeTeam.shortName;
                        }}
                      />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white text-center">
                      {matchOfTheDay.homeTeam.name}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-600">VS</span>
                    <span className="text-sm text-slate-500 mt-1">Группа {selectedRound}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-2xl bg-slate-800/80 flex items-center justify-center overflow-hidden shadow-xl shadow-black/20">
                      <img
                        src={matchOfTheDay.awayTeam.logo}
                        alt={matchOfTheDay.awayTeam.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=' + matchOfTheDay.awayTeam.shortName;
                        }}
                      />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white text-center">
                      {matchOfTheDay.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* Prediction */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700/30">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-400">Прогноз</span>
                    <span className="text-slate-500">置信度: {prediction.confidence}%</span>
                  </div>
                  <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden flex mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${prediction.homeWin}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: `${prediction.draw}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-400"
                      style={{ width: `${prediction.awayWin}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold">
                      {matchOfTheDay.homeTeam.shortName} {prediction.homeWin.toFixed(0)}%
                    </span>
                    <span className="text-amber-400 font-semibold">
                      Ничья {prediction.draw.toFixed(0)}%
                    </span>
                    <span className="text-rose-400 font-semibold">
                      {prediction.awayWin.toFixed(0)}% {matchOfTheDay.awayTeam.shortName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/match/${matchOfTheDay.id}`}
                className="lg:ml-8 group"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all duration-300">
                  <span className="text-white font-semibold">Анализ матча</span>
                  <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Round Selector */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Расписание туров</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {rounds.map((round) => (
            <button
              key={round}
              onClick={() => setSelectedRound(round)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${selectedRound === round
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-white'
                }
              `}
            >
              Тур {round}
            </button>
          ))}
        </div>
      </section>

      {/* Matches Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">
          Матчи тура {selectedRound}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {roundMatches.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* All Upcoming Matches */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">
          Предстоящие матчи
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {upcomingMatches.slice(0, 8).map((match) => (
            <MatchCard key={match.id} match={match} showPrediction={true} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
