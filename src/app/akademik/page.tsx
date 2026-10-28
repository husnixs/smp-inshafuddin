import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Akademik & Kurikulum',
  description:
    'Kurikulum terpadu SMP Inshafuddin Banda Aceh: kurikulum nasional Kementerian Pendidikan dipadukan dengan kurikulum Dayah Terpadu Inshafuddin.',
  alternates: {
    canonical: `${siteConfig.url}/akademik/`,
  },
};

export default function AkademikPage() {
  const academicFeatures = [
    {
      title: 'Pendidikan Sekolah',
      desc: 'Dengan menggunakan kurikulum nasional dan tenaga guru profesional, kami mendidik siswa-siswi untuk berprestasi di bidang sains, matematika, sosial, dan humaniora.',
      badge: 'Kurikulum Nasional',
    },
    {
      title: 'Pendidikan Dayah',
      desc: 'Dibimbing langsung oleh ustadz dan ustazah mahir dalam penguasaan Kitab Kuning, pembiasaan ibadah, tadarus dan tajwid Al-Qur\'an, bahasa Arab, serta pembentukan akhlakul karimah.',
      badge: 'Kurikulum Dayah',
    },
    {
      title: 'Penguasaan Bahasa Asing',
      desc: 'Mewajibkan siswa aktif menguasai bahasa Arab dan bahasa Inggris dalam aktivitas harian, diperkuat dengan kegiatan debat, pidato, dan uji kecakapan bahasa.',
      badge: 'Bilingual',
    },
    {
      title: 'Hafalan Al-Qur\'an (Tahfiz)',
      desc: 'Program bimbingan hafalan ayat-ayat Al-Qur\'an berjenjang dengan target hafalan terukur dan setoran rutin terjadwal kepada ustadz/ustazah pembimbing.',
      badge: 'Tahfiz Quran',
    },
    {
      title: 'Penguasaan Teknologi Informasi',
      desc: 'Pemanfaatan laboratorium komputer modern terkoneksi internet dan instruktur TI untuk melatih siswa menguasai aplikasi komputer dan literasi digital.',
      badge: 'Literasi Digital',
    },
    {
      title: 'Pembinaan Olimpiade & Kompetisi',
      desc: 'Pelatihan intensif bagi siswa berpotensi untuk berkompetisi di perlombaan cerdas cermat, olimpiade sains daerah dan nasional.',
      badge: 'Prestasi Sains',
    },
    {
      title: 'Pertunjukan Seni & Budaya',
      desc: 'Melatih bakat seni santri/siswa dalam seni tari tradisional Aceh, kaligrafi Islam, dan pertunjukan seni kreatif yang ditampilkan pada ajang resmi.',
      badge: 'Seni Kreatif',
    },
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Header */}
        <div className="border-b border-divider pb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-emerald">
                  Beranda
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-emerald font-semibold">Akademik</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
            Wawasan Kurikulum & Program Akademik
          </h1>
          <p className="text-base text-ink-muted mt-2 max-w-3xl">
            Komitmen kami untuk memberikan pendidikan yang seimbang, mengasah ketajaman intelektual sekaligus memperkokoh pondasi keagamaan santri/siswa.
          </p>
        </div>

        {/* Landasan Kurikulum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-white p-8 rounded-card border border-divider shadow-sm">
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
              Standar Nasional
            </span>
            <h2 className="text-xl font-bold text-brand-emerald mb-4">
              Kurikulum Nasional
            </h2>
            <p className="text-sm text-ink-primary leading-relaxed">
              Kurikulum yang berlaku pada SMP Inshafuddin mengikuti kurikulum tingkat SMP sesuai dengan ketentuan Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. Seluruh buku teks pembelajaran disediakan di perpustakaan sekolah untuk memastikan setiap siswa memiliki akses materi yang memadai.
            </p>
          </div>

          <div className="bg-surface-white p-8 rounded-card border border-divider shadow-sm">
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
              Pesantren Terpadu
            </span>
            <h2 className="text-xl font-bold text-brand-emerald mb-4">
              Kurikulum Dayah Terpadu
            </h2>
            <p className="text-sm text-ink-primary leading-relaxed">
              Untuk pendidikan agama Islam dan ketrampilan keagamaan, sekolah mengintegrasikan kurikulum khas Dayah Terpadu Inshafuddin. Siswa mendapatkan pengajaran kitab mu\'tabarah, fardhu \'ain, pembiasaan shalat berjamaah, serta adab Islami di bawah bimbingan para dewan guru dan ustadz.
            </p>
          </div>
        </div>

        {/* 7 Program Unggulan Akademik */}
        <section className="space-y-8">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Program Unggulan
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Tujuh Dimensi Pembelajaran Siswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicFeatures.map((feat) => (
              <div
                key={feat.title}
                className="bg-surface-white p-6 sm:p-8 rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-3">
                    {feat.badge}
                  </span>
                  <h3 className="text-lg font-bold text-ink-primary mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
