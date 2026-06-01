import Link from 'next/link';
import { notFound } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import WishlistButton from '@/components/WishlistButton';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import RetailerLink from '@/components/RetailerLink';
import { findProductByKey } from '@/lib/aggregator';
import { fakePriceHistory } from '@/lib/priceHistory';

export const dynamic = 'force-dynamic';

const RETAILER_NAME: Record<string, string> = {
  amazon: 'Amazon', ebay: 'eBay', argos: 'Argos', currys: 'Currys',
  johnlewis: 'John Lewis', tesco: 'Tesco', asda: 'ASDA', sainsburys: "Sainsbury's",
  morrisons: 'Morrisons', waitrose: 'Waitrose', aldi: 'Aldi', lidl: 'Lidl',
  iceland: 'Iceland', ocado: 'Ocado', coop: 'Co-op', marksandspencer: 'M&S',
  temu: 'Temu', shein: 'Shein', aliexpress: 'AliExpress', wayfair: 'Wayfair',
  ikea: 'IKEA', 'b&q': 'B&Q', walmart: 'Walmart',
  apple: 'Apple', facebook: 'Facebook Marketplace',
  ubereats: 'Uber Eats', deliveroo: 'Deliveroo', justeat: 'Just Eat',
  autotrader: 'AutoTrader', motors: 'Motors', gumtree: 'Gumtree',
  carwow: 'Carwow', cinch: 'Cinch', heycar: 'Heycar', arnoldclark: 'Arnold Clark',
  comparethemarket: 'Compare the Market', moneysupermarket: 'MoneySuperMarket',
  gocompare: 'GoCompare', confused: 'Confused.com', admiral: 'Admiral',
  aviva: 'Aviva', directline: 'Direct Line', churchill: 'Churchill',
  sky: 'Sky', bt: 'BT', virginmedia: 'Virgin Media', talktalk: 'TalkTalk',
  nowbroadband: 'NOW Broadband', plusnet: 'Plusnet', hyperoptic: 'Hyperoptic',
  ee: 'EE', vodafone: 'Vodafone', three: 'Three', o2: 'O2',
  giffgaff: 'giffgaff', tescomobile: 'Tesco Mobile', skymobile: 'Sky Mobile',
  voxi: 'VOXI', smarty: 'SMARTY', idmobile: 'iD Mobile',
  carphonewarehouse: 'Carphone Warehouse',
  bm: 'B&M', homebargains: 'Home Bargains', poundland: 'Poundland', wilko: 'Wilko',
  zara: 'Zara', hm: 'H&M', office: 'Office', asos: 'ASOS', next: 'Next',
  primark: 'Primark', jdsports: 'JD Sports', schuh: 'Schuh',
  sportsdirect: 'Sports Direct', prettylittlething: 'PrettyLittleThing',
  boohoo: 'Boohoo', riverisland: 'River Island', newlook: 'New Look',
  clarks: 'Clarks', mango: 'Mango', selfridges: 'Selfridges',
  fatface: 'FatFace', uniqlo: 'Uniqlo',
  tkmaxx: 'TK Maxx', homesense: 'HomeSense',
  watchshop: 'Watch Shop', watchesofswitzerland: 'Watches of Switzerland',
  goldsmiths: 'Goldsmiths', beaverbrooks: 'Beaverbrooks',
  ernestjones: 'Ernest Jones', hsamuel: 'H. Samuel',
  fossil: 'Fossil', tagheuer: 'TAG Heuer', casioshop: 'Casio',
  tommyhilfiger: 'Tommy Hilfiger', hugoboss: 'BOSS', ralphlauren: 'Ralph Lauren',
  calvinklein: 'Calvin Klein', boden: 'Boden', joules: 'Joules',
  whitestuff: 'White Stuff', mountainwarehouse: 'Mountain Warehouse',
  cotswoldoutdoor: 'Cotswold Outdoor', footasylum: 'Footasylum',
  size: 'size?', flannels: 'Flannels',
};

