import { useState } from 'react';
import type { User, Role, View } from '../../types';
import bgnLogo from '../../assets/bgn-logo.jpeg';

interface AuthPageProps {
  mode: 'login' | 'register';
  onAuth: (user: User) => void;
  onNavigate: (view: View) => void;
}

const ROLE_LABELS: Record<Role, string> = {
  pelajar: 'Pelajar',
  ibu_hamil: 'Ibu Hamil',
  ibu_menyusui: 'Ibu Menyusui',
  guru: 'Guru',
};

export default function AuthPage({ mode, onAuth, onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<Role>('pelajar');
  const [sekolah, setSekolah] = useState('');
  const [kota, setKota] = useState('');
  const [alergi, setAlergi] = useState('');
  const [penyakit, setPenyakit] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const inputStyle = {
    backgroundColor: 'var(--muted)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 14,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--muted-foreground)',
    marginBottom: 6,
    display: 'block',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@gmail.com')) {
      setError('Gunakan akun Gmail (@gmail.com).');
      return;
    }
    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (isLogin) {
      // Simulate login
      const storedRaw = localStorage.getItem('rtp_user');
      if (storedRaw) {
        const stored: User = JSON.parse(storedRaw);
        if (stored.email === email) {
          if (!(stored.role in ROLE_LABELS)) {
            setError('Peran akun ini sudah tidak tersedia. Silakan daftar kembali.');
            return;
          }
          onAuth(stored);
          return;
        }
      }
      // Demo fallback
      onAuth({ id: '1', email, username: email.split('@')[0], role: 'pelajar' });
    } else {
      if (!username.trim()) { setError('Username wajib diisi.'); return; }
      if (role === 'pelajar' && (!sekolah.trim() || !kota.trim())) {
        setError('Pelajar wajib mengisi asal sekolah dan kota/kabupaten.');
        return;
      }
      const user: User = { id: Date.now().toString(), email, username, role, sekolah, kota, alergi, penyakit };
      localStorage.setItem('rtp_user', JSON.stringify(user));
      // Redirect to login after register
      setIsLogin(true);
      setError('Pendaftaran berhasil! Silakan masuk.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
          style={{ color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Beranda
        </button>

        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={bgnLogo}
              alt="Logo Badan Gizi Nasional"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-base" style={{ color: 'var(--card-foreground)' }}>RateThePlate MBG</div>
              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setIsLogin(tab === 'login'); setError(''); }}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: (tab === 'login') === isLogin ? 'var(--card)' : 'transparent',
                  color: (tab === 'login') === isLogin ? 'var(--card-foreground)' : 'var(--muted-foreground)',
                  boxShadow: (tab === 'login') === isLogin ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {tab === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: error.includes('berhasil') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: error.includes('berhasil') ? '#10B981' : '#EF4444',
                border: `1px solid ${error.includes('berhasil') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label style={labelStyle}>Email Gmail</label>
              <input
                type="email"
                placeholder="nama@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Username (register only) */}
            {!isLogin && (
              <div>
                <label style={labelStyle}>Nama Lengkap / Username</label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                  onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                  onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role selector (register only) */}
            {!isLogin && (
              <>
                <div>
                  <label style={labelStyle}>Peran Anda</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(ROLE_LABELS) as [Role, string][]).map(([r, label]) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className="py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          backgroundColor: role === r ? 'var(--accent)' : 'var(--muted)',
                          color: role === r ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                          border: `1px solid ${role === r ? 'var(--accent)' : 'var(--border)'}`,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional fields */}
                {role === 'pelajar' && (
                  <>
                    {(!sekolah.trim() || !kota.trim()) && (
                      <div
                        className="col-span-full rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"
                        role="alert"
                      >
                        Asal sekolah dan kota/kabupaten wajib diisi untuk akun Pelajar.
                      </div>
                    )}
                    <div>
                      <label style={labelStyle}>Asal Sekolah <span className="text-accent">*</span></label>
                      <input
                        type="text"
                        placeholder="Contoh: SMPN 3 Surabaya"
                        value={sekolah}
                        onChange={(e) => setSekolah(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Kota / Kabupaten <span className="text-accent">*</span></label>
                      <input
                        type="text"
                        placeholder="Contoh: Surabaya"
                        value={kota}
                        onChange={(e) => setKota(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </>
                )}

                {(role === 'pelajar' || role === 'ibu_hamil' || role === 'ibu_menyusui') && (
                  <>
                    <div>
                      <label style={labelStyle}>Alergi (opsional)</label>
                      <input
                        type="text"
                        placeholder="Contoh: kacang tanah, seafood"
                        value={alergi}
                        onChange={(e) => setAlergi(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Penyakit Bawaan (opsional)</label>
                      <input
                        type="text"
                        placeholder="Contoh: diabetes, hipertensi"
                        value={penyakit}
                        onChange={(e) => setPenyakit(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 mt-2"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              {isLogin ? 'Masuk ke Akun' : 'Buat Akun'}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--muted-foreground)' }}>
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {isLogin ? 'Daftar di sini' : 'Masuk'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
