import type { ReactNode } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';

interface Pillar {
  title: string;
  description: string;
  icon: ReactNode;
}

const ICON_CLASS = 'h-6 w-6';

const PILLARS: Pillar[] = [
  {
    title: 'Karakter & Akhlak',
    description:
      'Menanamkan nilai-nilai kesantunan, integritas, dan disiplin berlandaskan ajaran Islam sebagai pondasi utama kepribadian setiap peserta didik.',
    icon: (
      <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
      </svg>
    ),
  },
  {
    title: 'Pendidikan Akademik',
    description:
      'Menerapkan kurikulum nasional dengan pembelajaran interaktif dan didukung guru profesional untuk menghasilkan pemikir yang kritis dan berdaya saing.',
    icon: (
      <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-9.5v5.25c0 1.24 2.69 2.25 6 2.25s6-1.01 6-2.25V10.5" />
      </svg>
    ),
  },
  {
    title: 'Pendidikan Dayah',
    description:
      'Membekali siswa dengan kajian kitab kuning, hafalan Al-Qur’an, praktik ibadah harian, serta penguasaan bahasa Arab dan Inggris.',
    icon: (
      <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.25C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5s3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18s-3.33.48-4.5 1.25m0-13v13" />
      </svg>
    ),
  },
];

export default function OverviewSection() {
  return (
    <section aria-labelledby="overview-heading" className="bg-surface-white py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="overview-heading"
          eyebrow="Sekilas Sekolah"
          title="Tiga pilar utama pendidikan kami"
          description="Menghadirkan keseimbangan antara kecerdasan intelektual, kemandirian spiritual, dan keterampilan praktis."
          action={<ArrowLink href="/tentang-kami/">Pelajari profil sekolah</ArrowLink>}
        />

        <ol className="grid grid-cols-1 border-y border-divider md:grid-cols-3 md:divide-x md:divide-divider">
          {PILLARS.map((pillar, index) => (
            <li
              key={pillar.title}
              className="group relative border-b border-divider py-8 last:border-b-0 md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-0.5 w-12 bg-brand-gold transition-all duration-500 ease-out-expo group-hover:w-24 md:left-8 md:group-first:left-0"
              />
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-control bg-surface-sage text-brand-emerald transition-colors duration-300 group-hover:bg-brand-emerald group-hover:text-brand-gold-light">
                  {pillar.icon}
                </span>
                <span aria-hidden="true" className="font-display text-4xl font-semibold text-brand-gold/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-brand-emerald">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{pillar.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
