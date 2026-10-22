/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  htmlLimitedBots: /.*/,
  distDir: process.env.RAIA_AUDIT === 'true' ? '.next-audit' : '.next',
  async redirects(){return [{source:'/galleria',destination:'/progetti',permanent:true},{source:'/privacy-policy',destination:'/privacy',permanent:true},...['/sitemap_index.xml','/page-sitemap.xml','/wp-sitemap.xml'].map(source=>({source,destination:'/sitemap.xml',permanent:true}))];},
  async headers(){return [{source:'/:path*',has:[{type:'host',value:'(?<preview>.*\\.vercel\\.app)'}],headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]}];},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.raiaweb.it', pathname: '/wp-content/uploads/**' }
    ]
  }
};
export default nextConfig;
