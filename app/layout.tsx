import './globals.css';
import type { Metadata, Viewport } from 'next';
import AuthModal from '@/components/AuthModal';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pricehunt-bice.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PriceHunt — Compare prices across 106+ UK retailers',
    template: '%s · PriceHunt',
  },
  description:
    'Search once, compare everywhere. Find the lowest price across Amazon, Tesco, Currys, Argos, ASOS, EE, AutoTrader and 100+ trusted UK stores. Save up to £42 per purchase.',
  keywords: [
    'price comparison UK', 'cheapest deals UK', 'compare prices',
    'UK shopping', 'discount finder', 'best price UK', 'voucher codes',
    'price tracker', 'price history', 'PriceHunt',
  ],
  authors: [{ name: 'PriceHunt' }],
  creator: 'PriceHunt',
  publisher: 'PriceHunt',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'PriceHunt',
    title: 'PriceHunt — Compare prices across 106+ UK retailers',
    description:
      'Find the cheapest deal on any product across Amazon, Tesco, Currys, ASOS, EE and more. Save £42 on average.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PriceHunt — UK price comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PriceHunt — UK Price Comparison',
    description: 'Compare prices across 106+ UK retailers. Save up to £42.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#10b981',
};

// JSON-LD structured data for the organization + website search
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PriceHunt',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    'UK price comparison service across 106+ online retailers.',
  sameAs: ['https://github.com/infinityai009-netizen/pricehunt'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PriceHunt',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <Providers>
          {children}
          <AuthModal />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
