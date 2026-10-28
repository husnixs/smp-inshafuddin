/** Hanya SITE_ENV=production yang boleh diindeks; staging/preview/review → noindex. */
const isIndexable = process.env.SITE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Media WordPress jarang berubah pada URL yang sama; cache hasil optimasi selama 7 hari.
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.smpinshafuddin.sch.id',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'www.smpinshafuddin.sch.id',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async headers() {
    if (isIndexable) return [];
    // Melengkapi meta robots: berlaku juga untuk respons non-HTML (sitemap, gambar teroptimasi).
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
