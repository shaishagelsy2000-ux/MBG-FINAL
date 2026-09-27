import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import type { User } from '../../types';

const MENU_OPTIONS = ['Ayam', 'Telur', 'Ikan', 'Daging', 'Tahu', 'Tempe'];

const nutritionData: Array<{ subject: string; A: number }> = [];

const weeklyHistory: Array<{ hari: string; menu: string; rating: number; sisa: number }> = [];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
        >
          <svg viewBox="0 0 24 24" fill={(hover || value) >= s ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.5" className="w-6 h-6 transition-all">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function PhotoUpload({
  value,
  onChange,
  label,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  label: string;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div>
      <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
        {label}
      </label>
      <label
        className="relative flex flex-col items-center justify-center rounded-xl cursor-pointer overflow-hidden transition-all"
        style={{
          height: value ? 160 : 100,
          backgroundColor: value ? 'transparent' : 'var(--muted)',
          border: `2px dashed ${value ? 'var(--accent)' : 'var(--border)'}`,
        }}
      >
        {value ? (
          <>
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <span className="text-white text-xs font-medium">Ganti Foto</span>
            </div>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 mb-1" style={{ color: 'var(--muted-foreground)' }}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Ambil / Upload Foto Porsi</span>
          </>
        )}
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-1.5 text-xs transition-colors"
          style={{ color: '#ef4444' }}
        >
          Hapus foto
        </button>
      )}
    </div>
  );
}

interface ReviewEntry {
  id: number;
  menu: string;
  rating: number;
  comment: string;
  foto: string | null;
  waktu: string;
}

function now() {
  return new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
}

interface StudentDashboardProps {
  user: User;
  onReturnHome: () => void;
  audience?: 'student' | 'mom';
}

export default function StudentDashboard({
  user,
  onReturnHome,
  audience = 'student',
}: StudentDashboardProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const isMom = audience === 'mom';
  const roleLabel = user.role === 'ibu_hamil' ? 'Ibu Hamil' : 'Ibu Menyusui';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu || rating === 0) return;
    const entry: ReviewEntry = {
      id: Date.now(),
      menu: selectedMenu,
      rating,
      comment,
      foto,
      waktu: now(),
    };
    setReviews((prev) => [entry, ...prev]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setSelectedMenu(null);
    setRating(0);
    setComment('');
    setFoto(null);
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Selamat datang, {user.username}!
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {isMom
              ? `Dashboard ${roleLabel} · Program MBG`
              : `Dashboard Pelajar · ${user.sekolah || 'Sekolah belum diisi'} · ${user.kota || '—'}`}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Form review */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-semibold text-base mb-5" style={{ color: 'var(--card-foreground)' }}>
                Beri Ulasan Hari Ini
              </h2>

              {submitted && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                  ✓ Ulasan berhasil dikirim!
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Menu Hari Ini
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MENU_OPTIONS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMenu(m)}
                        className="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: selectedMenu === m ? 'var(--accent)' : 'var(--muted)',
                          color: selectedMenu === m ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Rating
                  </label>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Komentar (opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Bagaimana porsi hari ini?"
                    className="w-full text-sm resize-none outline-none"
                    style={{
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      color: 'var(--foreground)',
                    }}
                    onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'}
                    onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'}
                  />
                </div>

                <PhotoUpload
                  value={foto}
                  onChange={setFoto}
                  label="Foto Porsi Makanan (opsional)"
                />

                <button
                  type="submit"
                  disabled={!selectedMenu || rating === 0}
                  className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: selectedMenu && rating ? 'var(--accent)' : 'var(--muted)',
                    color: selectedMenu && rating ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                    cursor: selectedMenu && rating ? 'pointer' : 'not-allowed',
                  }}
                >
                  Kirim Ulasan
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

          {/* Right: charts & history */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nutrition radar */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--card-foreground)' }}>
                Asupan Gizi Mingguan (Estimasi)
              </h2>
              {nutritionData.length === 0 ? (
                <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
                  <p className="font-semibold text-foreground">Belum ada data asupan gizi</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Estimasi gizi akan tampil setelah data ulasan tersedia.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={nutritionData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'var(--muted-foreground)', fontFamily: 'Inter' }} />
                    <Radar name="Anda" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
                    <Tooltip formatter={(v) => [`${v}%`, 'Pemenuhan']} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Weekly history is only relevant to students. */}
            {!isMom && (
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              >
              <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--card-foreground)' }}>
                Sisa Makanan Minggu Ini (gram)
              </h2>
              {weeklyHistory.length === 0 ? (
                <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center">
                  <p className="font-semibold text-foreground">Belum ada riwayat makanan</p>
                  <p className="mt-1 text-sm text-muted-foreground">Data mingguan akan tampil setelah ulasan pertama.</p>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={weeklyHistory} barSize={28} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="hari" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
                    formatter={(v) => [`${v}g`, 'Sisa']}
                  />
                  <Bar dataKey="sisa" radius={[6, 6, 0, 0]}>
                    {weeklyHistory.map((d, i) => (
                      <Cell key={i} fill={d.sisa === 0 ? '#10B981' : d.sisa > 80 ? '#EF4444' : '#D4A017'} />
                    ))}
                  </Bar>
                    </BarChart>
                  </ResponsiveContainer>

              {/* Table */}
                  <div className="mt-4 space-y-2">
                    {weeklyHistory.map((d) => (
                  <div
                    key={d.hari}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{d.hari} — {d.menu}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} viewBox="0 0 24 24" fill={s <= d.rating ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.5" className="w-3.5 h-3.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-medium" style={{ color: d.sisa === 0 ? '#10B981' : d.sisa > 80 ? '#EF4444' : '#D4A017' }}>
                        {d.sisa}g sisa
                      </span>
                    </div>
                  </div>
                    ))}
                  </div>
                </>
              )}
              </div>
            )}
          </div>
        </div>

        {/* My reviews */}
        <div className="mt-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Ulasan Saya
            </h2>
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-semibold text-foreground">Belum ada ulasan</p>
                <p className="mt-1 text-sm text-muted-foreground">Ulasan yang Anda kirim akan tampil di sini.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  {r.foto && (
                    <div className="h-40 overflow-hidden bg-blue-900">
                      <img src={r.foto} alt="Foto ulasan" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: 'rgba(212,160,23,0.15)', color: 'var(--accent)' }}
                      >
                        {r.menu}
                      </span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} viewBox="0 0 24 24" fill={s <= r.rating ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.5" className="w-3.5 h-3.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {r.comment && (
                      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--card-foreground)', opacity: 0.85 }}>
                        "{r.comment}"
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{user.username}</span>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{r.waktu}</span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
