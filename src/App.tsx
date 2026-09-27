import { useState, useEffect } from 'react';
import type { User, View } from './types';
import Header from './components/Header';
import HeroSection from './components/home/HeroSection';
import FavoritesChart from './components/home/FavoritesChart';
import PublicReviews from './components/home/PublicReviews';
import FoodWasteChart from './components/home/FoodWasteChart';
import AuthPage from './components/auth/AuthPage';
import StudentDashboard from './components/dashboard/StudentDashboard';
import MomDashboard from './components/dashboard/MomDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import bgnLogo from './assets/bgn-logo.jpeg';

const SUPPORTED_ROLES = ['pelajar', 'ibu_hamil', 'ibu_menyusui', 'guru'] as const;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Try restoring session
  useEffect(() => {
    const stored = localStorage.getItem('rtp_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        if (SUPPORTED_ROLES.some((role) => role === parsed.role)) setUser(parsed);
        else localStorage.removeItem('rtp_session');
      } catch {}
    }
  }, []);

  const handleAuth = (u: User) => {
    setUser(u);
    localStorage.setItem('rtp_session', JSON.stringify(u));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rtp_session');
    setView('home');
  };

  const handleNavigate = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {view !== 'login' && view !== 'register' && (
        <Header
          darkMode={darkMode}
          toggleDark={() => setDarkMode(!darkMode)}
          user={user}
          showMainNavigation={view === 'home'}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      {view === 'home' && (
        <main>
          <HeroSection
            onNavigate={(v) => handleNavigate(v)}
            isAuthenticated={Boolean(user)}
            onOpenDashboard={() => handleNavigate('dashboard')}
          />
          <FavoritesChart />
          <PublicReviews />
          <FoodWasteChart />

          {/* Protected section placeholders */}
          <section id="section-ibu" className="py-16 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center"
                style={{ backgroundColor: 'var(--card)', border: '1px dashed var(--border)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mb-4" style={{ color: 'var(--accent)' }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                </svg>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  Konten Ibu Hamil & Menyusui
                </h2>
                <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Ulasan makanan, data gizi personal, dan pemantauan asupan tersedia setelah login.
                </p>
                <button
                  onClick={() => handleNavigate(user ? 'dashboard' : 'login')}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {user ? 'Buka Dashboard Saya' : 'Masuk untuk Mengakses'}
                </button>
              </div>
            </div>
          </section>

          <section id="section-guru" className="py-8 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center"
                style={{ backgroundColor: 'var(--card)', border: '1px dashed var(--border)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mb-4" style={{ color: '#3B82F6' }}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  Monitoring Guru
                </h2>
                <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Laporan porsi MBG, upload foto wadah, dan pantau food waste sekolah tersedia untuk guru terdaftar.
                </p>
                <button
                  onClick={() => handleNavigate(user ? 'dashboard' : 'login')}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ backgroundColor: '#3B82F6', color: '#fff' }}
                >
                  {user ? 'Buka Dashboard Saya' : 'Masuk sebagai Guru'}
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={bgnLogo}
                  alt="Logo Badan Gizi Nasional"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                  RateThePlate MBG · Platform Transparansi Gizi Nasional
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Badan Gizi Nasional (BGN) © 2026
              </p>
            </div>
          </footer>
        </main>
      )}

      {view === 'login' && (
        <AuthPage mode="login" onAuth={handleAuth} onNavigate={handleNavigate} />
      )}
      {view === 'register' && (
        <AuthPage mode="register" onAuth={handleAuth} onNavigate={handleNavigate} />
      )}

      {view === 'dashboard' && user && (
        <>
          <div>
            {user.role === 'guru' ? (
              <TeacherDashboard user={user} onReturnHome={() => handleNavigate('home')} />
            ) : user.role === 'ibu_hamil' || user.role === 'ibu_menyusui' ? (
              <MomDashboard user={user} onReturnHome={() => handleNavigate('home')} />
            ) : (
              <StudentDashboard user={user} onReturnHome={() => handleNavigate('home')} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
