import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/lib/seo/config';

/**
 * Produksi: semua crawler (termasuk crawler AI) diizinkan dan sitemap produksi dirujuk.
 * Non-produksi: crawling TETAP diizinkan agar crawler dapat membaca `noindex` (meta + X-Robots-Tag);
 * memblokir via robots.txt justru membuat URL bisa terindeks tanpa konten. Sitemap tidak dirujuk.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return {
      rules: { userAgent: '*', allow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
