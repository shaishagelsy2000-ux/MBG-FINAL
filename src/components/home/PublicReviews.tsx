export default function PublicReviews() {
  return (
    <section id="section-reviews" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: 'var(--accent)' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Ulasan Publik
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Apa Kata Pelajar?
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Review asli dari pelajar di seluruh Indonesia dilengkapi foto porsi
          </p>
        </div>

        <div
          className="rounded-2xl p-14 flex flex-col items-center text-center"
          style={{ backgroundColor: 'var(--card)', border: '1px dashed var(--border)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-12 h-12 mb-4" style={{ color: 'var(--muted-foreground)' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-base font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
            Belum ada ulasan
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Jadilah yang pertama memberikan ulasan setelah login.
          </p>
        </div>
      </div>
    </section>
  );
}
