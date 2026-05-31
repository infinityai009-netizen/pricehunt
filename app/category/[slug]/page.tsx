import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import { aggregateSearch } from '@/lib/aggregator';
import type { Category, Retailer, SearchParams } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const search: SearchParams = {
    q: sp.q,
    category: slug as Category,
    retailer: sp.retailer as Retailer | undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    sort: (sp.sort as SearchParams['sort']) ?? 'relevance',
    limit: 60,
  };

  const products = await aggregateSearch(search);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar />
      <h1 className="mt-6 text-2xl font-bold capitalize">{slug}</h1>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-3">{products.length} offers</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
