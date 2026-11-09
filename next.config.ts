/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  htmlLimitedBots: /.*/,
  distDir: process.env.RAIA_AUDIT === 'true' ? '.next-audit' : '.next',
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'raiaweb.it' }],
        destination: 'https://www.raiaweb.it/:path*',
        permanent: true,
      },
      { source: '/galleria', destination: '/progetti', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      ...['/sitemap_index.xml', '/page-sitemap.xml', '/wp-sitemap.xml'].map(source => ({
        source, destination: '/sitemap.xml', permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<preview>.*[.]vercel[.]app)' }],
        missing: [{ type: 'host', value: 'sito-raia-brand.vercel.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      },
      ...['/images/:path*', '/videos/:path*', '/wp-content/uploads/:path*'].map(source => ({
        source,
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      })),
    ];
  },
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.raiaweb.it', pathname: '/wp-content/uploads/**' },
    ],
  },
};

export default nextConfig;
