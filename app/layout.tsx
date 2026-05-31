import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import WishlistLink from '@/components/WishlistLink';

export const metadata: Metadata = {
  title: 'PriceHunt — Compare prices across 20+ UK retailers',
  description:
    'Search once, compare everywhere. Find the best price across Amazon, eBay, Argos, Currys, John Lewis, Tesco, Temu, Shein and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-brand-600">
              PriceHunt
            </Link>
            <nav className="ml-auto hidden md:flex gap-6 text-sm text-slate-600 items-center">
              <Link href="/category/electronics" className="hover:text-brand-600">Electronics</Link>
              <Link href="/category/fashion" className="hover:text-brand-600">Fashion</Link>
              <Link href="/category/home" className="hover:text-brand-600">Home</Link>
              <Link href="/category/grocery" className="hover:text-brand-600">Grocery</Link>
              <Link href="/category/gaming" className="hover:text-brand-600">Gaming</Link>
            </nav>
            <div className="ml-auto md:ml-6">
              <WishlistLink />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} PriceHunt — affiliate links may earn us a commission.</span>
            <span>Prices accurate at time of indexing.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
