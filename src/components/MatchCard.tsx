import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Match, Prediction } from '../lib/types';
import { predictMatch } from '../lib/predictions';
import ProbabilityBar from './ProbabilityBar';

interface MatchCardProps {
  match: Match;
  showPrediction?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, showPrediction = true }) => {
  const prediction: Prediction = predictMatch(match.homeTeam, match.awayTeam);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Link
      to={`/match/${match.id}`}
      className="block group"
    >
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        {/* Match Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{match.time}</span>
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 mb-2 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + match.homeTeam.shortName;
                }}
              />
            </div>
            <span className="text-sm font-medium text-slate-200 text-center leading-tight">
              {match.homeTeam.name}
            </span>
          </div>

          <div className="flex flex-col items-center px-4">
            <span className="text-2xl font-bold text-slate-500">VS</span>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 mb-2 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + match.awayTeam.shortName;
                }}
              />
            </div>
            <span className="text-sm font-medium text-slate-200 text-center leading-tight">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Prediction */}
        {showPrediction && (
          <div className="mt-3 pt-3 border-t border-slate-700/50">
            <ProbabilityBar prediction={prediction} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default MatchCard;
