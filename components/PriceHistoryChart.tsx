import type { PricePoint } from '@/lib/priceHistory';

export default function PriceHistoryChart({ points }: { points: PricePoint[] }) {
  if (points.length < 2) return null;

  const w = 600, h = 160, pad = 28;
  const prices = points.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const x = (i: number) => pad + ((w - pad * 2) * i) / (points.length - 1);
  const y = (p: number) => h - pad - ((h - pad * 2) * (p - min)) / range;

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.price)}`).join(' ');
  const areaPath = `${linePath} L ${x(points.length - 1)} ${h - pad} L ${x(0)} ${h - pad} Z`;

  const lowest = points.reduce((a, b) => (b.price < a.price ? b : a));
  const highest = points.reduce((a, b) => (b.price > a.price ? b : a));

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">30-day price history</h3>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#grad)" />
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2" />
        <circle cx={x(points.indexOf(lowest))} cy={y(lowest.price)} r="4" fill="#16a34a" />
        <circle cx={x(points.indexOf(highest))} cy={y(highest.price)} r="4" fill="#dc2626" />
      </svg>
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span><span className="text-green-600 font-semibold">£{lowest.price}</span> lowest</span>
        <span>Current: <span className="font-semibold text-slate-900">£{points[points.length - 1].price}</span></span>
        <span><span className="text-red-600 font-semibold">£{highest.price}</span> highest</span>
      </div>
    </div>
  );
}
