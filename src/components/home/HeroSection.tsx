import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  const bgImage =
    heroImageUrl ||
    'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-22.16.57-scaled.jpeg';

  return (
    <section className="relative overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center justify-center border-b-2 border-brand-gold/40">
      {/* Background Image (Optimized for LCP via priority) */}
      <Image
        src={bgImage}
        alt="Lingkungan dan Suasana Belajar SMP Inshafuddin Banda Aceh"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Emerald Overlay for Contrast & Islamic Elegant Tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-emerald/90 via-brand-emerald/85 to-brand-emerald/95 backdrop-blur-[0.5px]" />

      {/* Hero Content Container (Centered) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center space-y-6">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-wider uppercase mx-auto">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          SMP Inshafuddin • Banda Aceh
        </div>

        {/* Main Heading H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-surface-white tracking-tight leading-[1.18] drop-shadow-sm">
          Belajar dengan Ilmu, <br />
          <span className="text-brand-gold">Tumbuh dengan Akhlak.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-surface-sage/95 leading-relaxed max-w-2xl mx-auto font-normal">
          Lingkungan pendidikan terpadu di bawah naungan Yayasan Pembina Inshafuddin yang memadukan keunggulan kurikulum nasional dan nilai-nilai dayah dalam membentuk generasi cerdas, berkarakter, dan bertakwa.
        </p>

        {/* Call to Actions (Centered) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/tentang-kami/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-surface-white text-brand-emerald font-bold text-sm hover:bg-surface-sage focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-emerald transition-all shadow-md min-h-[48px]"
          >
            Kenali Sekolah
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/akademik/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-transparent text-surface-white border-2 border-surface-white/70 font-semibold text-sm hover:bg-surface-white/10 hover:border-surface-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-emerald transition-all min-h-[48px]"
          >
            Program Akademik
          </Link>
        </div>

        {/* Subtle Milestone Info */}
        <div className="pt-6">
          <p className="text-xs text-surface-sage/80 font-medium tracking-wide">
            Didirikan Sejak 1974 • 50+ Tahun Membina Insan Berilmu & Berakhlak
          </p>
        </div>
      </div>
    </section>
  );
}
