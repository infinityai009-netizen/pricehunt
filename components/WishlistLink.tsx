'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getWishlist } from '@/lib/wishlistClient';

export default function WishlistLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getWishlist().length);
    update();
    window.addEventListener('wishlist-changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('wishlist-changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <Link
      href="/wishlist"
      className="relative inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-brand-600"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
      </svg>
      <span className="hidden sm:inline">Wishlist</span>
      {count > 0 && (
        <span className="ml-0.5 grid place-items-center min-w-[1.25rem] h-5 px-1 bg-rose-500 text-white text-xs rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
