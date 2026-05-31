import type { Product, SearchParams } from '../types';

// ----------------------------------------------------------------------------
// Amazon Product Advertising API 5.0 — STUB
// ----------------------------------------------------------------------------
// PA-API requires AWS-style signed requests (SigV4). Implementing the full
// signing here would bloat this file. Two options when you're approved:
//
//   1. Use the official SDK: `npm install paapi5-nodejs-sdk` and replace the
//      body of searchAmazon() with a SearchItems call.
//   2. Use a hosted scraper like RainforestAPI or SerpAPI (paid, instant).
//
// Until then this function returns [] so the aggregator falls back to mock.
// ----------------------------------------------------------------------------

export async function searchAmazon(params: SearchParams): Promise<Product[]> {
  const key = process.env.AMAZON_ACCESS_KEY;
  const secret = process.env.AMAZON_SECRET_KEY;
  const tag = process.env.AMAZON_PARTNER_TAG;
  if (!key || !secret || !tag) return [];

  // TODO: implement PA-API SearchItems with SigV4 signing.
  // Example minimum payload:
  //   POST https://webservices.amazon.co.uk/paapi5/searchitems
  //   {
  //     "Keywords": params.q,
  //     "SearchIndex": "All",
  //     "PartnerTag": tag,
  //     "PartnerType": "Associates",
  //     "Resources": ["Images.Primary.Large","ItemInfo.Title","Offers.Listings.Price"]
  //   }
  console.warn('[amazon] PA-API not yet implemented — see lib/sources/amazon.ts');
  return [];
}
