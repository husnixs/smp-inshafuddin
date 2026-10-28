import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import ArchDivider from '@/components/ui/ArchDivider';
import MihrabFrame from '@/components/ui/MihrabFrame';

const PRINCIPAL_PHOTO =
  'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-20.54.08-682x1024.jpeg';

export default function WelcomeSection() {
  return (
    <section aria-labelledby="welcome-heading" className="bg-surface-white py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-hero bg-brand-emerald p-7 shadow-lift sm:p-10 lg:p-14">

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Teks sambutan */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-light">
                <ArchDivider className="h-3 w-10 text-brand-gold" />
                Sambutan Kepala Sekolah
              </p>

              <h2
                id="welcome-heading"
                className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-surface-white sm:text-4xl lg:text-5xl"
              >
                Selamat datang di <span className="italic text-brand-gold-light">SMP Inshafuddin</span>
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-on-dark sm:text-base">
                <p className="font-display text-lg italic text-brand-gold-light">
                  Assalaamu’alaikum Warahmatullahi Wabarakatuh.
                </p>
                <p>
                  Segala puji syukur kita panjatkan kepada Allah SWT, atas limpahan rahmat dan karunia-Nya sehingga
                  website resmi SMP Inshafuddin Banda Aceh dapat hadir sebagai sarana informasi dan keterbukaan bagi
                  masyarakat.
                </p>
                <p>
                  Sebagai bagian integral dari Dayah Terpadu Inshafuddin, kami berkomitmen mendampingi peserta didik
                  agar tumbuh menjadi pribadi yang berilmu, terampil, dan berakhlakul karimah. Semoga website ini
                  memberikan gambaran utuh mengenai iklim belajar dan nilai yang kami rawat bersama.
                </p>
              </div>

              <div className="mt-8">
                <ButtonLink href="/tentang-kami/" variant="gold">
                  Selengkapnya
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
              </div>
            </div>

            {/* Foto kepala sekolah dalam bingkai lengkung */}
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
              <figure className="relative w-60 sm:w-72">
                <MihrabFrame outline outlineTone="dark" className="aspect-[3/4] w-full">
                  <Image
                    src={PRINCIPAL_PHOTO}
                    alt="Warnidah, S.Pd.I — Kepala SMP Inshafuddin Banda Aceh"
                    fill
                    sizes="(max-width: 640px) 240px, 288px"
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-emerald-deep/80 to-transparent"
                  />
                </MihrabFrame>

                <figcaption className="relative z-10 mx-auto -mt-8 w-[92%] rounded-control border border-brand-gold-light/60 bg-brand-gold-light px-4 py-3 text-center shadow-lift">
                  <span className="block font-display text-lg font-semibold leading-tight text-brand-emerald-deep">
                    Warnidah, S.Pd.I
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-brand-emerald">
                    Kepala SMP Inshafuddin Banda Aceh
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
