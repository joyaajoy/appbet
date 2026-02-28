import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, TrendingUp, Users, Target, Shield, Activity } from 'lucide-react';
import { getMatchById, getMatchesByRound } from '../lib/data';
import { predictMatch, getPredictionWithOdds, getFavorite } from '../lib/predictions';
import ProbabilityBar from '../components/ProbabilityBar';
import TeamForm from '../components/TeamForm';
import RadarChart from '../components/RadarChart';

const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const match = id ? getMatchById(id) : null;

  if (!match) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Матч не найден</h1>
        <Link to="/" className="text-blue-400 hover:underline">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const prediction = predictMatch(match.homeTeam, match.awayTeam);
  const predictionWithOdds = getPredictionWithOdds(prediction);
  const favorite = getFavorite(prediction);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const stats = [
    { label: 'xG (ожидаемые голы)', home: match.homeTeam.xG, away: match.awayTeam.xG, icon: Target, color: 'text-blue-400' },
    { label: 'xGA (ожидаемые пропущенные)', home: match.homeTeam.xGA, away: match.awayTeam.xGA, icon: Shield, color: 'text-rose-400' },
    { label: 'Владение мячом', home: match.homeTeam.possession, away: match.awayTeam.possession, icon: Activity, color: 'text-emerald-400' },
    { label: 'Удары в створ', home: match.homeTeam.shotsOnTarget, away: match.awayTeam.shotsOnTarget, icon: Target, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к матчам</span>
      </Link>

      {/* Match Header */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50">
        {/* Match Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span className="flex items-center gap-1.5 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(match.date)}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            {match.time}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-sm">
            <MapPin className="w-4 h-4" />
            {match.venue}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-8">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/30">
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96?text=' + match.homeTeam.shortName;
                }}
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
              {match.homeTeam.name}
            </h2>
            <span className="text-slate-400 text-sm mb-3">{match.homeTeam.country}</span>
            <TeamForm form={match.homeTeam.form} size="lg" />

            {match.homeTeam.injuredPlayers.length > 0 && (
              <div className="mt-4 px-3 py-2 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <p className="text-xs text-rose-400 font-medium">
                  Травмированы: {match.homeTeam.injuredPlayers.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* VS */}
          <div className="flex flex-col items-center px-4">
            <span className="text-4xl font-bold text-slate-600 mb-2">VS</span>
            <span className="text-sm text-slate-500">Тур {match.round}</span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/30">
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96?text=' + match.awayTeam.shortName;
                }}
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
              {match.awayTeam.name}
            </h2>
            <span className="text-slate-400 text-sm mb-3">{match.awayTeam.country}</span>
            <TeamForm form={match.awayTeam.form} size="lg" />

            {match.awayTeam.injuredPlayers.length > 0 && (
              <div className="mt-4 px-3 py-2 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <p className="text-xs text-rose-400 font-medium">
                  Травмированы: {match.awayTeam.injuredPlayers.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Прогноз матча
            </h3>
            <span className="text-sm text-slate-500">
              Уверенность: <span className="text-blue-400 font-semibold">{prediction.confidence}%</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className={`text-center p-4 rounded-xl border ${favorite === 'home' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800/50 border-slate-700/50'}`}>
              <div className="text-3xl font-bold text-white mb-1">
                {prediction.homeWin.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400">Победа</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">{predictionWithOdds.homeOdds}</div>
            </div>
            <div className={`text-center p-4 rounded-xl border ${favorite === 'draw' ? 'bg-amber-500/10 border-amber-500/50' : 'bg-slate-800/50 border-slate-700/50'}`}>
              <div className="text-3xl font-bold text-white mb-1">
                {prediction.draw.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400">Ничья</div>
              <div className="text-lg font-bold text-amber-400 mt-1">{predictionWithOdds.drawOdds}</div>
            </div>
            <div className={`text-center p-4 rounded-xl border ${favorite === 'away' ? 'bg-rose-500/10 border-rose-500/50' : 'bg-slate-800/50 border-slate-700/50'}`}>
              <div className="text-3xl font-bold text-white mb-1">
                {prediction.awayWin.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400">Победа</div>
              <div className="text-lg font-bold text-rose-400 mt-1">{predictionWithOdds.awayOdds}</div>
            </div>
          </div>

          <ProbabilityBar prediction={prediction} />

          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-8">
            <div className="text-center">
              <span className="text-slate-400 text-sm">Ожидаемый счёт</span>
              <div className="text-2xl font-bold text-white mt-1">
                {prediction.homeGoals.toFixed(1)} - {prediction.awayGoals.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Сравнение команд
          </h3>
          <RadarChart homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
        </div>

        {/* Stats Table */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Статистика сезона
          </h3>
          <div className="space-y-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const homePercent = (stat.home / (stat.home + stat.away)) * 100;
              const awayPercent = (stat.away / (stat.home + stat.away)) * 100;

              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm text-slate-400">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-white font-semibold w-12 text-right">{stat.home}</span>
                      <span className="text-slate-500">-</span>
                      <span className="text-white font-semibold w-12">{stat.away}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${homePercent}%` }}
                    />
                    <div
                      className="h-full bg-rose-500"
                      style={{ width: `${awayPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elo Ratings */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-white">{match.homeTeam.elo}</div>
                <div className="text-xs text-slate-400">Elo рейтинг</div>
              </div>
              <div className="text-slate-500">vs</div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-white">{match.awayTeam.elo}</div>
                <div className="text-xs text-slate-400">Elo рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
