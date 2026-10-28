import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress/api';
import { extractFirstImage, stripHtml, formatIndonesianDate } from '@/lib/wordpress/extract';
import { siteConfig } from '@/config/site';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StarMark from '@/components/ui/StarMark';

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
    <article className="pb-16 lg:pb-24">
      <header className="border-b border-divider bg-surface-sand">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 lg:pb-14 lg:pt-10">
          <Breadcrumb items={[{ label: 'Berita', href: '/berita/' }, { label: cleanTitle }]} />

          <p className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-ink">
            <StarMark className="h-3 w-3 text-brand-gold" />
            Warta Sekolah
          </p>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-brand-emerald sm:text-4xl lg:text-5xl">
            {cleanTitle}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-2">
              <svg aria-hidden="true" className="h-4 w-4 text-brand-gold-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>{postDate}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <svg aria-hidden="true" className="h-4 w-4 text-brand-gold-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{authorName}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {mainImage && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-hero bg-surface-sage shadow-lift">
            <Image
              src={mainImage}
              alt={cleanTitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div
          className="content-prose mt-10 text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <footer className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-divider pt-8 sm:flex-row sm:items-center">
          <Link
            href="/berita/"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-control text-sm font-semibold text-brand-emerald hover:text-brand-emerald-hover"
          >
            &larr; Kembali ke arsip berita
          </Link>
          <p className="text-xs text-ink-muted">Dipublikasikan oleh SMP Inshafuddin Banda Aceh</p>
        </footer>
      </div>
    </article>
  );
}
