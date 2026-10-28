import type { Metadata } from 'next';
import Image from 'next/image';
import { getPageBySlug } from '@/lib/wordpress/api';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PAGE_SEO } from '@/lib/seo/pages';
import { SCHOOL_ID, siteGraph, webPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ArchDivider from '@/components/ui/ArchDivider';
import MihrabFrame from '@/components/ui/MihrabFrame';

export const revalidate = 3600; // 60 menit

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.tentangKami);

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
    <>
      <JsonLd
        data={siteGraph(
          webPageSchema({
            type: 'AboutPage',
            path: PAGE_SEO.tentangKami.path,
            name: PAGE_SEO.tentangKami.title,
            description: PAGE_SEO.tentangKami.description,
            mainEntityId: SCHOOL_ID,
          }),
        )}
      />
      <PageHero
        eyebrow="Profil Sekolah"
        title="Profil & Sejarah Sekolah"
        description="Mengenal lebih dekat identitas, sejarah, visi misi, serta komitmen pengabdian SMP Inshafuddin Banda Aceh sejak tahun 1974."
        breadcrumb={[{ label: 'Tentang Kami' }]}
      />

      {/* Sejarah */}
      <section aria-labelledby="sejarah-heading" className="bg-surface-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-4">
            <SectionHeading id="sejarah-heading" eyebrow="Sejarah Singkat" title="Didirikan sejak tahun 1974" />
            <p aria-hidden="true" className="-mt-4 hidden font-display text-8xl font-semibold leading-none text-brand-gold/40 lg:block">
              1974
            </p>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-primary sm:text-lg lg:col-span-8 lg:border-l lg:border-divider lg:pl-12">
            <p>
              <strong className="text-brand-emerald">SMP Inshafuddin</strong> merupakan sekolah swasta di bawah naungan{' '}
              <strong className="text-brand-emerald">Yayasan Pembina Inshafuddin</strong>, berlokasi di Desa Lambaro Skep,
              Kecamatan Kuta Alam, Kota Banda Aceh. Sekolah ini didirikan pada tahun <strong>1974</strong> sebagai bagian
              dari kesadaran para ulama dan tokoh masyarakat Aceh untuk melahirkan lembaga pendidikan yang memadukan ilmu
              pengetahuan umum dan dasar-dasar ilmu agama Islam.
            </p>
            <p className="text-ink-muted">
              Berada di lingkungan <strong className="text-brand-emerald">Dayah Terpadu Inshafuddin</strong>, SMP
              Inshafuddin menerapkan model pendidikan integral di mana peserta didik tidak hanya belajar sesuai kurikulum
              nasional, tetapi juga mendapatkan pembinaan moral, pengajian kitab, hafalan Al-Qur’an, serta penguasaan
              bahasa asing.
            </p>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section aria-label="Visi dan misi sekolah" className="bg-surface-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="arch-top relative bg-brand-emerald px-8 pb-8 pt-14 text-ink-on-dark shadow-lift sm:px-10 sm:pb-10 sm:pt-16 lg:col-span-5">
            <div className="relative flex h-full flex-col">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-light">
                <ArchDivider className="h-3 w-10 text-brand-gold" />
                Visi Sekolah
              </p>
              <span aria-hidden="true" className="mt-6 font-display text-7xl leading-none text-brand-gold">
                &ldquo;
              </span>
              <h2 className="-mt-4 font-display text-2xl font-semibold leading-snug text-surface-white sm:text-3xl">
                Terwujudnya insan yang berkarakter, unggul dalam prestasi, dan bertaqwa kepada Allah SWT.
              </h2>
              <p className="mt-auto border-t border-surface-white/15 pt-6 text-sm leading-relaxed lg:mt-10">
                Visi ini menjadi rujukan utama bagi setiap kebijakan kurikulum, bimbingan kesiswaan, dan tata pergaulan di
                SMP Inshafuddin Banda Aceh.
              </p>
            </div>
          </div>

          <div className="card-surface p-8 sm:p-10 lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-ink">
              <ArchDivider className="h-3 w-10 text-brand-gold" />
              Misi Sekolah
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-brand-emerald sm:text-3xl">Delapan misi utama</h2>
            <ol className="mt-8 space-y-4">
              {missions.map((mission, idx) => (
                <li key={mission} className="flex items-start gap-4 text-sm leading-relaxed text-ink-primary sm:text-base">
                  <span className="w-8 shrink-0 font-display text-xl font-semibold leading-6 text-brand-gold-ink">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{mission}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tujuan */}
      <section aria-labelledby="tujuan-heading" className="bg-surface-white py-16 lg:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading id="tujuan-heading" eyebrow="Tujuan Institusi" title="Tujuan pendidikan SMP Inshafuddin" />
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {goals.map((goal) => (
              <li
                key={goal}
                className="flex items-start gap-4 rounded-card border border-divider bg-surface-ivory p-5 text-sm leading-relaxed text-ink-primary sm:text-base"
              >
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pimpinan */}
      <section aria-labelledby="pimpinan-heading" className="bg-surface-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="pimpinan-heading"
            eyebrow="Struktur Kepemimpinan"
            title="Pimpinan & tenaga kependidikan"
            description="Didukung oleh guru dan tenaga kependidikan yang berdedikasi membimbing dan mengayomi siswa."
            align="center"
          />

          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {teachers.map((teacher) => (
              <li key={teacher.name} className="flex flex-col items-center text-center">
                <div className="relative w-48 sm:w-full sm:max-w-[220px]">
                  <MihrabFrame outline className="aspect-[3/4] w-full">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 640px) 192px, 220px"
                      className="object-cover object-top"
                    />
                  </MihrabFrame>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-brand-emerald">{teacher.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{teacher.role}</p>
              </li>
            ))}
          </ul>

          <figure className="card-surface mx-auto mt-16 max-w-3xl p-6 sm:p-8">
            <h3 className="text-center font-display text-xl font-semibold text-brand-emerald">
              Bagan struktur organisasi sekolah
            </h3>
            <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-control border border-divider bg-surface-white">
              <Image
                src="https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-19-at-21.24.47-1.jpeg"
                alt="Bagan Struktur Organisasi SMP Inshafuddin Banda Aceh"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-ink-muted">
              Bagan resmi struktur organisasi SMP Inshafuddin Banda Aceh.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
