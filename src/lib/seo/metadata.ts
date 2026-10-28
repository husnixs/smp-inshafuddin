import type { Metadata } from 'next';
import type { WPPost } from '@/types/wordpress';
import { extractFirstImage, stripHtml, truncateText, decodeHtmlEntities } from '@/lib/wordpress/extract';
import {
  DEFAULT_OG_IMAGE,
  IS_INDEXABLE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_SHORT_NAME,
  absoluteUrl,
} from './config';

const DESCRIPTION_MAX_LENGTH = 160;

export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path internal, mis. `/tentang-kami/`. */
  path: string;
  /** Title absolut tanpa template (khusus homepage). */
  absoluteTitle?: boolean;
  image?: SeoImage;
  type?: 'website' | 'article';
  /** Izin indeks dari sumber konten (mis. Yoast). Tetap dikalahkan oleh environment non-produksi. */
  allowIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
  };
}

/** Kebijakan robots gabungan: environment non-produksi selalu noindex. */
export function buildRobots(allowIndex = true): Metadata['robots'] {
  const index = IS_INDEXABLE && allowIndex;
  return {
    index,
    follow: IS_INDEXABLE,
    googleBot: {
      index,
      follow: IS_INDEXABLE,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

/**
 * Satu-satunya pembentuk metadata halaman. Next.js mengganti objek `openGraph`/`twitter` parent
 * secara utuh, sehingga setiap halaman harus menyusun ulang URL, title, dan gambar miliknya sendiri.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  allowIndex = true,
  article,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_SHORT_NAME}`;
  const images = [{ url: image.url, alt: image.alt, width: image.width, height: image.height }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: buildRobots(allowIndex),
    openGraph: {
      type,
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: canonical,
      title: socialTitle,
      description,
      images,
      ...(type === 'article' && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}

/** Menghapus akhiran nama situs yang ditambahkan Yoast (mis. " - SMP Inshafuddin"). */
function stripSiteSuffix(title: string, siteName?: string): string {
  const names = [siteName, SITE_SHORT_NAME, SITE_NAME].filter((name): name is string => Boolean(name));
  return names.reduce((current, name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return current.replace(new RegExp(`\\s*[-–—|·]\\s*${escaped}\\s*$`, 'i'), '');
  }, title).trim();
}

/** Mengubah tanggal WordPress GMT (tanpa zona waktu) menjadi ISO 8601 UTC. */
export function toIsoUtc(wpGmtDate: string): string {
  return wpGmtDate.endsWith('Z') ? wpGmtDate : `${wpGmtDate}Z`;
}

export function getPostTitle(post: WPPost): string {
  return decodeHtmlEntities(stripHtml(post.title.rendered));
}

export function getPostDescription(post: WPPost): string {
  const yoast = post.yoast_head_json;
  const source =
    yoast?.description || yoast?.og_description || stripHtml(post.excerpt.rendered || post.content.rendered);
  const description = truncateText(decodeHtmlEntities(source).replace(/\s+/g, ' ').trim(), DESCRIPTION_MAX_LENGTH);
  return description || `Berita dan kegiatan terbaru dari ${SITE_NAME}.`;
}

export function getPostImage(post: WPPost): SeoImage | null {
  const title = getPostTitle(post);
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  if (featured?.source_url) {
    return {
      url: featured.source_url,
      alt: featured.alt_text || title,
      width: featured.media_details?.width,
      height: featured.media_details?.height,
    };
  }

  const yoastImage = post.yoast_head_json?.og_image?.[0];
  if (yoastImage?.url) {
    return { url: yoastImage.url, alt: title, width: yoastImage.width, height: yoastImage.height };
  }

  const contentImage = extractFirstImage(post.content.rendered);
  return contentImage ? { url: contentImage, alt: title } : null;
}

export function getPostAuthorName(post: WPPost): string | undefined {
  return post._embedded?.author?.[0]?.name || undefined;
}

/** Metadata artikel: Yoast sebagai prioritas, fallback ke data artikel WordPress. */
export function buildArticleMetadata(post: WPPost): Metadata {
  const yoast = post.yoast_head_json;
  const yoastTitle = yoast?.og_title || yoast?.title;
  const title = yoastTitle ? stripSiteSuffix(decodeHtmlEntities(yoastTitle), yoast?.og_site_name) : getPostTitle(post);
  return buildPageMetadata({
    title: title || getPostTitle(post),
    description: getPostDescription(post),
    path: `/${post.slug}/`,
    image: getPostImage(post) ?? DEFAULT_OG_IMAGE,
    type: 'article',
    allowIndex: yoast?.robots?.index !== 'noindex',
    article: {
      publishedTime: toIsoUtc(post.date_gmt),
      modifiedTime: toIsoUtc(post.modified_gmt),
    },
  });
}
