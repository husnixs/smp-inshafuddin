import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  const displayImage =
    heroImageUrl ||
    'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-22.16.57-scaled.jpeg';

  return (
    <section className="bg-surface-white border-b border-divider py-12 lg:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center">
          {/* Sisi Kiri: 30% Kolom Teks */}
          <div className="lg:col-span-3 space-y-5 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sage border border-brand-emerald/20 text-brand-emerald text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              SMP Inshafuddin • Banda Aceh
            </div>

            {/* Main Heading H1 */}
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-brand-emerald tracking-tight leading-snug">
              Belajar dengan Ilmu, <br />
              <span className="text-ink-primary">Tumbuh dengan Akhlak.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-ink-muted leading-relaxed">
              Lingkungan pendidikan terpadu di bawah naungan Yayasan Pembina Inshafuddin yang memadukan keunggulan kurikulum nasional dan nilai-nilai dayah dalam membentuk generasi cerdas, berkarakter, dan bertakwa.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 pt-2">
              <Link
                href="/tentang-kami/"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-emerald text-surface-white font-semibold text-xs sm:text-sm hover:bg-brand-emerald-hover focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all shadow-sm min-h-[44px]"
              >
                Kenali Sekolah
                <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/akademik/"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-surface-white text-brand-emerald border border-divider font-semibold text-xs sm:text-sm hover:bg-surface-sage/60 focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-all min-h-[44px]"
              >
                Program Akademik
              </Link>
            </div>

            {/* Milestone Note */}
            <div className="pt-2 border-t border-divider/60">
              <p className="text-[11px] text-ink-muted font-medium">
                Didirikan Sejak 1974 • 50+ Tahun Membina Insan Berilmu
              </p>
            </div>
          </div>

          {/* Sisi Kanan: 70% Kolom Gambar (Tanpa Gradient) */}
          <div className="lg:col-span-7 w-full">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-divider bg-surface-sage">
              <Image
                src={displayImage}
                alt="Lingkungan dan Suasana SMP Inshafuddin Banda Aceh"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 840px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
