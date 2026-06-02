import Link from 'next/link';
import WishlistLink from './WishlistLink';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

export default function InnerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center text-white font-bold text-xs">PH</div>
            <span className="text-xl font-bold text-slate-900">PriceHunt</span>
          </Link>
          <nav className="ml-2 hidden md:flex gap-5 text-sm text-slate-600 items-center">
            <Link href="/category/electronics" className="hover:text-emerald-600">Electronics</Link>
            <Link href="/category/fashion" className="hover:text-emerald-600">Fashion</Link>
            <Link href="/category/grocery" className="hover:text-emerald-600">Grocery</Link>
            <Link href="/category/cars" className="hover:text-emerald-600">Cars</Link>
            <Link href="/category/food" className="hover:text-emerald-600">Food</Link>
            <Link href="/category/broadband" className="hover:text-emerald-600">Broadband</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <WishlistLink />
            <NotificationBell />
            <UserMenu />
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
    </div>
  );
}
