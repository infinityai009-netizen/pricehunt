import Link from 'next/link';
import type { Product } from '@/lib/types';
import WishlistButton from './WishlistButton';

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

const RETAILER_COLOR: Record<string, string> = {
  amazon: 'bg-yellow-100 text-yellow-800',
  ebay: 'bg-red-100 text-red-700',
  argos: 'bg-red-100 text-red-800',
  currys: 'bg-purple-100 text-purple-700',
  johnlewis: 'bg-green-100 text-green-700',
  tesco: 'bg-blue-100 text-blue-700',
  asda: 'bg-green-100 text-green-800',
  sainsburys: 'bg-orange-100 text-orange-700',
  morrisons: 'bg-yellow-100 text-yellow-700',
  waitrose: 'bg-emerald-100 text-emerald-800',
  aldi: 'bg-sky-100 text-sky-700',
  lidl: 'bg-blue-100 text-blue-800',
  iceland: 'bg-rose-100 text-rose-700',
  ocado: 'bg-violet-100 text-violet-800',
  coop: 'bg-indigo-100 text-indigo-700',
  marksandspencer: 'bg-emerald-100 text-emerald-900',
  temu: 'bg-orange-100 text-orange-800',
  shein: 'bg-slate-900 text-white',
  aliexpress: 'bg-red-100 text-red-700',
  wayfair: 'bg-violet-100 text-violet-700',
  ikea: 'bg-blue-100 text-blue-800',
  'b&q': 'bg-orange-100 text-orange-700',
  walmart: 'bg-blue-100 text-blue-700',
  apple: 'bg-slate-900 text-white',
  facebook: 'bg-blue-600 text-white',
  ubereats: 'bg-emerald-100 text-emerald-800',
  deliveroo: 'bg-teal-100 text-teal-800',
  justeat: 'bg-orange-100 text-orange-700',
  autotrader: 'bg-yellow-100 text-yellow-800',
  motors: 'bg-blue-100 text-blue-800',
  gumtree: 'bg-emerald-100 text-emerald-800',
  carwow: 'bg-violet-100 text-violet-700',
  cinch: 'bg-rose-100 text-rose-700',
  heycar: 'bg-purple-100 text-purple-700',
  arnoldclark: 'bg-red-100 text-red-700',
  comparethemarket: 'bg-blue-100 text-blue-800',
  moneysupermarket: 'bg-orange-100 text-orange-700',
  gocompare: 'bg-purple-100 text-purple-700',
  confused: 'bg-pink-100 text-pink-700',
  admiral: 'bg-blue-100 text-blue-700',
  aviva: 'bg-yellow-100 text-yellow-800',
  directline: 'bg-red-100 text-red-700',
  churchill: 'bg-blue-100 text-blue-700',
  sky: 'bg-blue-100 text-blue-800',
  bt: 'bg-violet-100 text-violet-700',
  virginmedia: 'bg-red-100 text-red-700',
  talktalk: 'bg-pink-100 text-pink-700',
  nowbroadband: 'bg-green-100 text-green-700',
  plusnet: 'bg-indigo-100 text-indigo-700',
  hyperoptic: 'bg-cyan-100 text-cyan-700',
  ee: 'bg-yellow-100 text-yellow-800',
  vodafone: 'bg-red-100 text-red-700',
  three: 'bg-slate-900 text-white',
  o2: 'bg-blue-100 text-blue-800',
  giffgaff: 'bg-emerald-100 text-emerald-800',
  tescomobile: 'bg-blue-100 text-blue-700',
  skymobile: 'bg-blue-100 text-blue-800',
  voxi: 'bg-fuchsia-100 text-fuchsia-700',
  smarty: 'bg-amber-100 text-amber-700',
  idmobile: 'bg-indigo-100 text-indigo-700',
  carphonewarehouse: 'bg-red-100 text-red-700',
  bm: 'bg-blue-100 text-blue-800',
  homebargains: 'bg-red-100 text-red-700',
  poundland: 'bg-yellow-100 text-yellow-800',
  wilko: 'bg-rose-100 text-rose-700',
  zara: 'bg-slate-900 text-white',
  hm: 'bg-rose-100 text-rose-700',
  office: 'bg-slate-900 text-white',
  asos: 'bg-slate-900 text-white',
  next: 'bg-slate-100 text-slate-800',
  primark: 'bg-blue-100 text-blue-800',
  jdsports: 'bg-slate-900 text-white',
  schuh: 'bg-slate-900 text-white',
  sportsdirect: 'bg-blue-100 text-blue-800',
  prettylittlething: 'bg-pink-100 text-pink-700',
  boohoo: 'bg-rose-100 text-rose-700',
  riverisland: 'bg-amber-100 text-amber-700',
  newlook: 'bg-yellow-100 text-yellow-800',
  clarks: 'bg-blue-100 text-blue-700',
  mango: 'bg-amber-100 text-amber-800',
  selfridges: 'bg-yellow-100 text-yellow-800',
  fatface: 'bg-blue-100 text-blue-700',
  uniqlo: 'bg-red-100 text-red-700',
  tkmaxx: 'bg-red-100 text-red-800',
  homesense: 'bg-emerald-100 text-emerald-800',
  watchshop: 'bg-slate-100 text-slate-800',
  watchesofswitzerland: 'bg-slate-900 text-white',
  goldsmiths: 'bg-amber-100 text-amber-800',
  beaverbrooks: 'bg-violet-100 text-violet-700',
  ernestjones: 'bg-rose-100 text-rose-700',
  hsamuel: 'bg-red-100 text-red-700',
  fossil: 'bg-slate-900 text-white',
  tagheuer: 'bg-slate-900 text-white',
  casioshop: 'bg-blue-100 text-blue-800',
  tommyhilfiger: 'bg-red-100 text-red-700',
  hugoboss: 'bg-slate-900 text-white',
  ralphlauren: 'bg-blue-100 text-blue-800',
  calvinklein: 'bg-slate-100 text-slate-800',
  boden: 'bg-pink-100 text-pink-700',
  joules: 'bg-blue-100 text-blue-700',
  whitestuff: 'bg-purple-100 text-purple-700',
  mountainwarehouse: 'bg-green-100 text-green-800',
  cotswoldoutdoor: 'bg-emerald-100 text-emerald-800',
  footasylum: 'bg-orange-100 text-orange-700',
  size: 'bg-slate-900 text-white',
  flannels: 'bg-slate-900 text-white',
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.productKey}`}
      className="group block bg-white rounded-lg border border-slate-200 hover:shadow-md transition overflow-hidden relative"
    >
      <WishlistButton product={p} className="absolute top-2 right-2 z-10" />
      <div className="aspect-square bg-slate-100 overflow-hidden">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400 text-xs">No image</div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${RETAILER_COLOR[p.retailer] ?? 'bg-slate-100 text-slate-700'}`}>
            {RETAILER_NAME[p.retailer] ?? p.retailer}
          </span>
          {p.rating != null && (
            <span className="text-xs text-amber-600">★ {p.rating} <span className="text-slate-400">({p.reviews})</span></span>
          )}
        </div>
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{p.title}</h3>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-lg font-bold text-slate-900">£{p.price.toFixed(2)}</span>
          {!p.inStock && <span className="text-xs text-rose-600">Out of stock</span>}
        </div>
        <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-0.5">
          {p.inStoreOnly ? (
            <span className="text-amber-700">🏪 In store only</span>
          ) : p.deliveryOnly ? (
            <span>🚚 Delivery £{p.deliveryFee?.toFixed(2) ?? '—'}</span>
          ) : (
            <>
              {p.deliveryFee === 0 ? (
                <span className="text-green-700">🚚 Free delivery</span>
              ) : p.deliveryFee != null ? (
                <span>🚚 £{p.deliveryFee.toFixed(2)}{p.freeDeliveryOver ? ` (free over £${p.freeDeliveryOver})` : ''}</span>
              ) : null}
              {p.clickCollect && <span className="text-slate-500">· 📦 C&C</span>}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