interface PageProps {
  params: Promise<{ key: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { key } = await params;
  const offers = await findProductByKey(key);
  if (offers.length === 0) notFound();

  const main = offers[0]; // cheapest
  const lowestEver = Math.min(...offers.map(o => o.price));
  const highestPrice = Math.max(...offers.map(o => o.price));
  const savings = highestPrice - lowestEver;
  const history = fakePriceHistory(main.productKey, main.price);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar />

      <nav className="text-sm text-slate-500 mt-6 mb-4">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${main.category}`} className="hover:text-brand-600 capitalize">{main.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{main.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white border rounded-lg overflow-hidden relative">
          <WishlistButton product={main} className="absolute top-3 right-3 z-10 w-10 h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={main.image} alt={main.title} className="w-full h-full object-cover aspect-square" />
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{main.title}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-brand-600">£{main.price.toFixed(2)}</span>
            <span className="text-sm text-slate-500">at {RETAILER_NAME[main.retailer] ?? main.retailer}</span>
          </div>

          {savings > 0 && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm">
              <strong>Save £{savings.toFixed(2)}</strong> compared to the most expensive retailer (£{highestPrice.toFixed(2)})
            </div>
          )}

          <RetailerLink
            href={main.url}
            className="block text-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg"
          >
            Go to {RETAILER_NAME[main.retailer] ?? main.retailer} →
          </RetailerLink>

          <div className="text-sm text-slate-500">
            Compared across <strong>{offers.length}</strong> retailers · Lowest: £{lowestEver.toFixed(2)} · Highest: £{highestPrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* All offers table */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Compare all {offers.length} offers</h2>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">Retailer</th>
                <th className="px-4 py-3">In-store / Online</th>
                <th className="px-4 py-3 hidden sm:table-cell">Delivery</th>
                <th className="px-4 py-3 hidden md:table-cell">Total delivered</th>
                <th className="px-4 py-3 text-right">Go to store</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o, i) => {
                const fee = o.deliveryFee ?? 0;
                const totalDelivered = o.inStoreOnly ? null : o.price + fee;
                return (
                  <tr key={o.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">
                      <div>{RETAILER_NAME[o.retailer] ?? o.retailer}</div>
                      {i === 0 && <span className="inline-block mt-0.5 text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Best price</span>}
                      {!o.inStock && <div className="text-[10px] text-rose-600 mt-0.5">Out of stock</div>}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">£{o.price.toFixed(2)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs">
                      {o.inStoreOnly ? (
                        <span className="text-amber-700">🏪 In-store only</span>
                      ) : o.deliveryOnly ? (
                        <span>🚚 £{(o.deliveryFee ?? 0).toFixed(2)} delivery</span>
                      ) : (
                        <div className="space-y-0.5">
                          <div>
                            {o.deliveryFee === 0 ? (
                              <span className="text-green-700">🚚 Free delivery</span>
                            ) : (
                              <span>🚚 £{(o.deliveryFee ?? 0).toFixed(2)}</span>
                            )}
                          </div>
                          {o.freeDeliveryOver != null && o.freeDeliveryOver > 0 && (
                            <div className="text-[10px] text-slate-500">Free over £{o.freeDeliveryOver}</div>
                          )}
                          {o.clickCollect && <div className="text-[10px] text-slate-500">📦 Click & Collect</div>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {totalDelivered == null ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        <span className="font-semibold">£{totalDelivered.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <RetailerLink
                        href={o.url}
                        className="inline-block px-3 py-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium whitespace-nowrap"
                      >
                        Visit →
                      </RetailerLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Price history */}
      <section className="mt-8">
        <PriceHistoryChart points={history} />
        <p className="text-xs text-slate-400 mt-2">
          Demo data. Real history requires daily snapshots — see README for setup.
        </p>
      </section>
    </div>
  );
}
