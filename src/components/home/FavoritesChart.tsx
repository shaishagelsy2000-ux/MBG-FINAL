import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { menu: 'Ayam', votes: 0, color: '#D4A017' },
  { menu: 'Telur', votes: 0, color: '#3B82F6' },
  { menu: 'Ikan', votes: 0, color: '#10B981' },
  { menu: 'Daging', votes: 0, color: '#EF4444' },
  { menu: 'Tahu', votes: 0, color: '#8B5CF6' },
  { menu: 'Tempe', votes: 0, color: '#F97316' },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { menu: string; color: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="px-3 py-2 rounded-xl text-sm shadow-lg"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)' }}
    >
      <div className="font-semibold">{item.payload.menu}</div>
      <div style={{ color: item.payload.color }}>{item.value.toLocaleString()} suara</div>
    </div>
  );
}

export default function FavoritesChart() {
  const totalVotes = data.reduce((total, item) => total + item.votes, 0);

  return (
    <section id="section-favorites" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: 'var(--accent)' }}>
              <rect x="3" y="12" width="4" height="9" rx="1" />
              <rect x="10" y="7" width="4" height="14" rx="1" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Grafik Publik
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Menu MBG Paling Favorit
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Berdasarkan voting dari seluruh pelajar yang terdaftar di platform ini
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {data.map((item) => (
              <div
                key={item.menu}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                <div className="text-xl font-bold" style={{ color: item.color }}>
                  {item.votes.toLocaleString()}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  {item.menu}
                </div>
              </div>
            ))}
          </div>

          {totalVotes === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 h-10 w-10 text-muted-foreground">
                <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-semibold text-foreground">Belum ada voting menu</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Grafik favorit akan tampil setelah voting pertama masuk.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data} barSize={40} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="menu"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: 'var(--muted-foreground)', fontFamily: 'Inter' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)', fontFamily: 'Inter' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                  {data.map((entry) => (
                    <Cell key={entry.menu} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}
