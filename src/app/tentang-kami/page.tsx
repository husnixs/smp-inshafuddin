import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/wordpress/api';
import { siteConfig } from '@/config/site';

export const revalidate = 3600; // 60 menit

export const metadata: Metadata = {
  title: 'Profil & Tentang Kami',
  description:
    'Sejarah berdirinya SMP Inshafuddin Banda Aceh sejak tahun 1974, visi, misi, tujuan pendidikan, serta struktur pimpinan sekolah.',
  alternates: {
    canonical: `${siteConfig.url}/tentang-kami/`,
  },
};

export default async function TentangKamiPage() {
  // Ambil data jika tersedia dari WP
  const pageData = await getPageBySlug('tentang-kami');

  const teachers = [
    {
      name: 'Warnidah, S.Pd.I',
      role: 'Kepala SMP Inshafuddin Banda Aceh',
      image: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-20.54.08-682x1024.jpeg',
    },
    {
      name: 'Salsabila Dahniar, S.Pd',
      role: 'Waka Kurikulum SMP Inshafuddin Banda Aceh',
      image: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-20.54.07-682x1024.jpeg',
    },
    {
      name: 'Nurul Sri Wahyuni, S.Pd',
      role: 'Waka Kesiswaan SMP Inshafuddin Banda Aceh',
      image: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-20.54.07-1-682x1024.jpeg',
    },
  ];

  const missions = [
    'Mewujudkan kurikulum Tingkat Satuan Pendidikan yang adaptif dan komprehensif.',
    'Memupuk rasa kerja yang tinggi pada warga sekolah dan mengembangkan suasana yang Islami dalam lingkungan sekolah.',
    'Mewujudkan pendidikan yang bermutu, efisien, relevan, serta berbudaya tinggi.',
    'Mewujudkan tata kelola pendidikan yang transparan, akuntabel, partisipatif, dan efektif.',
    'Mewujudkan kesempatan pendidikan yang adil dan merata bagi seluruh peserta didik.',
    'Mengoptimalkan proses pembelajaran yang valid, nyata, dan reliabel.',
    'Mewujudkan sarana dan prasarana pembelajaran sesuai Standar Nasional Pendidikan (SNP).',
    'Mewujudkan lulusan yang cerdas, terampil, beriman, dan bertaqwa kepada Allah SWT.',
  ];

  const goals = [
    'Memiliki keunggulan kompetitif untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.',
    'Membentuk generasi berakhlak mulia (Akhlakul Karimah) dalam ucapan dan perbuatan.',
    'Mewujudkan kehidupan lingkungan sekolah yang berbudaya Islami secara konsisten.',
    'Peka dan adaptif terhadap perkembangan serta kemajuan ilmu pengetahuan dan teknologi.',
    'Mempertahankan dan meningkatkan mutu akademik peserta didik secara berkesinambungan.',
    'Meningkatkan pencapaian Kriteria Ketuntasan Minimal (KKM) dan nilai rata-rata rapor.',
    'Meningkatkan penguasaan aktif Bahasa Arab dan Bahasa Inggris siswa hingga mencapai prestasi pada lomba pidato, cerdas cermat, dan olimpiade.',
    'Meningkatkan kemampuan dan prestasi siswa di bidang olahraga dan seni di tingkat Kota Banda Aceh dan Provinsi Aceh.',
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
              <li className="text-brand-emerald font-semibold">Tentang Kami</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
            Profil & Sejarah Sekolah
          </h1>
          <p className="text-base text-ink-muted mt-2 max-w-3xl">
            Mengenal lebih dekat identitas, sejarah, visi misi, serta komitmen pengabdian SMP Inshafuddin Banda Aceh sejak tahun 1974.
          </p>
        </div>

        {/* Sejarah Berdiri */}
        <section className="bg-surface-white p-8 sm:p-12 rounded-card border border-divider shadow-sm space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-surface-sage text-brand-emerald text-xs font-semibold">
            Sejarah Singkat
          </div>
          <h2 className="text-2xl font-bold text-brand-emerald">
            Didirikan Sejak Tahun 1974
          </h2>
          <div className="text-ink-primary leading-relaxed space-y-4 text-base">
            <p>
              <strong>SMP Inshafuddin</strong> merupakan sekolah swasta di bawah naungan <strong>Yayasan Pembina Inshafuddin</strong>, berlokasi di Desa Lambaro Skep, Kecamatan Kuta Alam, Kota Banda Aceh. Sekolah ini didirikan pada tahun <strong>1974</strong> sebagai bagian dari kesadaran para ulama dan tokoh masyarakat Aceh untuk melahirkan lembaga pendidikan yang memadukan ilmu pengetahuan umum dan dasar-dasar ilmu agama Islam.
            </p>
            <p>
              Berada di lingkungan <strong>Dayah Terpadu Inshafuddin</strong>, SMP Inshafuddin menerapkan model pendidikan integral di mana peserta didik tidak hanya belajar sesuai kurikulum nasional, tetapi juga mendapatkan pembinaan moral, pengajian kitab, hafalan Al-Qur\'an, serta penguasaan bahasa asing.
            </p>
          </div>
        </section>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Visi */}
          <section className="lg:col-span-5 bg-brand-emerald text-surface-white p-8 sm:p-10 rounded-card flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-3 block">
                Visi Sekolah
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-6">
                &ldquo;Terwujudnya insan yang berkarakter, unggul dalam prestasi, dan bertaqwa kepada Allah SWT.&rdquo;
              </h2>
            </div>
            <div className="pt-6 border-t border-surface-sage/20 text-xs text-surface-sage/80 leading-relaxed">
              Visi ini menjadi rujukan utama bagi setiap kebijakan kurikulum, bimbingan kesiswaan, dan tata pergaulan di SMP Inshafuddin Banda Aceh.
            </div>
          </section>

          {/* Misi */}
          <section className="lg:col-span-7 bg-surface-white p-8 sm:p-10 rounded-card border border-divider shadow-sm">
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-3 block">
              Misi Sekolah
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-emerald mb-6">
              Delapan Misi Utama
            </h2>
            <ol className="space-y-3.5 text-sm text-ink-primary">
              {missions.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-sage text-brand-emerald font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Tujuan Pendidikan */}
        <section className="bg-surface-white p-8 sm:p-12 rounded-card border border-divider shadow-sm">
          <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
            Tujuan Institusi
          </span>
          <h2 className="text-2xl font-bold text-brand-emerald mb-6">
            Tujuan Pendidikan SMP Inshafuddin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-ink-primary">
            {goals.map((g, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-ivory border border-divider/70 flex items-start gap-3">
                <span className="text-brand-gold font-bold">✓</span>
                <span className="leading-relaxed">{g}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pimpinan & Tenaga Pendidik */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
              Struktur Kepemimpinan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Pimpinan & Tenaga Kependidikan
            </h2>
            <p className="text-sm text-ink-muted mt-2">
              Didukung oleh guru dan tenaga kependidikan yang berdedikasi membimbing dan mengayomi siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {teachers.map((t) => (
              <div
                key={t.name}
                className="bg-surface-white rounded-card border border-divider overflow-hidden text-center shadow-sm p-6 flex flex-col items-center"
              >
                <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-sm bg-surface-sage mb-4 border border-divider">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 640px) 144px, 144px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-bold text-brand-emerald text-base">
                  {t.name}
                </h3>
                <p className="text-xs text-ink-muted mt-1">
                  {t.role}
                </p>
              </div>
            ))}
          </div>

          {/* Bagan Struktur Organisasi jika tersedia dari WordPress */}
          <div className="bg-surface-white p-6 sm:p-8 rounded-card border border-divider text-center">
            <h3 className="text-base font-bold text-brand-emerald mb-4">
              Bagan Struktur Organisasi Sekolah
            </h3>
            <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-surface-sage border border-divider">
              <Image
                src="https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-19-at-21.24.47-1.jpeg"
                alt="Bagan Struktur Organisasi SMP Inshafuddin Banda Aceh"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-ink-muted mt-3">
              Bagan resmi struktur organisasi SMP Inshafuddin Banda Aceh.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
