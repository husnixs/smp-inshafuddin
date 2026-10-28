import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wordpress/api';
import { extractFirstImage, stripHtml, formatIndonesianDate } from '@/lib/wordpress/extract';
import { siteConfig } from '@/config/site';

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

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="border-b border-divider pb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-emerald">
                  Beranda
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-emerald font-semibold">Berita</li>
            </ol>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
                Arsip Berita & Informasi
              </h1>
              <p className="text-base text-ink-muted mt-2">
                Dokumentasi warta dan kegiatan resmi di lingkungan SMP Inshafuddin Banda Aceh.
              </p>
            </div>
            {total > 0 && (
              <span className="text-xs font-medium text-ink-muted bg-surface-sage px-3 py-1.5 rounded-full border border-divider">
                Total {total} Artikel Terbit
              </span>
            )}
          </div>
        </div>

        {/* Daftar Berita Grid */}
        {posts.length === 0 ? (
          <div className="p-12 text-center bg-surface-white rounded-card border border-divider">
            <h2 className="text-lg font-bold text-ink-primary mb-2">
              Tidak Ada Berita
            </h2>
            <p className="text-ink-muted text-sm max-w-md mx-auto">
              Tidak ditemukan artikel pada halaman ini. Silakan periksa halaman lainnya.
            </p>
            <div className="mt-6">
              <Link
                href="/berita/"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-emerald text-surface-white text-xs font-semibold"
              >
                Kembali ke Halaman Pertama
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => {
              const image = extractFirstImage(post.content.rendered);
              const cleanExcerpt = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 115);
              const cleanTitle = stripHtml(post.title.rendered);
              const postDate = formatIndonesianDate(post.date);

              return (
                <article
                  key={post.id}
                  className="bg-surface-white rounded-card border border-divider overflow-hidden hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    {image ? (
                      <div className="relative aspect-[16/10] w-full bg-surface-sage overflow-hidden">
                        <Image
                          src={image}
                          alt={cleanTitle}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] w-full bg-surface-sage/50 flex items-center justify-center p-6 text-center border-b border-divider">
                        <span className="text-xs font-semibold text-brand-emerald">
                          SMP Inshafuddin
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-brand-gold font-medium mb-2.5">
                        <time dateTime={post.date}>{postDate}</time>
                        <span>•</span>
                        <span>Warta Sekolah</span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-ink-primary leading-snug line-clamp-2 group-hover:text-brand-emerald transition-colors mb-2.5">
                        <Link href={`/${post.slug}/`} className="focus:outline-none focus:underline">
                          {cleanTitle}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {cleanExcerpt}
                        {cleanExcerpt.length >= 115 ? '...' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-divider/40 mt-4">
                    <Link
                      href={`/${post.slug}/`}
                      className="inline-flex items-center text-xs font-semibold text-brand-emerald group-hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald py-1"
                    >
                      Baca Selengkapnya
                      <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination Nav */}
        {totalPages > 1 && (
          <nav aria-label="Navigasi Halaman Berita" className="flex items-center justify-center gap-3 pt-8 border-t border-divider">
            {currentPage > 1 ? (
              <Link
                href={`/berita/?page=${currentPage - 1}`}
                className="px-4 py-2 rounded-lg bg-surface-white border border-divider text-sm font-medium text-ink-primary hover:bg-surface-sage min-h-[44px] flex items-center"
              >
                &larr; Sebelumnya
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg bg-surface-ivory border border-divider/60 text-sm font-medium text-ink-muted/50 cursor-not-allowed min-h-[44px] flex items-center">
                &larr; Sebelumnya
              </span>
            )}

            <span className="text-sm font-semibold text-brand-emerald px-3">
              Halaman {currentPage} dari {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/berita/?page=${currentPage + 1}`}
                className="px-4 py-2 rounded-lg bg-surface-white border border-divider text-sm font-medium text-ink-primary hover:bg-surface-sage min-h-[44px] flex items-center"
              >
                Berikutnya &rarr;
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg bg-surface-ivory border border-divider/60 text-sm font-medium text-ink-muted/50 cursor-not-allowed min-h-[44px] flex items-center">
                Berikutnya &rarr;
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
