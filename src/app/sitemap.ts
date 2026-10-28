import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/config';
import { toIsoUtc } from '@/lib/seo/metadata';
import { PAGE_SEO } from '@/lib/seo/pages';
import { getAllPostsForSitemap, type PostSitemapEntry } from '@/lib/wordpress/api';

export const revalidate = 3600;

/** Halaman statis yang layak diindeks. lastModified hanya diisi bila ada tanggal yang valid. */
const STATIC_PATHS: Array<{ path: string; changeFrequency: 'daily' | 'monthly'; priority: number }> = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: PAGE_SEO.tentangKami.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.akademik.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.fasilitas.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.ekstrakurikuler.path, changeFrequency: 'monthly', priority: 0.8 },
  { path: PAGE_SEO.berita.path, changeFrequency: 'daily', priority: 0.9 },
];

/** Halaman yang isinya berganti mengikuti artikel terbaru. */
const NEWS_DRIVEN_PATHS = new Set(['/', PAGE_SEO.berita.path]);

function latestModified(posts: PostSitemapEntry[]): Date | undefined {
  const latest = posts.reduce<string | undefined>(
    (max, post) => (!max || post.modifiedGmt > max ? post.modifiedGmt : max),
    undefined,
  );
  return latest ? new Date(toIsoUtc(latest)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: PostSitemapEntry[] = [];
  try {
    posts = (await getAllPostsForSitemap()).filter((post) => !post.isNoindex);
  } catch (error) {
    // Tetap terbitkan halaman statis; artikel akan muncul kembali pada revalidasi berikutnya.
    console.error('[Sitemap] Gagal mengambil artikel WordPress:', error);
  }

  const newsLastModified = latestModified(posts);

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    ...(NEWS_DRIVEN_PATHS.has(path) && newsLastModified ? { lastModified: newsLastModified } : {}),
    changeFrequency,
    priority,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/${post.slug}/`),
    lastModified: new Date(toIsoUtc(post.modifiedGmt)),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
