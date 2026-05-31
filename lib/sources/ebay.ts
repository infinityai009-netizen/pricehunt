import type { Product, SearchParams } from '../types';
import { productKey } from '../productKey';

// ----------------------------------------------------------------------------
// eBay Browse API integration
// Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
// Free. Sign up: https://developer.ebay.com
// You get a Client ID + Client Secret, then exchange for an OAuth token.
// ----------------------------------------------------------------------------

const TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const SEARCH_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
  const id = process.env.EBAY_CLIENT_ID;
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!id || !secret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  });

  if (!res.ok) {
    console.error('[ebay] token fetch failed', res.status, await res.text());
    return null;
  }
  const data: any = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000),
  };
  return cachedToken.token;
}

function affiliateWrap(itemWebUrl: string): string {
  const campaign = process.env.EBAY_AFFILIATE_CAMPAIGN_ID;
  if (!campaign) return itemWebUrl;
  // EPN rover format for UK
  const tracking = `mkcid=1&mkrid=710-53481-19255-0&campid=${campaign}&toolid=20000`;
  const sep = itemWebUrl.includes('?') ? '&' : '?';
  return `${itemWebUrl}${sep}${tracking}`;
}

export async function searchEbay(params: SearchParams): Promise<Product[]> {
  const q = params.q?.trim();
  if (!q) return [];

  const token = await getToken();
  if (!token) return []; // no creds → silently skip; mock will fill in

  const url = new URL(SEARCH_URL);
  url.searchParams.set('q', q);
  url.searchParams.set('limit', String(params.limit ?? 30));

  const filters: string[] = [];
  if (params.minPrice != null || params.maxPrice != null) {
    const min = params.minPrice ?? 0;
    const max = params.maxPrice ?? 99999;
    filters.push(`price:[${min}..${max}]`);
    filters.push('priceCurrency:GBP');
  }
  if (filters.length) url.searchParams.set('filter', filters.join(','));

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB',
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error('[ebay] search failed', res.status);
      return [];
    }
    const data: any = await res.json();
    const items: any[] = data.itemSummaries ?? [];

    return items.map((it): Product => ({
      id: `ebay-${it.itemId}`,
      productKey: productKey(it.title),
      title: it.title,
      image: it.image?.imageUrl ?? it.thumbnailImages?.[0]?.imageUrl ?? '',
      price: Number(it.price?.value ?? 0),
      currency: 'GBP',
      retailer: 'ebay',
      url: affiliateWrap(it.itemWebUrl),
      rating: undefined,
      reviews: undefined,
      category: (params.category ?? 'electronics'),
      inStock: true,
      source: 'ebay',
    }));
  } catch (err) {
    console.error('[ebay] error', err);
    return [];
  }
}
