import Link from 'next/link';
import Image from 'next/image';
import type { WPPost } from '@/types/wordpress';
import { extractFirstImage, stripHtml, formatIndonesianDate } from '@/lib/wordpress/extract';

interface LatestNewsSectionProps {
  posts: WPPost[];
}

export default function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-surface-ivory border-b border-divider">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Kabar Sekolah
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
              Berita & Informasi Terbaru
            </p>
          </div>
          <Link
            href="/berita/"
            className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald"
          >
            Buka Arsip Berita
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="p-8 text-center bg-surface-white rounded-card border border-divider">
            <p className="text-ink-muted text-sm">
              Belum ada berita yang dapat ditampilkan saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {posts.slice(0, 3).map((post) => {
              const image = extractFirstImage(post.content.rendered);
              const cleanExcerpt = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 110);
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
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] w-full bg-surface-sage/60 flex items-center justify-center p-6 text-center border-b border-divider">
                        <span className="text-xs font-semibold text-brand-emerald">
                          SMP Inshafuddin Banda Aceh
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-brand-gold font-medium mb-2.5">
                        <time dateTime={post.date}>{postDate}</time>
                        <span>•</span>
                        <span>Berita</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-ink-primary leading-snug line-clamp-2 group-hover:text-brand-emerald transition-colors mb-2.5">
                        <Link href={`/${post.slug}/`} className="focus:outline-none focus:underline">
                          {cleanTitle}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {cleanExcerpt}
                        {cleanExcerpt.length >= 110 ? '...' : ''}
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
      </div>
    </section>
  );
}
