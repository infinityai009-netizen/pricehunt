# PriceHunt

A UK price-comparison site that searches across Amazon, eBay, Argos, Currys, John Lewis, Tesco, Temu, Shein and 10+ other retailers and shows the best price for each product.

## Run it locally

```bash
cd "C:\Users\shivu\AI BAU\pricehunt"
npm install
npm run dev
```

Open http://localhost:3000

## What you get out of the box

- **Working homepage** with search, trending queries, category grid, retailer list
- **Search results page** with filters (sort, price, retailer)
- **Category pages** (`/category/electronics`, `/category/grocery`, etc.)
- **JSON API** at `/api/search?q=iphone`
- **Mock catalog** with ~80 product seeds expanded across 15 retailers — roughly 400–600 listings, so a search for "iphone" instantly shows iPhone 11/12/13/14/15/Pro/Max/SE across Amazon, eBay, Argos, Currys, John Lewis, etc.

## Plugging in real data sources

Copy `.env.example` to `.env.local` and fill in keys as you get approved. **All sources fail open** — if a key is missing, that source just returns nothing and the others (plus mock) fill the page.

### 1. eBay (easiest, do this first)

1. Sign up at https://developer.ebay.com (free, no review)
2. Create a "Production" app → copy the Client ID + Client Secret
3. Apply to the eBay Partner Network at https://partnernetwork.ebay.com
4. Paste keys into `.env.local`:
   ```
   EBAY_CLIENT_ID=...
   EBAY_CLIENT_SECRET=...
   EBAY_AFFILIATE_CAMPAIGN_ID=...
   ```
5. Restart `npm run dev` — eBay results appear instantly.

### 2. Amazon (hardest)

1. Apply to Amazon Associates UK: https://affiliate-program.amazon.co.uk
2. Get an approval — **but** to use the Product Advertising API you also need **3 qualifying sales in 180 days**.
3. Once approved, generate PA-API credentials at https://webservices.amazon.co.uk/paapi5
4. Either install the official SDK (`npm install paapi5-nodejs-sdk`) and complete the `searchAmazon` function in `lib/sources/amazon.ts`, or use a paid alternative like RainforestAPI / SerpAPI.

### 3. Awin (for Argos, Currys, John Lewis, AO, Boots, ASOS, B&Q, etc.)

1. Apply at https://www.awin.com — they review your site, so it helps to have a working version live first.
2. Join the specific merchants you want.
3. Download product feeds from the Awin dashboard (CSV/XML).
4. Build a daily job that imports feeds into Postgres, then replace the body of `lib/sources/awin.ts` with a DB query.

### 4. Temu / Shein / AliExpress

- **Temu**: affiliate program via https://affiliate.temu.com
- **Shein**: affiliate via ShareASale
- **AliExpress**: affiliate via the AliExpress Portals program

Each has a different API/feed format — add a new file under `lib/sources/` for each.

## How you make money

| Source       | Model               | Typical commission |
| ------------ | ------------------- | ------------------ |
| Amazon       | % of sale           | 1–10%              |
| eBay         | % of sale           | 1–4%               |
| Awin networks| % of sale or CPC    | 2–12%              |
| Google AdSense | per impression/click | low until scale |

The site already wraps outbound links with `target="_blank" rel="sponsored"` (good for SEO). Just replace `YOUR_AMAZON_TAG` and `YOUR_EBAY_CAMPAIGN` in `lib/sources/mock.ts` once you have IDs.

## Deploy

Easiest: push to GitHub, then connect to **Vercel** (1 click) or **Netlify**. Add the env vars in their dashboard.

## Project layout

```
app/
  layout.tsx            # header/footer
  page.tsx              # homepage
  search/page.tsx       # search results
  category/[slug]/      # category landing pages
  api/search/route.ts   # JSON search endpoint
components/
  SearchBar.tsx
  ProductCard.tsx
  Filters.tsx
  CategoryGrid.tsx
lib/
  types.ts
  aggregator.ts         # fans out to all sources
  sources/
    mock.ts             # 80 seeds × ~6 retailers each
    ebay.ts             # real eBay Browse API
    amazon.ts           # PA-API stub
    awin.ts             # feed loader stub
```

## Why the old site only showed "iPhone 15"

Your previous site almost certainly had a small hardcoded product list with one iPhone entry. This site expands every seed across 4–8 retailers and includes the full iPhone range (11, 12, 13, 14, 14 Pro, 15, 15 Pro Max, SE), so a search for `iphone` returns 30+ offers across many retailers — like a real comparison site.
