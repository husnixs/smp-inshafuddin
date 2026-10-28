/**
 * Konfigurasi SEO berbasis environment.
 *
 * - `NEXT_PUBLIC_SITE_URL`: origin canonical produksi (tanpa trailing slash). Dipakai untuk
 *   canonical, metadataBase, Open Graph, sitemap, dan JSON-LD — di staging pun tetap domain produksi
 *   agar canonical tidak pernah mengarah ke host review.
 * - `SITE_ENV`: hanya nilai `production` yang mengizinkan pengindeksan. Nilai lain/kosong
 *   (staging, preview, subdomain review apa pun) otomatis `noindex` — default yang aman.
 */

const DEFAULT_SITE_URL = 'https://www.smpinshafuddin.sch.id';

function resolveSiteUrl(raw: string | undefined): string {
  if (!raw) return DEFAULT_SITE_URL;

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error(`protokol tidak didukung: ${parsed.protocol}`);
    }
    return parsed.origin;
  } catch (error) {
    console.error(`[SEO] NEXT_PUBLIC_SITE_URL tidak valid ("${raw}"), memakai ${DEFAULT_SITE_URL}:`, error);
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const IS_INDEXABLE = process.env.SITE_ENV === 'production';

export const SITE_NAME = 'SMP Inshafuddin Banda Aceh';
export const SITE_SHORT_NAME = 'SMP Inshafuddin';
export const SITE_LOCALE = 'id_ID';
export const SITE_LANGUAGE = 'id-ID';

/** Gambar Open Graph default: foto lingkungan sekolah yang sudah dipublikasikan di WordPress. */
export const DEFAULT_OG_IMAGE = {
  url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-22.16.57-scaled.jpeg',
  alt: 'Lingkungan dan suasana SMP Inshafuddin Banda Aceh',
};

/** Membentuk URL absolut dari path internal, mengikuti kebijakan trailing slash. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const [pathname, query] = withLeading.split('?');
  const withTrailing = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${SITE_URL}${withTrailing}${query ? `?${query}` : ''}`;
}
