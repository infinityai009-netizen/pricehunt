'use client';

import type { Product } from './types';

const KEY = 'pricehunt-wishlist-v1';

export interface WishlistItem {
  productKey: string;
  title: string;
  image: string;
  bestPrice: number;
  retailer: string;
  addedAt: number;
}

function read(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function write(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('wishlist-changed'));
}

export function getWishlist(): WishlistItem[] {
  return read();
}

export function isInWishlist(productKey: string): boolean {
  return read().some(i => i.productKey === productKey);
}

export function toggleWishlist(product: Product): boolean {
  const items = read();
  const idx = items.findIndex(i => i.productKey === product.productKey);
  if (idx >= 0) {
    items.splice(idx, 1);
    write(items);
    return false;
  }
  items.unshift({
    productKey: product.productKey,
    title: product.title,
    image: product.image,
    bestPrice: product.price,
    retailer: product.retailer,
    addedAt: Date.now(),
  });
  write(items);
  return true;
}

export function removeFromWishlist(productKey: string) {
  write(read().filter(i => i.productKey !== productKey));
}
