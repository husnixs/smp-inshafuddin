import Link from 'next/link';

export default function ExtracurricularPreview() {
  const activities = [
    {
      title: 'Gerakan Pramuka',
      description:
        'Mengasah keterampilan fisik, intelektual, emosional, kemandirian, dan kepemimpinan sosial siswa melalui kepanduan berjiwa Islami.',
      tag: 'Karakter & Disiplin',
    },
    {
      title: 'Sanggar Seni Tari & Kaligrafi',
      description:
        'Mengembangkan minat dan bakat seni tradisi Aceh dan Islam, drama, serta seni kaligrafi Arab dengan pembimbing profesional.',
      tag: 'Seni & Budaya',
    },
    {
      title: 'Olahraga (Sepak Bola & Futsal)',
      description:
        'Wadah pembinaan bakat olahraga, kesehatan jasmani, kerja sama tim, dan sportivitas siswa di lapangan olahraga sekolah.',
      tag: 'Jasmani & Prestasi',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface-white border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Kehidupan Siswa
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Kegiatan Ekstrakurikuler Unggulan
            </p>
          </div>
          <Link
            href="/ekstrakurikuler/"
            className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald"
          >
            Lihat Semua Kegiatan
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((act) => (
            <div
              key={act.title}
              className="bg-surface-ivory p-6 sm:p-8 rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-4">
                  {act.tag}
                </span>
                <h3 className="text-lg font-bold text-ink-primary mb-3">
                  {act.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {act.description}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-divider/60">
                <Link
                  href="/ekstrakurikuler/"
                  className="text-xs font-semibold text-brand-emerald hover:underline"
                >
                  Detail Kegiatan &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
