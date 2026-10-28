'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MihrabMark from '@/components/ui/MihrabMark';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Tampilan error (status 500), mis. saat WordPress REST API tidak dapat dijangkau. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[App] Gagal merender halaman:', error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-surface-ivory px-4 py-20 text-center lg:py-32">
      <div className="mx-auto max-w-lg">
        <MihrabMark className="mx-auto h-8 w-6 text-brand-gold" />
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-brand-emerald sm:text-4xl">
          Halaman belum dapat dimuat
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Terjadi gangguan saat mengambil konten dari server sekolah. Silakan coba lagi beberapa saat lagi.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center rounded-control bg-brand-emerald px-6 text-sm font-semibold text-surface-white hover:bg-brand-emerald-hover sm:w-auto"
          >
            Coba lagi
          </button>
          <Link
            href="/"
            className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center rounded-control border border-brand-emerald/25 bg-surface-white px-6 text-sm font-semibold text-brand-emerald hover:bg-surface-sage sm:w-auto"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
