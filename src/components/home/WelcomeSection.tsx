import Link from 'next/link';
import Image from 'next/image';

export default function WelcomeSection() {
  const principalPhoto = 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-20.54.08-682x1024.jpeg';

  return (
    <section className="py-16 lg:py-20 bg-surface-white border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-sage/40 rounded-card p-8 sm:p-12 border border-divider">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-4 border-surface-white bg-surface-white">
                <Image
                  src={principalPhoto}
                  alt="Warnidah, S.Pd.I — Kepala SMP Inshafuddin Banda Aceh"
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-base font-bold text-brand-emerald">
                  Warnidah, S.Pd.I
                </h3>
                <p className="text-xs text-ink-muted">
                  Kepala SMP Inshafuddin Banda Aceh
                </p>
              </div>
            </div>

            {/* Pesan Sambutan */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-surface-white text-brand-emerald text-xs font-semibold border border-brand-emerald/10">
                Sambutan Kepala Sekolah
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-emerald leading-tight">
                Selamat Datang di Website Resmi SMP Inshafuddin
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                <p>
                  <span className="font-semibold text-brand-emerald italic">Assalaamu’alaikum Warahmatullahi Wabarakatuh.</span>
                </p>
                <p>
                  Segala puji syukur kita panjatkan kepada Allah SWT, atas limpahan rahmat dan karunia-Nya sehingga website resmi SMP Inshafuddin Banda Aceh dapat hadir sebagai sarana informasi dan keterbukaan bagi masyarakat.
                </p>
                <p>
                  Sebagai bagian integral dari Dayah Terpadu Inshafuddin, kami berkomitmen mendampingi peserta didik agar tumbuh menjadi pribadi yang berilmu, terampil, dan berakhlakul karimah. Semoga website ini memberikan gambaran utuh mengenai iklim belajar dan nilai yang kami rawat bersama.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/tentang-kami/"
                  className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald py-1"
                >
                  Baca Selengkapnya Profil Sekolah
                  <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
