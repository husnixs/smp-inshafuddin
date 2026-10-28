import Link from 'next/link';

export default function OverviewSection() {
  const values = [
    {
      title: 'Karakter & Akhlak',
      description:
        'Menanamkan nilai-nilai kesantunan, integritas, dan disiplin berlandaskan ajaran Islam sebagai pondasi utama kepribadian setiap peserta didik.',
      icon: (
        <svg className="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Pendidikan Akademik',
      description:
        'Menerapkan kurikulum nasional dengan pembelajaran interaktif dan didukung guru profesional untuk menghasilkan pemikir yang kritis dan berdaya saing.',
      icon: (
        <svg className="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Pendidikan Dayah',
      description:
        'Membekali siswa dengan kajian kitab kuning, hafalan Al-Qur\'an, praktik ibadah harian, serta penguasaan bahasa Arab dan Inggris.',
      icon: (
        <svg className="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface-white border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
            Sekilas Sekolah
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
            Tiga Pilar Utama Pendidikan Kami
          </p>
          <p className="text-sm text-ink-muted mt-3">
            Menghadirkan keseimbangan antara kecerdasan intelektual, kemandirian spiritual, dan keterampilan praktis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 sm:p-8 rounded-card bg-surface-ivory border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-sage flex items-center justify-center mb-5 border border-brand-emerald/10">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-ink-primary mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-divider/60">
                <Link
                  href="/tentang-kami/"
                  className="inline-flex items-center text-xs font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald py-1"
                >
                  Pelajari Profil Sekolah
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
