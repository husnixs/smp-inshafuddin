import Link from 'next/link';
import Image from 'next/image';

export default function FacilitiesPreview() {
  const facilities = [
    {
      title: 'Ruang Pembelajaran',
      image: '/images/ruang-pembelajaran.webp',
      alt: 'Fasilitas Ruang Pembelajaran SMP Inshafuddin',
      description:
        'Ruang belajar yang nyaman dan kondusif untuk mendukung proses kegiatan belajar mengajar tatap muka secara efektif dan interaktif.',
      tag: 'Sarana Belajar',
    },
    {
      title: 'Lab Komputer',
      image: '/images/lab-komputer.webp',
      alt: 'Fasilitas Laboratorium Komputer SMP Inshafuddin',
      description:
        'Fasilitas praktikum teknologi informasi ber-AC yang terkoneksi internet serta sarana lab bahasa untuk pengembangan bahasa Arab dan Inggris.',
      tag: 'Praktikum & TI',
    },
    {
      title: 'Perpustakaan',
      image: '/images/perpustakaan.webp',
      alt: 'Fasilitas Perpustakaan Sekolah SMP Inshafuddin',
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
              className="bg-surface-white rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-surface-sage overflow-hidden border-b border-divider">
                  <Image
                    src={fac.image}
                    alt={fac.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-3">
                    {fac.tag}
                  </span>
                  <h3 className="text-lg font-bold text-ink-primary mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-divider/60 mt-4">
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
