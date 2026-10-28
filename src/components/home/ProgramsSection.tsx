import Link from 'next/link';

export default function ProgramsSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface-ivory border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Jalur Pembelajaran
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Dua Program Pembelajaran Terintegrasi
            </p>
          </div>
          <Link
            href="/akademik/"
            className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald"
          >
            Lihat Kurikulum Lengkap
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Panel 1: Pendidikan Sekolah */}
          <div className="bg-surface-white p-8 rounded-card border border-divider shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-surface-sage text-brand-emerald text-xs font-semibold mb-4">
                Program Nasional
              </div>
              <h3 className="text-xl font-bold text-brand-emerald mb-4">
                Pendidikan Sekolah
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                Mengikuti kurikulum nasional Kementerian Pendidikan dengan tenaga pendidik profesional. Siswa didorong berkembang dalam mata pelajaran inti, sains, matematika, serta literasi teknologi.
              </p>
              <ul className="space-y-3 text-sm text-ink-primary">
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Kurikulum tingkat SMP sesuai standar nasional pendidikan (SNP).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Praktikum sains IPA, laboratorium komputer, dan laboratorium bahasa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Pembinaan olimpiade sains, kompetisi akademik, dan teknologi informasi.</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-divider">
              <Link
                href="/akademik/"
                className="text-xs font-semibold text-brand-emerald hover:underline"
              >
                Jelajahi Rincian Akademik Sekolah &rarr;
              </Link>
            </div>
          </div>

          {/* Panel 2: Pendidikan Dayah */}
          <div className="bg-surface-white p-8 rounded-card border border-divider shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-surface-sage text-brand-emerald text-xs font-semibold mb-4">
                Program Dayah Terpadu
              </div>
              <h3 className="text-xl font-bold text-brand-emerald mb-4">
                Pendidikan Dayah Terpadu
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                Mengikuti kurikulum Dayah Terpadu Inshafuddin dengan bimbingan langsung para ustadz dan ustazah berpengalaman dalam penguasaan keilmuan Islam klasik dan kontemporer.
              </p>
              <ul className="space-y-3 text-sm text-ink-primary">
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Kajian Kitab Kuning dan pembinaan akhlakul karimah secara terstruktur.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Program hafalan (Tahfiz) Al-Qur\'an dengan setor hafalan berkala.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold font-bold">✓</span>
                  <span>Penguasaan dua bahasa asing aktif: Bahasa Arab dan Bahasa Inggris.</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-divider">
              <Link
                href="/akademik/"
                className="text-xs font-semibold text-brand-emerald hover:underline"
              >
                Jelajahi Program Dayah &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
