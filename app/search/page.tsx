import InnerShell from '@/components/InnerShell';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import { aggregateSearch } from '@/lib/aggregator';
import type { Category, Retailer, SearchParams } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const params: SearchParams = {
    q: sp.q,
    category: sp.category as Category | undefined,
    retailer: sp.retailer as Retailer | undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    sort: (sp.sort as SearchParams['sort']) ?? 'relevance',
    limit: 60,
  };

  const products = await aggregateSearch(params);

  // Group by title for "price comparison" feel
  const grouped = new Map<string, typeof products>();
  for (const p of products) {
    const key = p.title.toLowerCase();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(p);
  }
  const groups = Array.from(grouped.entries()).map(([_, items]) => {
    items.sort((a, b) => a.price - b.price);
    return items;
  });

  return (
    <InnerShell>
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar initial={params.q} />

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <Filters />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">
              {params.q ? <>Results for "{params.q}"</> : 'Browse products'}
            </h1>
            <span className="text-sm text-slate-500">{products.length} offers across {groups.length} products</span>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border rounded-lg p-10 text-center text-slate-500">
              No products found. Try a broader search.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
    </InnerShell>
  );
}
