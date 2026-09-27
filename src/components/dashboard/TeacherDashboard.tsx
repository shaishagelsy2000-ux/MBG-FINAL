import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { User } from '../../types';

const weeklyData: Array<{ hari: string; datang: number; dimakan: number; sisa: number }> = [];

interface TeacherDashboardProps {
  user: User;
  onReturnHome: () => void;
}

export default function TeacherDashboard({ user, onReturnHome }: TeacherDashboardProps) {
  const [jumlahDatang, setJumlahDatang] = useState('');
  const [jumlahDimakan, setJumlahDimakan] = useState('');
  const [fotoDatang, setFotoDatang] = useState<string | null>(null);
  const [fotoKembali, setFotoKembali] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jumlahDatang || !jumlahDimakan || !fotoDatang || !fotoKembali) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setJumlahDatang('');
    setJumlahDimakan('');
    setFotoDatang(null);
    setFotoKembali(null);
  };

  const sisa = Math.max(0, Number(jumlahDatang) - Number(jumlahDimakan));

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
            style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#3B82F6' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M22 10v6l-10 5-10-5v-6l10 5 10-5zM2 10l10-5 10 5-10 5-10-5z" />
            </svg>
            Guru / Pengajar
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Monitoring MBG — {user.username}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Laporan porsi harian dan pemantauan food waste di sekolah
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Report form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-semibold text-base mb-5" style={{ color: 'var(--card-foreground)' }}>
                Input Laporan Hari Ini
              </h2>

              {submitted && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                  ✓ Laporan berhasil dikirim!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Foto datang */}
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Foto Wadah Saat Datang *
                  </label>
                  <label
                    className="flex flex-col items-center justify-center h-24 rounded-xl cursor-pointer transition-colors"
                    style={{
                      backgroundColor: fotoDatang ? 'transparent' : 'var(--muted)',
                      border: `2px dashed ${fotoDatang ? 'var(--accent)' : 'var(--border)'}`,
                      overflow: 'hidden',
                    }}
                  >
                    {fotoDatang ? (
                      <img src={fotoDatang} alt="Foto datang" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 mb-1" style={{ color: 'var(--muted-foreground)' }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Upload foto</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, setFotoDatang)} />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      Porsi Datang *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={jumlahDatang}
                      onChange={(e) => setJumlahDatang(e.target.value)}
                      placeholder="120"
                      required
                      className="w-full text-sm outline-none"
                      style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: 'var(--foreground)' }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      Porsi Dimakan *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={jumlahDimakan}
                      onChange={(e) => setJumlahDimakan(e.target.value)}
                      placeholder="108"
                      required
                      className="w-full text-sm outline-none"
                      style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: 'var(--foreground)' }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>

                {jumlahDatang && jumlahDimakan && (
                  <div
                    className="px-4 py-3 rounded-xl flex items-center justify-between"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Estimasi sisa porsi:</span>
                    <span className="font-bold text-sm" style={{ color: sisa > 15 ? '#EF4444' : '#10B981' }}>
                      {sisa} porsi ({jumlahDatang ? Math.round((sisa / Number(jumlahDatang)) * 100) : 0}%)
                    </span>
                  </div>
                )}

                {/* Foto kembali */}
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Foto Wadah Saat Dikembalikan *
                  </label>
                  <label
                    className="flex flex-col items-center justify-center h-24 rounded-xl cursor-pointer transition-colors"
                    style={{
                      backgroundColor: fotoKembali ? 'transparent' : 'var(--muted)',
                      border: `2px dashed ${fotoKembali ? 'var(--accent)' : 'var(--border)'}`,
                      overflow: 'hidden',
                    }}
                  >
                    {fotoKembali ? (
                      <img src={fotoKembali} alt="Foto kembali" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 mb-1" style={{ color: 'var(--muted-foreground)' }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Upload foto</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, setFotoKembali)} />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!jumlahDatang || !jumlahDimakan || !fotoDatang || !fotoKembali}
                  className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: jumlahDatang && jumlahDimakan && fotoDatang && fotoKembali ? 'var(--accent)' : 'var(--muted)',
                    color: jumlahDatang && jumlahDimakan && fotoDatang && fotoKembali ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                  }}
                >
                  Kirim Laporan
                </button>
                <button
                  type="button"
                  onClick={onReturnHome}
                  className="w-full rounded-xl border border-border bg-transparent py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Kembali ke Beranda
                </button>
              </form>
            </div>
          </div>

          {/* Stats & chart */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Porsi Minggu Ini', value: weeklyData.reduce((a, b) => a + b.datang, 0).toString(), color: '#3B82F6' },
                { label: 'Dimakan', value: weeklyData.reduce((a, b) => a + b.dimakan, 0).toString(), color: '#10B981' },
                { label: 'Sisa / Food Waste', value: weeklyData.reduce((a, b) => a + b.sisa, 0).toString(), color: '#EF4444' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Grouped bar chart */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--card-foreground)' }}>
                Distribusi Porsi Minggu Ini
              </h2>
              {weeklyData.length === 0 ? (
                <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
                  <p className="font-semibold text-foreground">Belum ada laporan porsi</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Grafik akan tampil setelah laporan pertama dikirim.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={weeklyData} barGap={4} barSize={20} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="hari" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="datang" name="Datang" fill="#3B82F6" />
                    <Bar dataKey="dimakan" name="Dimakan" fill="#10B981" />
                    <Bar dataKey="sisa" name="Sisa" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* History table */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="font-semibold text-base" style={{ color: 'var(--card-foreground)' }}>
                  Riwayat Laporan Minggu Ini
                </h2>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {weeklyData.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <p className="font-semibold text-foreground">Belum ada riwayat laporan</p>
                    <p className="mt-1 text-sm text-muted-foreground">Laporan yang dikirim akan tampil di sini.</p>
                  </div>
                ) : weeklyData.map((d) => {
                  const pct = Math.round((d.sisa / d.datang) * 100);
                  return (
                    <div key={d.hari} className="px-6 py-3.5 flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{d.hari}</span>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        <span><span className="font-semibold" style={{ color: '#3B82F6' }}>{d.datang}</span> datang</span>
                        <span><span className="font-semibold" style={{ color: '#10B981' }}>{d.dimakan}</span> dimakan</span>
                        <span
                          className="font-semibold"
                          style={{ color: pct > 12 ? '#EF4444' : '#10B981' }}
                        >
                          {d.sisa} sisa ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
