import type { Product, SearchParams } from './types';
import { searchMock } from './sources/mock';
import { searchEbay } from './sources/ebay';
import { searchAmazon } from './sources/amazon';
import { searchAwin } from './sources/awin';

// Find every offer for a given productKey across all sources.
export async function findProductByKey(key: string): Promise<Product[]> {
  // Pull broadly, then filter — productKey is built from the title, so
  // searching by part of the slug usually surfaces the product.
  const looseQuery = key.replace(/-/g, ' ');
  const all = await aggregateSearch({ q: looseQuery, limit: 100 });
  return all.filter(p => p.productKey === key).sort((a, b) => a.price - b.price);
}

// Runs all sources in parallel, merges, sorts, and dedupes.
export async function aggregateSearch(params: SearchParams): Promise<Product[]> {
  const [ebay, amazon, awin, mock] = await Promise.all([
    searchEbay(params).catch(e => { console.error(e); return []; }),
    searchAmazon(params).catch(e => { console.error(e); return []; }),
    searchAwin(params).catch(e => { console.error(e); return []; }),
    searchMock(params).catch(e => { console.error(e); return []; }),
  ]);

  let all = [...ebay, ...amazon, ...awin, ...mock];

  // Sort
  switch (params.sort) {
    case 'price-asc':  all.sort((a, b) => a.price - b.price); break;
    case 'price-desc': all.sort((a, b) => b.price - a.price); break;
    case 'rating':     all.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
    default:           /* relevance — keep insertion order */ break;
  }

  return all;
}
