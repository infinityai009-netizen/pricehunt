import Link from 'next/link';
import InnerShell from '@/components/InnerShell';
import SmartSearchBar from '@/components/SmartSearchBar';

export default function NotFound() {
  return (
    <InnerShell>
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl sm:text-9xl font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600 max-w-lg mx-auto">
          The page you're looking for doesn't exist. Try searching for a product instead:
        </p>

        <div className="mt-8">
          <SmartSearchBar />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
          >
            ← Back to home
          </Link>
          <Link
            href="/category/electronics"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold hover:bg-slate-50"
          >
            Browse electronics
          </Link>
          <Link
            href="/category/grocery"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold hover:bg-slate-50"
          >
            Browse grocery
          </Link>
        </div>
      </div>
    </InnerShell>
  );
}
