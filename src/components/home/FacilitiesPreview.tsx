import Link from 'next/link';

export default function FacilitiesPreview() {
  const facilities = [
    {
      title: 'Ruang Kelas Pembelajaran',
      description:
        'Ruang belajar yang nyaman dan kondusif untuk mendukung proses kegiatan belajar mengajar tatap muka secara efektif dan interaktif.',
      tag: 'Sarana Belajar',
    },
    {
      title: 'Laboratorium Komputer & Bahasa',
      description:
        'Fasilitas praktikum teknologi informasi ber-AC yang terkoneksi internet serta sarana lab bahasa untuk pengembangan bahasa Arab dan Inggris.',
      tag: 'Praktikum & TI',
    },
    {
      title: 'Perpustakaan & Laboratorium IPA',
      description:
        'Koleksi lengkap buku pelajaran, referensi umum, dan kitab-kitab penunjang, didukung lab sains untuk eksperimen biologi dan fisika.',
      tag: 'Pustaka & Sains',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface-ivory border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Sarana & Prasarana
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Fasilitas Pendukung Kegiatan Belajar
            </p>
          </div>
          <Link
            href="/fasilitas/"
            className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald"
          >
            Lihat Seluruh Fasilitas
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.title}
              className="bg-surface-white p-6 sm:p-8 rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-4">
                  {fac.tag}
                </span>
                <h3 className="text-lg font-bold text-ink-primary mb-3">
                  {fac.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {fac.description}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-divider/60">
                <Link
                  href="/fasilitas/"
                  className="text-xs font-semibold text-brand-emerald hover:underline"
                >
                  Informasi Sarana &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
