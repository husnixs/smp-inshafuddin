import 'server-only';
import type { WPPost, WPPage, WPMedia, WPCategory } from '@/types/wordpress';

const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://www.smpinshafuddin.sch.id/wp-json/wp/v2';

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_PER_PAGE = 100;
/** Batas pengaman jumlah halaman saat menelusuri seluruh arsip (100 × 50 = 5.000 entri). */
const MAX_LISTING_PAGES = 50;

/** Kegagalan jaringan / respons server WordPress (bukan "konten tidak ditemukan"). */
export class WordPressApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'WordPressApiError';
  }
}

/**
 * Fetch WordPress server-side dengan timeout. Melempar `WordPressApiError` untuk kegagalan jaringan
 * atau status non-2xx, sehingga pemanggil dapat membedakan error dari hasil kosong.
 */
async function wpFetch(path: string, revalidate: number): Promise<Response> {
  const url = `${WP_API_BASE}${path}`;
  let res: Response;

  try {
    res = await fetch(url, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new WordPressApiError(`Koneksi ke WordPress gagal (${path}): ${String(error)}`);
  }

  if (!res.ok) {
    throw new WordPressApiError(`WordPress merespons ${res.status} ${res.statusText} (${path})`, res.status);
  }
  return res;
}

async function wpFetchJson<T>(path: string, revalidate: number): Promise<T> {
  const res = await wpFetch(path, revalidate);
  return (await res.json()) as T;
}

interface FetchPostsOptions {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
}

export interface PostsResult {
  posts: WPPost[];
  total: number;
  totalPages: number;
  /** true bila data gagal diambil (bukan karena memang kosong). */
  failed: boolean;
}

/**
 * Mengambil daftar artikel published dari WordPress REST API server-side.
 * Tidak melempar: kegagalan dikembalikan sebagai `failed: true` agar halaman tetap dapat dirender.
 */
export async function getPosts(options: FetchPostsOptions = {}): Promise<PostsResult> {
  const { page = 1, perPage = 10, category, search } = options;
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    status: 'publish',
    _embed: 'true',
  });

  if (category) params.set('categories', category.toString());
  if (search) params.set('search', search);

  try {
    const res = await wpFetch(`/posts?${params.toString()}`, 300);
    const posts: unknown = await res.json();
    if (!Array.isArray(posts)) throw new WordPressApiError('Format respons daftar artikel tidak valid');

    return {
      posts: posts as WPPost[],
      total: parseInt(res.headers.get('X-WP-Total') || '0', 10),
      totalPages: parseInt(res.headers.get('X-WP-TotalPages') || '0', 10),
      failed: false,
    };
  } catch (error) {
    // WordPress mengembalikan 400 (rest_post_invalid_page_number) untuk halaman di luar rentang.
    if (error instanceof WordPressApiError && error.status === 400) {
      return { posts: [], total: 0, totalPages: 0, failed: false };
    }
    console.error('[WP API] Gagal mengambil daftar berita:', error);
    return { posts: [], total: 0, totalPages: 0, failed: true };
  }
}

/**
 * Mengambil satu artikel published berdasarkan slug.
 * Mengembalikan `null` hanya bila artikel memang tidak ada; kegagalan API dilempar agar
 * Next.js menampilkan error (dan mempertahankan cache ISR lama) alih-alih 404 palsu.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!slug) return null;
  const posts = await wpFetchJson<unknown>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=true&status=publish`,
    900,
  );
  if (!Array.isArray(posts)) throw new WordPressApiError(`Format respons artikel "${slug}" tidak valid`);
  return (posts[0] as WPPost | undefined) ?? null;
}

/**
 * Mengambil satu halaman statis WordPress berdasarkan slug.
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  if (!slug) return null;
  try {
    const pages = await wpFetchJson<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}&status=publish`, 3600);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`[WP API] Gagal mengambil page ${slug}:`, error);
    return null;
  }
}

/**
 * Mengambil media berdasarkan ID.
 */
export async function getMediaById(id: number): Promise<WPMedia | null> {
  if (!id || id <= 0) return null;
  try {
    return await wpFetchJson<WPMedia>(`/media/${id}`, 86400);
  } catch (error) {
    console.error(`[WP API] Gagal mengambil media ${id}:`, error);
    return null;
  }
}

export interface PostSitemapEntry {
  slug: string;
  modifiedGmt: string;
  isNoindex: boolean;
}

interface RawSitemapPost {
  slug?: unknown;
  modified_gmt?: unknown;
  yoast_head_json?: { robots?: { index?: unknown } };
}

/**
 * Menelusuri seluruh artikel published (dengan pagination) untuk sitemap.
 * Melempar `WordPressApiError` bila gagal agar sitemap tidak diam-diam kehilangan artikel.
 */
export async function getAllPostsForSitemap(): Promise<PostSitemapEntry[]> {
  const entries: PostSitemapEntry[] = [];
  const fields = '_fields=slug,modified_gmt,yoast_head_json.robots';

  for (let page = 1; page <= MAX_LISTING_PAGES; page++) {
    const res = await wpFetch(`/posts?per_page=${MAX_PER_PAGE}&page=${page}&status=publish&${fields}`, 3600);
    const items: unknown = await res.json();
    if (!Array.isArray(items)) throw new WordPressApiError('Format respons sitemap artikel tidak valid');

    for (const item of items as RawSitemapPost[]) {
      if (typeof item.slug !== 'string' || !item.slug || typeof item.modified_gmt !== 'string') continue;
      entries.push({
        slug: item.slug,
        modifiedGmt: item.modified_gmt,
        isNoindex: item.yoast_head_json?.robots?.index === 'noindex',
      });
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    if (page >= totalPages) break;
  }

  return entries;
}

/**
 * Mengambil slug artikel terbaru untuk pre-render saat build.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const items = await wpFetchJson<Array<{ slug: string }>>(
      `/posts?per_page=${MAX_PER_PAGE}&_fields=slug&status=publish`,
      3600,
    );
    return items.map((item) => item.slug);
  } catch (error) {
    console.error('[WP API] Gagal mengambil slug artikel:', error);
    return [];
  }
}

/**
 * Mengambil kategori.
 */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    return await wpFetchJson<WPCategory[]>('/categories?per_page=20', 3600);
  } catch (error) {
    console.error('[WP API] Gagal mengambil kategori:', error);
    return [];
  }
}
