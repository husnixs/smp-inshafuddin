import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/wordpress/api';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PAGE_SEO } from '@/lib/seo/pages';
import { siteGraph, webPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageHero from '@/components/ui/PageHero';
import NewsCard from '@/components/news/NewsCard';

export const revalidate = 300; // 5 menit

const PER_PAGE = 9;

interface BeritaPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

/** Nomor halaman valid (bilangan bulat ≥ 1) atau null bila parameter tidak valid. */
function parsePageParam(raw: string | string[] | undefined): number | null {
  if (raw === undefined) return 1;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!/^\d+$/.test(value)) return null;
  const page = Number(value);
  return page >= 1 ? page : null;
}

function pagePath(page: number): string {
  return page > 1 ? `${PAGE_SEO.berita.path}?page=${page}` : PAGE_SEO.berita.path;
}

export async function generateMetadata({ searchParams }: BeritaPageProps): Promise<Metadata> {
  const page = parsePageParam((await searchParams).page) ?? 1;
  const { title, description } = PAGE_SEO.berita;

  return buildPageMetadata({
    title: page > 1 ? `${title} — Halaman ${page}` : title,
    description: page > 1 ? `${description} Halaman ${page}.` : description,
    path: pagePath(page),
  });
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const currentPage = parsePageParam((await searchParams).page);
  if (currentPage === null) notFound();

  const { posts, total, totalPages, failed } = await getPosts({
    page: currentPage,
    perPage: PER_PAGE,
  });

  // Halaman di luar rentang adalah 404 sungguhan, bukan halaman kosong ber-status 200 (soft 404).
  if (!failed && currentPage > 1 && posts.length === 0) notFound();

  const pagerBase =
    'focus-ring inline-flex min-h-[44px] items-center gap-1.5 rounded-control border px-4 text-sm font-semibold transition-colors';

  return (
    <>
      <JsonLd
        data={siteGraph(
          webPageSchema({
            type: 'CollectionPage',
            path: pagePath(currentPage),
            name: PAGE_SEO.berita.title,
            description: PAGE_SEO.berita.description,
          }),
        )}
      />
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
              <h2 className="font-display text-2xl font-semibold text-brand-emerald">
                {failed ? 'Berita belum dapat dimuat' : 'Belum ada berita'}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                {failed
                  ? 'Terjadi gangguan saat mengambil berita dari server. Silakan muat ulang halaman beberapa saat lagi.'
                  : 'Belum ada artikel yang dipublikasikan.'}
              </p>
              <Link
                href="/"
                className={`${pagerBase} mt-6 border-brand-emerald bg-brand-emerald text-surface-white hover:bg-brand-emerald-hover`}
              >
                Kembali ke Beranda
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
