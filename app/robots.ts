import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://pricehunt-bice.vercel.app';
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/wishlist'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
