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
      </div>
    </Link>
  );
}
