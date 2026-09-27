import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data: Array<Record<string, string | number>> = [];

const COLORS = {
  ayam: '#D4A017',
  telur: '#3B82F6',
  ikan: '#10B981',
  daging: '#EF4444',
  tahu: '#8B5CF6',
  tempe: '#F97316',
};

const STAT_CARDS = [
  { label: 'Total Sisa (Ton)', value: '0' },
  { label: 'Rata-rata Per Porsi', value: '0g' },
  { label: 'Sekolah Terpantau', value: '0' },
  { label: 'Efisiensi Program', value: '0%' },
];

export default function FoodWasteChart() {
  return (
    <section id="section-foodwaste" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" style={{ color: 'var(--accent)' }}>
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Pemantauan Global
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Grafik Food Waste MBG
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Data sisa makanan agregat akan tampil setelah laporan pertama masuk
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>
                {s.label}
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--card-foreground)' }}>
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Belum ada data</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
        >
          {data.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 h-10 w-10 text-muted-foreground">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-semibold text-foreground">Belum ada data food waste</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Grafik akan tampil setelah laporan pertama dikirim oleh guru.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
                <defs>
                  {Object.entries(COLORS).map(([key, color]) => (
                    <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="bulan" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v}kg`} />
                <Tooltip />
                <Legend />
                {Object.entries(COLORS).map(([key, color]) => (
                  <Area key={key} type="monotone" dataKey={key} stroke={color} fill={`url(#grad-${key})`} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}
