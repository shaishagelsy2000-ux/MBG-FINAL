import { useState } from "react";
import type { User, View } from "../types";
import bgnLogo from "../assets/logo.jpg";
interface HeaderProps {
  darkMode: boolean;
  toggleDark: () => void;
  user: User | null;
  showMainNavigation: boolean;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const NAV_ITEMS = [
  {
    id: "favorites",
    label: "Grafik Favorit",
    target: "section-favorites",
    iconOutline: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    protected: false,
  },
  {
    id: "reviews",
    label: "Ulasan Publik",
    target: "section-reviews",
    iconOutline: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    protected: false,
  },
  {
    id: "foodwaste",
    label: "Food Waste",
    target: "section-foodwaste",
    iconOutline: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    protected: false,
  },
  {
    id: "ibu",
    label: "Ibu Hamil & Menyusui",
    target: "section-ibu",
    iconOutline: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" strokeLinecap="round" />
        <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4v2a6 6 0 0 1-3 5.2V22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22h4" strokeLinecap="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <circle cx="12" cy="5" r="3" />
        <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4v2a6 6 0 0 1-3 5.2V22h-2v-0.8A6 6 0 0 1 8 16v-2z" />
        <rect x="10" y="21" width="4" height="1.5" rx="0.75" />
      </svg>
    ),
    protected: true,
  },
  {
    id: "guru",
    label: "Info Guru",
    target: "section-guru",
    iconOutline: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconFilled: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 10v6l-10 5-10-5v-6l10 5 10-5zM2 10l10-5 10 5-10 5-10-5z" />
      </svg>
    ),
    protected: true,
  },
];

export default function Header({ darkMode, toggleDark, user, showMainNavigation, onNavigate, onLogout }: HeaderProps) {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.protected && !user) {
      onNavigate("login");
      return;
    }
    setActiveNav(item.id);
    const el = document.getElementById(item.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5 shrink-0 group">
            <img src={bgnLogo} alt="Logo Badan Gizi Nasional" className="h-10 w-10 rounded-full object-cover" />
            <div className="hidden sm:block">
              <div className="font-bold text-base leading-tight" style={{ color: "var(--foreground)" }}>
                RateThePlate
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                MBG
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          {showMainNavigation && (
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--muted-foreground)",
                      backgroundColor: isActive ? "rgba(212, 160, 23, 0.12)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <span style={{ color: isActive ? "var(--accent)" : "inherit" }}>{isActive ? item.iconFilled : item.iconOutline}</span>
                    <span>{item.label}</span>
                    {item.protected && !user && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5 opacity-60">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)";
                (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)";
              }}
              title={darkMode ? "Mode Terang" : "Mode Gelap"}
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
                  <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
                  <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
                  <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* User/menu button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                  style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-24 truncate">{user.username}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-12 w-48 rounded-xl shadow-xl overflow-hidden z-50" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onNavigate("dashboard");
                      }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{ color: "var(--card-foreground)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                    >
                      Dashboard Saya
                    </button>
                    <div style={{ height: "1px", backgroundColor: "var(--border)" }} />
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{ color: "#ef4444" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)";
                    (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)";
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-12 w-48 rounded-xl shadow-xl overflow-hidden z-50" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onNavigate("login");
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                      style={{ color: "var(--card-foreground)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                    >
                      Masuk / Login
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onNavigate("register");
                      }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{ color: "var(--card-foreground)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--muted)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                    >
                      Daftar Akun
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {showMainNavigation && (
          <nav className="lg:hidden flex gap-1 pb-3 overflow-x-auto scrollbar-hide">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--muted-foreground)",
                    backgroundColor: isActive ? "rgba(212, 160, 23, 0.12)" : "var(--muted)",
                  }}
                >
                  <span>{isActive ? item.iconFilled : item.iconOutline}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
