import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/wordpress/api';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import NewsCard from '@/components/news/NewsCard';

export const revalidate = 300; // 5 menit

export const metadata: Metadata = {
  title: 'Arsip Berita & Informasi',
  description:
    'Warta kegiatan, informasi akademik, dan agenda penting terkini dari lingkungan SMP Inshafuddin Banda Aceh.',
  alternates: {
    canonical: `${siteConfig.url}/berita/`,
  },
};

interface BeritaPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1', 10));
  const perPage = 9;

  const { posts, total, totalPages } = await getPosts({
    page: currentPage,
    perPage,
  });

  const pagerBase =
    'focus-ring inline-flex min-h-[44px] items-center gap-1.5 rounded-control border px-4 text-sm font-semibold transition-colors';

  return (
    <>
      <PageHero
        eyebrow="Kabar Sekolah"
        title="Arsip Berita & Informasi"
        description="Dokumentasi warta dan kegiatan resmi di lingkungan SMP Inshafuddin Banda Aceh."
        breadcrumb={[{ label: 'Berita' }]}
      >
        {total > 0 && (
          <span className="inline-flex items-center rounded-full border border-brand-gold/40 bg-surface-white/10 px-3.5 py-1.5 text-xs font-semibold text-brand-gold-light">
            {total} artikel terbit
          </span>
        )}
      </PageHero>

      <section aria-label="Daftar berita" className="bg-surface-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-content space-y-12 px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="card-surface mx-auto max-w-xl p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-brand-emerald">Tidak ada berita</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Tidak ditemukan artikel pada halaman ini. Silakan periksa halaman lainnya.
              </p>
              <Link
                href="/berita/"
                className={`${pagerBase} mt-6 border-brand-emerald bg-brand-emerald text-surface-white hover:bg-brand-emerald-hover`}
              >
                Kembali ke halaman pertama
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((post) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  headingLevel="h2"
                  imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Navigasi halaman berita"
              className="flex flex-wrap items-center justify-center gap-3 border-t border-divider pt-10"
            >
              {currentPage > 1 ? (
                <Link
                  href={`/berita/?page=${currentPage - 1}`}
                  rel="prev"
                  className={`${pagerBase} border-divider bg-surface-white text-brand-emerald hover:border-brand-emerald hover:bg-surface-sage`}
                >
                  &larr; Sebelumnya
                </Link>
              ) : (
                <span aria-disabled="true" className={`${pagerBase} cursor-not-allowed border-divider/60 text-ink-muted/60`}>
                  &larr; Sebelumnya
                </span>
              )}

              <span className="px-3 text-sm text-ink-muted">
                Halaman <span className="font-display text-lg font-semibold text-brand-emerald">{currentPage}</span> dari{' '}
                {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/berita/?page=${currentPage + 1}`}
                  rel="next"
                  className={`${pagerBase} border-divider bg-surface-white text-brand-emerald hover:border-brand-emerald hover:bg-surface-sage`}
                >
                  Berikutnya &rarr;
                </Link>
              ) : (
                <span aria-disabled="true" className={`${pagerBase} cursor-not-allowed border-divider/60 text-ink-muted/60`}>
                  Berikutnya &rarr;
                </span>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
