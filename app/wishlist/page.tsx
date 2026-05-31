'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWishlist, removeFromWishlist, type WishlistItem } from '@/lib/wishlistClient';

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getWishlist());
    const onChange = () => setItems(getWishlist());
    window.addEventListener('wishlist-changed', onChange);
    return () => window.removeEventListener('wishlist-changed', onChange);
  }, []);

  if (!mounted) return <div className="max-w-6xl mx-auto px-4 py-10" />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your wishlist ({items.length})</h1>

      {items.length === 0 ? (
        <div className="bg-white border rounded-lg p-10 text-center text-slate-500">
          Nothing saved yet. Tap the heart on any product to save it here.
          <div className="mt-4">
            <Link href="/" className="text-brand-600 hover:underline">Browse products →</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map(item => (
            <div key={item.productKey} className="bg-white border rounded-lg overflow-hidden">
              <Link href={`/product/${item.productKey}`}>
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="p-3 space-y-2">
                <Link href={`/product/${item.productKey}`}>
                  <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{item.title}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">£{item.bestPrice.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromWishlist(item.productKey)}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
