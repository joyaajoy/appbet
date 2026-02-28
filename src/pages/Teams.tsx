import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, TrendingUp, Target, Shield, Activity, Globe } from 'lucide-react';
import { teams } from '../lib/data';
import TeamForm from '../components/TeamForm';

const Teams: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countries = [...new Set(teams.map(t => t.country))];

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || team.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Команды</h1>
            <p className="text-slate-400 text-sm">Лига Чемпионов 2025-2026</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск команды..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Country Filter */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
        >
          <option value="all">Все страны</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTeams.map(team => (
          <div
            key={team.id}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            {/* Team Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + team.shortName;
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{team.name}</h3>
                <div className="flex items-center gap-1 text-sm text-slate-400">
                  <Globe className="w-3.5 h-3.5" />
                  {team.country}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-2">Последние 5 матчей</div>
              <TeamForm form={team.form} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center p-2 bg-slate-800/60 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Elo</span>
                </div>
                <div className="text-sm font-bold text-white">{team.elo}</div>
              </div>
              <div className="text-center p-2 bg-slate-800/60 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
                  <Target className="w-3 h-3 text-emerald-400" />
                  <span>xG</span>
                </div>
                <div className="text-sm font-bold text-emerald-400">{team.xG.toFixed(1)}</div>
              </div>
              <div className="text-center p-2 bg-slate-800/60 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
                  <Shield className="w-3 h-3 text-rose-400" />
                  <span>xGA</span>
                </div>
                <div className="text-sm font-bold text-rose-400">{team.xGA.toFixed(1)}</div>
              </div>
              <div className="text-center p-2 bg-slate-800/60 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
                  <Activity className="w-3 h-3 text-blue-400" />
                  <span>%</span>
                </div>
                <div className="text-sm font-bold text-blue-400">{team.possession}%</div>
              </div>
            </div>

            {/* Injuries */}
            {team.injuredPlayers.length > 0 && (
              <div className="pt-3 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-rose-400">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Травмированы: {team.injuredPlayers.join(', ')}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Команды не найдены</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
