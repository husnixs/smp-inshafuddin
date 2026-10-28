import type { WPPost, WPPage, WPMedia, WPCategory } from '@/types/wordpress';

const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://www.smpinshafuddin.sch.id/wp-json/wp/v2';

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
}

/**
 * Mengambil daftar artikel published dari WordPress REST API server-side.
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

  const url = `${WP_API_BASE}/posts?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5 menit
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`[WP API] Gagal mengambil berita: ${res.status} ${res.statusText}`);
      return { posts: [], total: 0, totalPages: 0 };
    }

    const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
    const posts: WPPost[] = await res.json();

    return { posts, total, totalPages };
  } catch (error) {
    console.error('[WP API] Error koneksi saat fetch posts:', error);
    return { posts: [], total: 0, totalPages: 0 };
  }
}

/**
 * Mengambil satu artikel berdasarkan slug.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!slug) return null;
  const url = `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=true&status=publish`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 900 }, // 15 menit
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`[WP API] Gagal mengambil post ${slug}: ${res.status}`);
      return null;
    }

    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`[WP API] Error koneksi saat fetch post ${slug}:`, error);
    return null;
  }
}

/**
 * Mengambil satu halaman statis WordPress berdasarkan slug.
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  if (!slug) return null;
  const url = `${WP_API_BASE}/pages?slug=${encodeURIComponent(slug)}&status=publish`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // 60 menit
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`[WP API] Gagal mengambil page ${slug}: ${res.status}`);
      return null;
    }

    const pages: WPPage[] = await res.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`[WP API] Error koneksi saat fetch page ${slug}:`, error);
    return null;
  }
}

/**
 * Mengambil media berdasarkan ID.
 */
export async function getMediaById(id: number): Promise<WPMedia | null> {
  if (!id || id <= 0) return null;
  const url = `${WP_API_BASE}/media/${id}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 24 jam
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`[WP API] Error koneksi saat fetch media ${id}:`, error);
    return null;
  }
}

/**
 * Mengambil semua slug artikel untuk keperluan dynamic route static generation / sitemap.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const url = `${WP_API_BASE}/posts?per_page=100&_fields=slug&status=publish`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return [];
    const items: Array<{ slug: string }> = await res.json();
    return items.map((item) => item.slug);
  } catch (error) {
    console.error('[WP API] Error fetch post slugs:', error);
    return [];
  }
}

/**
 * Mengambil semua slug halaman untuk sitemap.
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const url = `${WP_API_BASE}/pages?per_page=50&_fields=slug&status=publish`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return [];
    const items: Array<{ slug: string }> = await res.json();
    return items.map((item) => item.slug);
  } catch (error) {
    console.error('[WP API] Error fetch page slugs:', error);
    return [];
  }
}

/**
 * Mengambil kategori.
 */
export async function getCategories(): Promise<WPCategory[]> {
  const url = `${WP_API_BASE}/categories?per_page=20`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('[WP API] Error fetch categories:', error);
    return [];
  }
}
