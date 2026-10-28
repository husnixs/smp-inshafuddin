import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';

interface Program {
  badge: string;
  title: string;
  description: string;
  points: string[];
  linkLabel: string;
  tone: 'light' | 'dark';
}

const PROGRAMS: Program[] = [
  {
    badge: 'Program Nasional',
    title: 'Pendidikan Sekolah',
    description:
      'Mengikuti kurikulum nasional Kementerian Pendidikan dengan tenaga pendidik profesional. Siswa didorong berkembang dalam mata pelajaran inti, sains, matematika, serta literasi teknologi.',
    points: [
      'Kurikulum tingkat SMP sesuai standar nasional pendidikan (SNP).',
      'Praktikum sains IPA, laboratorium komputer, dan laboratorium bahasa.',
      'Pembinaan olimpiade sains, kompetisi akademik, dan teknologi informasi.',
    ],
    linkLabel: 'Jelajahi rincian akademik',
    tone: 'light',
  },
  {
    badge: 'Program Dayah Terpadu',
    title: 'Pendidikan Dayah Terpadu',
    description:
      'Mengikuti kurikulum Dayah Terpadu Inshafuddin dengan bimbingan langsung para ustadz dan ustazah berpengalaman dalam penguasaan keilmuan Islam klasik dan kontemporer.',
    points: [
      'Kajian Kitab Kuning dan pembinaan akhlakul karimah secara terstruktur.',
      'Program hafalan (Tahfiz) Al-Qur’an dengan setor hafalan berkala.',
      'Penguasaan dua bahasa asing aktif: Bahasa Arab dan Bahasa Inggris.',
    ],
    linkLabel: 'Jelajahi program dayah',
    tone: 'dark',
  },
];

function ProgramPanel({ program }: { program: Program }) {
  const isDark = program.tone === 'dark';

  return (
    <article
      className={`relative isolate flex flex-col arch-top px-8 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-16 ${
        isDark ? 'bg-brand-emerald text-ink-on-dark shadow-lift' : 'card-surface'
      }`}
    >
      <div className="relative flex flex-1 flex-col">
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            isDark ? 'bg-surface-white/10 text-brand-gold-light' : 'bg-surface-sage text-brand-emerald'
          }`}
        >
          {program.badge}
        </span>
        <h3
          className={`mt-5 font-display text-2xl font-semibold sm:text-3xl ${
            isDark ? 'text-surface-white' : 'text-brand-emerald'
          }`}
        >
          {program.title}
        </h3>
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${isDark ? '' : 'text-ink-muted'}`}>
          {program.description}
        </p>
        <ul className={`mb-8 mt-6 space-y-3.5 text-sm sm:text-base ${isDark ? 'text-surface-white' : 'text-ink-primary'}`}>
          {program.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <div className={`mt-auto border-t pt-2 ${isDark ? 'border-surface-white/15' : 'border-divider'}`}>
          <ArrowLink href="/akademik/" tone={program.tone} size="sm">
            {program.linkLabel}
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}

export default function ProgramsSection() {
  return (
    <section aria-labelledby="programs-heading" className="bg-surface-sand py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="programs-heading"
          eyebrow="Jalur Pembelajaran"
          title="Dua program pembelajaran yang terintegrasi"
          action={<ArrowLink href="/akademik/">Lihat kurikulum lengkap</ArrowLink>}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {PROGRAMS.map((program) => (
            <ProgramPanel key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
