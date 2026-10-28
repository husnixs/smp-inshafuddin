/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
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
};

export default nextConfig;
