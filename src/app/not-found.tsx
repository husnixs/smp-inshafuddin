import type { Metadata } from 'next';
import ButtonLink from '@/components/ui/ButtonLink';
import MihrabMark from '@/components/ui/MihrabMark';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-surface-ivory px-4 py-20 text-center lg:py-32">
      <div className="mx-auto max-w-lg">
        <p aria-hidden="true" className="font-display text-8xl font-semibold leading-none text-brand-gold/50 sm:text-9xl">
          404
        </p>
        <MihrabMark className="mx-auto mt-6 h-8 w-6 text-brand-gold" />

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
