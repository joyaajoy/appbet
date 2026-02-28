import { Prediction } from '../lib/types';

interface ProbabilityBarProps {
  prediction: Prediction;
  showLabels?: boolean;
}

const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ prediction, showLabels = true }) => {
  const { homeWin, draw, awayWin } = prediction;

  return (
    <div className="space-y-2">
      {showLabels && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-400 font-semibold">{homeWin.toFixed(1)}%</span>
          <span className="text-amber-400 font-semibold">{draw.toFixed(1)}%</span>
          <span className="text-rose-400 font-semibold">{awayWin.toFixed(1)}%</span>
        </div>
      )}

      <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden flex">
        {/* Home Win */}
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 relative"
          style={{ width: `${homeWin}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>

        {/* Draw */}
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 relative"
          style={{ width: `${draw}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Away Win */}
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-500 relative"
          style={{ width: `${awayWin}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {showLabels && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            П1
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            X
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            П2
          </span>
        </div>
      )}
    </div>
  );
};

export default ProbabilityBar;
