import Link from 'next/link';

const CATEGORIES = [
  { slug: 'electronics', label: 'Electronics', emoji: '📱' },
  { slug: 'fashion',     label: 'Fashion',     emoji: '👗' },
  { slug: 'beauty',      label: 'Beauty',      emoji: '💄' },
  { slug: 'grocery',     label: 'Grocery',     emoji: '🛒' },
  { slug: 'home',        label: 'Home',        emoji: '🏠' },
  { slug: 'furniture',   label: 'Furniture',   emoji: '🛋️' },
  { slug: 'gaming',      label: 'Gaming',      emoji: '🎮' },
  { slug: 'sports',      label: 'Sports',      emoji: '⚽' },
  { slug: 'toys',        label: 'Toys',        emoji: '🧸' },
  { slug: 'outdoor',     label: 'Outdoor',     emoji: '🏕️' },
  { slug: 'pet',         label: 'Pet',         emoji: '🐾' },
  { slug: 'cameras',     label: 'Cameras',     emoji: '📷' },
  { slug: 'food',        label: 'Food Delivery', emoji: '🍔' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {CATEGORIES.map(c => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="bg-white border rounded-lg p-3 text-center hover:shadow-md hover:border-brand-500 transition"
        >
          <div className="text-2xl">{c.emoji}</div>
          <div className="text-sm font-medium mt-1">{c.label}</div>
        </Link>
      ))}
    </div>
  );
}
