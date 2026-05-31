'use client';

import { useEffect, useState } from 'react';
import { isInWishlist, toggleWishlist } from '@/lib/wishlistClient';
import type { Product } from '@/lib/types';

export default function WishlistButton({ product, className = '' }: { product: Product; className?: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWishlist(product.productKey));
  }, [product.productKey]);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleWishlist(product);
    setSaved(next);
  }

  return (
    <button
      onClick={onClick}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow hover:scale-110 transition ${className}`}
    >
      {saved ? (
        <svg viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5">
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" className="w-5 h-5">
          <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
        </svg>
      )}
    </button>
  );
}
