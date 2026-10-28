import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';
import GirihPattern from '@/components/ui/GirihPattern';
import StarMark from '@/components/ui/StarMark';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-ivory px-4 py-20 text-center lg:py-32">
      <GirihPattern className="text-brand-emerald/[0.05]" />
      <div className="relative mx-auto max-w-lg">
        <p aria-hidden="true" className="font-display text-8xl font-semibold leading-none text-brand-gold/50 sm:text-9xl">
          404
        </p>
        <StarMark className="mx-auto mt-6 h-5 w-5 text-brand-gold" />

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-brand-emerald sm:text-4xl">
          Halaman tidak ditemukan
        </h1>

        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Mohon maaf, halaman atau artikel yang Anda cari tidak tersedia, telah dipindahkan, atau alamat URL yang
          dimasukkan salah.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" className="w-full sm:w-auto">
            Kembali ke Beranda
          </ButtonLink>
          <ButtonLink href="/berita/" variant="secondary" className="w-full sm:w-auto">
            Lihat Berita Sekolah
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
