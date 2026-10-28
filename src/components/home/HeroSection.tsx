import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import GirihPattern from '@/components/ui/GirihPattern';
import StarMark from '@/components/ui/StarMark';

interface HeroSectionProps {
  heroImageUrl?: string;
}

const DEFAULT_HERO_IMAGE =
  'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-22.16.57-scaled.jpeg';

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  const displayImage = heroImageUrl || DEFAULT_HERO_IMAGE;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-surface-ivory">
      <GirihPattern className="text-brand-emerald/[0.05]" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-0 hidden w-[42%] bg-brand-emerald-deep lg:block"
      />
      <GirihPattern className="hidden text-brand-gold/[0.12] lg:block lg:[clip-path:inset(0_0_0_58%)]" />

      <div className="relative mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {/* Nama sekolah menjadi bagian H1 agar entitas utama halaman jelas bagi mesin pencari & AI. */}
            <h1 id="hero-heading">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-surface-white px-3.5 py-1.5 font-sans text-xs font-semibold text-brand-emerald shadow-card">
                <StarMark className="h-3 w-3 text-brand-gold" />
                SMP Inshafuddin Banda Aceh
                <span className="sr-only">:</span>
              </span>
              <span className="block font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-brand-emerald sm:text-6xl lg:text-[3.25rem] xl:text-[4rem]">
                Belajar dengan ilmu, <span className="italic text-brand-gold-ink">tumbuh</span> dengan akhlak.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              Lingkungan pendidikan terpadu di bawah naungan Yayasan Pembina Inshafuddin yang memadukan kurikulum
              nasional dan nilai-nilai dayah untuk membentuk generasi cerdas, berkarakter, dan bertakwa.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/tentang-kami/">
                Kenali Sekolah
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </ButtonLink>
              <ButtonLink href="/akademik/" variant="secondary">
                Program Akademik
              </ButtonLink>
            </div>

            <dl className="mt-10 flex gap-8 border-t border-divider pt-6">
              <div>
                <dt className="text-xs font-medium text-ink-muted">Berdiri sejak</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-brand-emerald">1974</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-ink-muted">Model pendidikan</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-brand-emerald">Sekolah & Dayah</dd>
              </div>
            </dl>
          </div>

          <div className="relative lg:col-span-7 lg:pl-6">
            <div
              aria-hidden="true"
              className="absolute -inset-3 translate-x-3 translate-y-3 rounded-hero border border-brand-gold/60 sm:-inset-4 sm:translate-x-4 sm:translate-y-4"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-hero bg-surface-sage shadow-lift sm:aspect-[16/11]">
              <Image
                src={displayImage}
                alt="Lingkungan dan suasana SMP Inshafuddin Banda Aceh"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
