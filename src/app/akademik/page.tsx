import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PAGE_SEO } from '@/lib/seo/pages';
import { siteGraph, webPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ArchDivider from '@/components/ui/ArchDivider';

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.akademik);

export default function AkademikPage() {
  const academicFeatures = [
    {
      title: 'Pendidikan Sekolah',
      desc: 'Dengan menggunakan kurikulum nasional dan tenaga guru profesional, kami mendidik siswa-siswi untuk berprestasi di bidang sains, matematika, sosial, dan humaniora.',
      badge: 'Kurikulum Nasional',
    },
    {
      title: 'Pendidikan Dayah',
      desc: 'Dibimbing langsung oleh ustadz dan ustazah mahir dalam penguasaan Kitab Kuning, pembiasaan ibadah, tadarus dan tajwid Al-Qur’an, bahasa Arab, serta pembentukan akhlakul karimah.',
      badge: 'Kurikulum Dayah',
    },
    {
      title: 'Penguasaan Bahasa Asing',
      desc: 'Mewajibkan siswa aktif menguasai bahasa Arab dan bahasa Inggris dalam aktivitas harian, diperkuat dengan kegiatan debat, pidato, dan uji kecakapan bahasa.',
      badge: 'Bilingual',
    },
    {
      title: 'Hafalan Al-Qur’an (Tahfiz)',
      desc: 'Program bimbingan hafalan ayat-ayat Al-Qur’an berjenjang dengan target hafalan terukur dan setoran rutin terjadwal kepada ustadz/ustazah pembimbing.',
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
    <>
      <JsonLd
        data={siteGraph(
          webPageSchema({
            path: PAGE_SEO.akademik.path,
            name: PAGE_SEO.akademik.title,
            description: PAGE_SEO.akademik.description,
          }),
        )}
      />
      <PageHero
        eyebrow="Akademik"
        title="Wawasan Kurikulum & Program Akademik"
        description="Komitmen kami untuk memberikan pendidikan yang seimbang, mengasah ketajaman intelektual sekaligus memperkokoh pondasi keagamaan santri/siswa."
        breadcrumb={[{ label: 'Akademik' }]}
      />

      {/* Landasan kurikulum */}
      <section aria-label="Landasan kurikulum" className="bg-surface-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8 lg:px-8">
          <article className="card-surface p-8 sm:p-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-ink">
              <ArchDivider className="h-3 w-10 text-brand-gold" />
              Standar Nasional
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-brand-emerald sm:text-3xl">Kurikulum Nasional</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              Kurikulum yang berlaku pada SMP Inshafuddin mengikuti kurikulum tingkat SMP sesuai dengan ketentuan
              Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. Seluruh buku teks pembelajaran disediakan di
              perpustakaan sekolah untuk memastikan setiap siswa memiliki akses materi yang memadai.
            </p>
          </article>

          <article className="arch-top relative bg-brand-emerald px-8 pb-8 pt-14 text-ink-on-dark shadow-lift sm:px-10 sm:pb-10 sm:pt-16">
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-light">
                <ArchDivider className="h-3 w-10 text-brand-gold" />
                Pesantren Terpadu
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-surface-white sm:text-3xl">
                Kurikulum Dayah Terpadu
              </h2>
              <p className="mt-4 text-sm leading-relaxed sm:text-base">
                Untuk pendidikan agama Islam dan ketrampilan keagamaan, sekolah mengintegrasikan kurikulum khas Dayah
                Terpadu Inshafuddin. Siswa mendapatkan pengajaran kitab mu’tabarah, fardhu ‘ain, pembiasaan shalat
                berjamaah, serta adab Islami di bawah bimbingan para dewan guru dan ustadz.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Program unggulan */}
      <section aria-labelledby="program-heading" className="bg-surface-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading id="program-heading" eyebrow="Program Unggulan" title="Tujuh dimensi pembelajaran siswa" />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academicFeatures.map((feature, idx) => (
              <li key={feature.title} className="group card-surface card-interactive flex flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-block rounded-full bg-surface-sage px-3 py-1 text-xs font-semibold text-brand-emerald">
                    {feature.badge}
                  </span>
                  <span aria-hidden="true" className="font-display text-3xl font-semibold leading-none text-brand-gold/60">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-emerald">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{feature.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
