import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';

const TRENDING = [
  'iPhone 15', 'PlayStation 5', 'Dyson Airwrap', 'Air Fryer',
  'Milk', 'Cheese', 'Chicken', 'Frozen Pizza', 'Eggs', 'Bread',
  'Nike Air Force 1', 'LEGO',
];

const RETAILERS = [
  'Amazon','eBay','Argos','Currys','John Lewis',
  'Tesco','ASDA',"Sainsbury's",'Morrisons','Waitrose','Aldi','Lidl','Iceland','Ocado',
  'Temu','Shein','AliExpress','Wayfair','IKEA','B&Q','Walmart',
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Search once, <span className="text-brand-600">compare everywhere</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We hunt the best price across {RETAILERS.length}+ UK retailers — so you don't have to open 15 tabs.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="mt-5 flex flex-wrap gap-2 justify-center text-sm">
            <span className="text-slate-500">Trending:</span>
            {TRENDING.map(t => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className="px-3 py-1 rounded-full bg-white border hover:border-brand-500 hover:text-brand-600"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Shop by category</h2>
        <CategoryGrid />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Retailers we compare</h2>
        <div className="flex flex-wrap gap-2">
          {RETAILERS.map(r => (
            <span key={r} className="px-3 py-1.5 rounded-full bg-white border text-sm">{r}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
