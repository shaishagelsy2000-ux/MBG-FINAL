interface HeroSectionProps {
  onNavigate: (view: 'login' | 'register') => void;
  isAuthenticated: boolean;
  onOpenDashboard: () => void;
}

export default function HeroSection({
  onNavigate,
  isAuthenticated,
  onOpenDashboard,
}: HeroSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ backgroundColor: 'rgba(212,160,23,0.15)', color: 'var(--accent)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Baru Diluncurkan · Data Dimulai dari Nol
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: 'var(--foreground)' }}
          >
            RateThePlate{' '}
            <span style={{ color: 'var(--accent)' }}>MBG</span>
            <br />
            Makanan Bergizi Gratis
          </h1>

          <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--muted-foreground)' }}>
            Platform digital transparan untuk akses review makanan, pemantauan food waste, dan evaluasi program MBG bagi guru, pelajar, serta ibu hamil dan menyusui.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => isAuthenticated ? onOpenDashboard() : onNavigate('register')}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              {isAuthenticated ? 'Buka Dashboard Saya' : 'Mulai Sekarang'}
            </button>
            <button
              onClick={() => {
                document.getElementById('section-favorites')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
            >
              Lihat Data Publik
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {[
            { value: '0', label: 'Pelajar Terdaftar', emptyText: 'Belum ada pelajar' },
            { value: '0', label: 'Sekolah Terpantau', emptyText: 'Belum ada sekolah' },
            { value: '0', label: 'Ulasan Masuk', emptyText: 'Belum ada ulasan' },
            { value: '0%', label: 'Efisiensi Program', emptyText: 'Belum ada data' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{s.value}</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--muted-foreground)' }}>{s.label}</div>
              <div className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.emptyText}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
