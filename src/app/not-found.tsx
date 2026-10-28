import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 lg:py-32 flex items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-surface-sage flex items-center justify-center text-brand-emerald text-2xl font-bold border border-brand-emerald/20">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-emerald tracking-tight">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-sm text-ink-muted leading-relaxed">
          Mohon maaf, halaman atau artikel yang Anda cari tidak tersedia, telah dipindahkan, atau alamat URL yang dimasukkan salah.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-emerald text-surface-white font-semibold text-sm hover:bg-brand-emerald-hover focus:outline-none focus:ring-2 focus:ring-brand-emerald min-h-[44px]"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/berita/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-surface-white text-brand-emerald border border-divider font-semibold text-sm hover:bg-surface-sage min-h-[44px]"
          >
            Lihat Berita Sekolah
          </Link>
        </div>
      </div>
    </div>
  );
}
