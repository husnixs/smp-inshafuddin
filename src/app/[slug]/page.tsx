import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress/api';
import { extractFirstImage, stripHtml, formatIndonesianDate } from '@/lib/wordpress/extract';
import { siteConfig } from '@/config/site';

export const revalidate = 900; // 15 menit

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  // Pre-render 5 artikel terbaru saat build agar tidak memicu rate-limit server LiteSpeed
  return slugs.slice(0, 5).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'publish') {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const cleanTitle = stripHtml(post.title.rendered);
  const cleanExcerpt = stripHtml(post.excerpt.rendered || post.content.rendered).slice(0, 160);
  const canonicalUrl = `${siteConfig.url}/${post.slug}/`;
  const postImage = extractFirstImage(post.content.rendered);

  // Jika Yoast SEO meta tersedia
  if (post.yoast_head_json) {
    const yoast = post.yoast_head_json;
    return {
      title: yoast.title || cleanTitle,
      description: yoast.description || cleanExcerpt,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        type: 'article',
        title: yoast.og_title || cleanTitle,
        description: yoast.og_description || cleanExcerpt,
        url: canonicalUrl,
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: yoast.og_image
          ? yoast.og_image.map((img) => ({ url: img.url }))
          : postImage
          ? [{ url: postImage }]
          : undefined,
      },
    };
  }

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: cleanTitle,
      description: cleanExcerpt,
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: postImage ? [{ url: postImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'publish') {
    notFound();
  }

  const cleanTitle = stripHtml(post.title.rendered);
  const postDate = formatIndonesianDate(post.date);
  const authorName = post._embedded?.author?.[0]?.name || 'Admin SMP Inshafuddin';
  const mainImage = extractFirstImage(post.content.rendered);

  return (
    <div className="py-12 lg:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand-emerald">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/berita/" className="hover:text-brand-emerald">
                Berita
              </Link>
            </li>
            <li>/</li>
            <li className="text-brand-emerald font-semibold truncate max-w-[200px] sm:max-w-none">
              {cleanTitle}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 border-b border-divider pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sage text-brand-emerald text-xs font-semibold">
            <span>Warta Sekolah</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-emerald tracking-tight leading-tight">
            {cleanTitle}
          </h1>

          <div className="flex items-center gap-4 text-xs text-ink-muted pt-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>{postDate}</time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{authorName}</span>
            </div>
          </div>
        </header>

        {/* Main Hero Image if found in article content */}
        {mainImage && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm bg-surface-sage border border-divider">
            <Image
              src={mainImage}
              alt={cleanTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div
          className="content-prose max-w-none text-ink-primary text-base sm:text-lg leading-relaxed pt-2"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Article Footer & Navigation Back */}
        <footer className="pt-8 mt-12 border-t border-divider flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/berita/"
            className="inline-flex items-center text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover focus:outline-none focus:ring-1 focus:ring-brand-emerald min-h-[44px]"
          >
            &larr; Kembali ke Arsip Berita
          </Link>

          <div className="text-xs text-ink-muted">
            Dipublikasikan secara resmi oleh SMP Inshafuddin Banda Aceh
          </div>
        </footer>
      </article>
    </div>
  );
}
