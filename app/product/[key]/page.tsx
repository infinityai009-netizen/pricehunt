import Link from 'next/link';
import { notFound } from 'next/navigation';
import InnerShell from '@/components/InnerShell';
import SearchBar from '@/components/SearchBar';
import ProductImage from '@/components/ProductImage';
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
    <InnerShell>
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
          <ProductImage
            src={main.image}
            alt={main.title}
            fallbackTitle={main.title}
            fallbackCategory={main.category}
            className="w-full h-full object-cover aspect-square"
          />
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

      {/* All offers — card-based comparison rows */}
      <section className="mt-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Compare all {offers.length} offers</h2>
            <p className="text-sm text-slate-500 mt-0.5">Sorted by cheapest including delivery</p>
          </div>
          <div className="hidden sm:block text-xs text-slate-500 font-medium uppercase tracking-wide">
            Save up to £{savings.toFixed(0)}
          </div>
        </div>

        <div className="space-y-2.5">
          {offers.map((o, i) => {
            const fee = o.deliveryFee ?? 0;
            const totalDelivered = o.inStoreOnly ? null : o.price + fee;
            const isBest = i === 0;
            const retailerName = RETAILER_NAME[o.retailer] ?? o.retailer;

            // Build delivery label
            let deliveryLabel: { text: string; color: string; icon: string };
            if (o.inStoreOnly) {
              deliveryLabel = { text: 'In-store only', color: 'text-amber-700 bg-amber-50', icon: '🏪' };
            } else if (o.deliveryOnly) {
              deliveryLabel = { text: `£${fee.toFixed(2)} delivery`, color: 'text-slate-700 bg-slate-100', icon: '🚚' };
            } else if (fee === 0) {
              deliveryLabel = { text: 'Free delivery', color: 'text-green-700 bg-green-50', icon: '🚚' };
            } else if (o.clickCollect) {
              deliveryLabel = { text: `£${fee.toFixed(2)} or collect today`, color: 'text-blue-700 bg-blue-50', icon: '📦' };
            } else {
              deliveryLabel = { text: `£${fee.toFixed(2)} delivery`, color: 'text-slate-700 bg-slate-100', icon: '🚚' };
            }

            return (
              <div
                key={o.id}
                className={`group relative bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                  isBest ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {isBest && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl uppercase tracking-wider">
                    🏆 Best deal
                  </div>
                )}

                <div className="p-4 sm:p-5 grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1.4fr_0.9fr_1.1fr_auto] gap-3 sm:gap-5 items-center">
                  {/* Product image thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 row-span-2 sm:row-span-1">
                    <ProductImage
                      src={main.image}
                      alt={main.title}
                      fallbackTitle={main.title}
                      fallbackCategory={main.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Store + rating */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-bold ${storeBadgeColor(o.retailer)}`}>
                        {retailerName}
                      </span>
                      {isBest && <span className="text-[10px] sm:hidden bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Best</span>}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600">
                      <span className="text-amber-500 font-bold">★ {(o.rating ?? 4.5).toFixed(1)}</span>
                      <span className="text-slate-400">·</span>
                      <span>{(o.reviews ?? 1024).toLocaleString()} reviews</span>
                    </div>
                    {!o.inStock && (
                      <div className="text-[11px] text-rose-600 font-medium mt-1">⚠ Out of stock</div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="hidden sm:block">
                    <div className="text-2xl font-extrabold text-slate-900">£{o.price.toFixed(2)}</div>
                    {totalDelivered != null && totalDelivered !== o.price && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Total: £{totalDelivered.toFixed(2)} delivered
                      </div>
                    )}
                  </div>

                  {/* Delivery info */}
                  <div className="hidden sm:flex flex-col gap-1">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold w-fit ${deliveryLabel.color}`}>
                      <span>{deliveryLabel.icon}</span> {deliveryLabel.text}
                    </span>
                    {o.freeDeliveryOver != null && o.freeDeliveryOver > 0 && fee > 0 && (
                      <span className="text-[10px] text-slate-500">Free over £{o.freeDeliveryOver}</span>
                    )}
                  </div>

                  {/* View Deal button */}
                  <RetailerLink
                    href={o.url}
                    className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition shrink-0 ${
                      isBest
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-emerald-200'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    View Deal <span aria-hidden>→</span>
                  </RetailerLink>

                  {/* Mobile-only: price + delivery on second row */}
                  <div className="sm:hidden col-span-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <div className="text-2xl font-extrabold text-slate-900">£{o.price.toFixed(2)}</div>
                    {totalDelivered != null && totalDelivered !== o.price && (
                      <div className="text-[11px] text-slate-500">
                        £{totalDelivered.toFixed(2)} delivered
                      </div>
                    )}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${deliveryLabel.color}`}>
                      {deliveryLabel.icon} {deliveryLabel.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
    </InnerShell>
  );
}

// Retailer badge colour palette — branded-ish for instant recognition
function storeBadgeColor(retailer: string): string {
  const map: Record<string, string> = {
    amazon:     'bg-[#FF9900] text-white',
    ebay:       'bg-[#E53238] text-white',
    argos:      'bg-[#E50000] text-white',
    currys:     'bg-[#4D148C] text-white',
    johnlewis:  'bg-[#A8B400] text-white',
    tesco:      'bg-[#0066CC] text-white',
    sainsburys: 'bg-[#F0820B] text-white',
    asda:       'bg-[#7BC043] text-white',
    morrisons:  'bg-[#00AB47] text-white',
    waitrose:   'bg-[#5E8C31] text-white',
    aldi:       'bg-[#1A4F9C] text-white',
    lidl:       'bg-[#0050AA] text-white',
    iceland:    'bg-[#C8102E] text-white',
    ocado:      'bg-[#7A1FA2] text-white',
    coop:       'bg-[#00A1DE] text-white',
    marksandspencer: 'bg-[#16723C] text-white',
    apple:      'bg-black text-white',
    facebook:   'bg-[#1877F2] text-white',
    ubereats:   'bg-[#06C167] text-white',
    deliveroo:  'bg-[#00CCBC] text-white',
    justeat:    'bg-[#FF8000] text-white',
    next:       'bg-[#1B2738] text-white',
    primark:    'bg-[#0050B5] text-white',
    asos:       'bg-black text-white',
    zara:       'bg-black text-white',
    hm:         'bg-[#E50010] text-white',
    uniqlo:     'bg-[#FF0000] text-white',
    jdsports:   'bg-black text-white',
    sportsdirect: 'bg-[#005DAB] text-white',
    sky:        'bg-[#0072C6] text-white',
    bt:         'bg-[#5514B4] text-white',
    virginmedia:'bg-[#E10A0A] text-white',
    talktalk:   'bg-[#7300A8] text-white',
    nowbroadband: 'bg-[#02B66E] text-white',
    plusnet:    'bg-[#00B66F] text-white',
    hyperoptic: 'bg-[#FF5C5C] text-white',
    ee:         'bg-[#00B7AC] text-white',
    vodafone:   'bg-[#E60000] text-white',
    three:      'bg-black text-white',
    o2:         'bg-[#0019A5] text-white',
    giffgaff:   'bg-[#22344A] text-white',
    tescomobile:'bg-[#0066CC] text-white',
    skymobile:  'bg-[#0072C6] text-white',
    voxi:       'bg-[#E91E63] text-white',
    smarty:     'bg-[#FFC107] text-slate-900',
    idmobile:   'bg-[#FF5400] text-white',
    carphonewarehouse: 'bg-[#E20613] text-white',
    autotrader: 'bg-[#FFD200] text-slate-900',
    motors:     'bg-[#0070D7] text-white',
    gumtree:    'bg-[#72BF00] text-white',
    carwow:     'bg-[#9E33CC] text-white',
    cinch:      'bg-[#FE2C45] text-white',
    heycar:     'bg-[#5B2E91] text-white',
    arnoldclark:'bg-[#D9001B] text-white',
    comparethemarket: 'bg-[#054C9C] text-white',
    moneysupermarket: 'bg-[#E89500] text-white',
    gocompare:  'bg-[#56166E] text-white',
    confused:   'bg-[#E91685] text-white',
    admiral:    'bg-[#0033A0] text-white',
    aviva:      'bg-[#FFD600] text-slate-900',
    directline: 'bg-[#E2000F] text-white',
    churchill:  'bg-[#0033A0] text-white',
    temu:       'bg-[#FB7701] text-white',
    shein:      'bg-black text-white',
    aliexpress: 'bg-[#E62E04] text-white',
    wayfair:    'bg-[#7F187F] text-white',
    ikea:       'bg-[#0058A3] text-[#FBD914]',
    'b&q':      'bg-[#FF6600] text-white',
    walmart:    'bg-[#0071CE] text-white',
    bm:         'bg-[#0050AA] text-white',
    homebargains: 'bg-[#C8102E] text-white',
    poundland:  'bg-[#FFD200] text-slate-900',
    wilko:      'bg-[#E60E54] text-white',
    tkmaxx:     'bg-[#E10A0A] text-white',
    homesense:  'bg-[#00753C] text-white',
    selfridges: 'bg-[#FFCD00] text-slate-900',
    flannels:   'bg-black text-white',
    boohoo:     'bg-[#FF1493] text-white',
    prettylittlething: 'bg-[#FF66B2] text-white',
    riverisland:'bg-black text-white',
    newlook:    'bg-[#FFD700] text-slate-900',
    clarks:     'bg-[#0D52A0] text-white',
    mango:      'bg-black text-white',
    office:     'bg-black text-white',
    schuh:      'bg-[#FF8200] text-white',
    fatface:    'bg-[#1B3A57] text-white',
    footasylum: 'bg-black text-white',
    size:       'bg-black text-white',
    fossil:     'bg-[#382E2C] text-white',
    tagheuer:   'bg-[#062F40] text-[#F4B040]',
    casioshop:  'bg-[#0033A0] text-white',
    watchshop:  'bg-[#1B1F2A] text-white',
    watchesofswitzerland: 'bg-black text-[#D4AF37]',
    goldsmiths: 'bg-[#1A1A1A] text-[#D4AF37]',
    beaverbrooks: 'bg-[#2E1A47] text-[#FFD700]',
    ernestjones:'bg-[#5C3CA0] text-white',
    hsamuel:    'bg-[#C8102E] text-white',
    tommyhilfiger: 'bg-[#001F3F] text-white',
    hugoboss:   'bg-black text-white',
    ralphlauren:'bg-[#003C71] text-white',
    calvinklein:'bg-black text-white',
    boden:      'bg-[#C00000] text-white',
    joules:     'bg-[#1B4F9F] text-white',
    whitestuff: 'bg-[#3F2A56] text-white',
    mountainwarehouse: 'bg-[#005D2F] text-white',
    cotswoldoutdoor: 'bg-[#7FB539] text-white',
  };
  return map[retailer] ?? 'bg-slate-800 text-white';
}
