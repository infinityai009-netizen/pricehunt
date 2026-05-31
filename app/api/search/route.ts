import { NextRequest, NextResponse } from 'next/server';
import { aggregateSearch } from '@/lib/aggregator';
import type { Category, Retailer, SearchParams } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const params: SearchParams = {
    q: sp.get('q') ?? undefined,
    category: (sp.get('category') as Category) ?? undefined,
    retailer: (sp.get('retailer') as Retailer) ?? undefined,
    minPrice: sp.get('minPrice') ? Number(sp.get('minPrice')) : undefined,
    maxPrice: sp.get('maxPrice') ? Number(sp.get('maxPrice')) : undefined,
    sort: (sp.get('sort') as SearchParams['sort']) ?? 'relevance',
    limit: sp.get('limit') ? Number(sp.get('limit')) : 60,
  };
  const products = await aggregateSearch(params);
  return NextResponse.json({ count: products.length, products });
}
