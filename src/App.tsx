import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import MatchDetail from './pages/MatchDetail';
import Standings from './pages/Standings';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0F19] text-white">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        </div>

        <Header />

        <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-slate-800/50 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-500 text-sm">
              UCL Predictor 2025-2026 • Лига Чемпионов УЕФА
            </p>
            <p className="text-slate-600 text-xs mt-2">
              Статистика и прогнозы • Не является официальным сайтом УЕФА
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
