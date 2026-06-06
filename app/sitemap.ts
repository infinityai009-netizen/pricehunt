import type { MetadataRoute } from 'next';

const CATEGORIES = [
  'electronics','fashion','beauty','grocery','home','furniture','gaming',
  'sports','toys','outdoor','pet','cameras','food','cars','insurance',
  'broadband','mobileplan',
];

const POPULAR_SEARCHES = [
  'iphone-17-pro-max', 'iphone-16-pro', 'samsung-galaxy-s24',
  'playstation-5', 'xbox-series-x', 'nintendo-switch',
  'sony-wh-1000xm5', 'airpods-pro-2', 'apple-watch',
  'macbook-air', 'ipad-pro', 'dyson-airwrap',
  'fridge-freezer', 'washing-machine', 'tumble-dryer',
  'air-fryer', 'tv-65-oled', 'samsung-tv',
  'tesla-model-3', 'used-cars',
  'car-insurance', 'home-insurance', 'pet-insurance',
  'broadband-deals', 'sim-only', 'mobile-contracts',
  'pizza', 'burger', 'kfc', 'wagamama',
  'milk', 'cheese', 'pampers', 'baby-food',
  'nike-air-force-1', 'dr-martens', 'maxi-dress',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://pricehunt-bice.vercel.app';
  const lastModified = new Date();

  return [
    { url: `${base}/`,        lastModified, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/about`,   lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,   lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    ...CATEGORIES.map(c => ({
      url: `${base}/category/${c}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
    ...POPULAR_SEARCHES.map(q => ({
      url: `${base}/search?q=${q.replace(/-/g, '+')}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
  ];
}
