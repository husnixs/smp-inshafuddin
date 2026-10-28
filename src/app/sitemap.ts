import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllPostSlugs } from '@/lib/wordpress/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang-kami/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/akademik/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fasilitas/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ekstrakurikuler/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berita/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    const slugs = await getAllPostSlugs();
    const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${baseUrl}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes];
  } catch (error) {
    console.error('[Sitemap] Gagal mengambil slug artikel:', error);
    return staticRoutes;
  }
}
