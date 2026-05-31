'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const RETAILERS = [
  'amazon','ebay','argos','currys','johnlewis',
  'tesco','asda','sainsburys','morrisons','waitrose','aldi','lidl','iceland','ocado',
  'temu','shein','aliexpress','wayfair','ikea','b&q','walmart',
];
const SORTS = [
  { value: 'relevance',  label: 'Relevance' },
  { value: 'price-asc',  label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
  { value: 'rating',     label: 'Top rated' },
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (value) sp.set(key, value); else sp.delete(key);
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <aside className="bg-white border rounded-lg p-4 space-y-5 text-sm sticky top-4">
      <div>
        <label className="font-semibold block mb-2">Sort</label>
        <select
          value={params.get('sort') ?? 'relevance'}
          onChange={e => update('sort', e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div>
        <label className="font-semibold block mb-2">Price (£)</label>
        <div className="flex gap-2">
          <input
            type="number" placeholder="Min" min={0}
            defaultValue={params.get('minPrice') ?? ''}
            onBlur={e => update('minPrice', e.target.value)}
            className="w-1/2 border rounded px-2 py-1"
          />
          <input
            type="number" placeholder="Max" min={0}
            defaultValue={params.get('maxPrice') ?? ''}
            onBlur={e => update('maxPrice', e.target.value)}
            className="w-1/2 border rounded px-2 py-1"
          />
        </div>
      </div>

      <div>
        <label className="font-semibold block mb-2">Retailer</label>
        <select
          value={params.get('retailer') ?? ''}
          onChange={e => update('retailer', e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All retailers</option>
          {RETAILERS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
    </aside>
  );
}
